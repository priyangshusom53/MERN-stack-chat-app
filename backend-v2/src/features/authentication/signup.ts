
// IO layer for web (ExpressJS)



// Adapter layer
import type { WebRequest, WebResponse } from "../webReqRes.js";

interface SignupWebRequest extends WebRequest {
   body: {
      name: string,
      email: string,
      password: string
   }
}

interface SignupWebResponse extends WebResponse { }

export class SignupWebController<WebRequestType extends SignupWebRequest, WebResponseType extends SignupWebResponse> {

   signupAction: Action<SignupRequest, SignupResult>;
   constructor(signupAction: Action<SignupRequest, SignupResult>) {
      this.signupAction = signupAction
   }

   async Signup(req: WebRequestType, res: WebResponseType) {

      const result = await this.signupAction.Execute(
         { 
            name: req.body.name, 
            email: req.body.email, 
            password: req.body.password
         }
      )

      if (!result.success) {
         if(result.errorType === "USER_EXISTS"){
            return res.status(409).json(
            { 
               error: result.statusMessage,
               errortype: result.errorType,
            })
         }
         return res.status(400).json({ error: result.statusMessage, errortype: result.errorType })
      }
      if (result.session && result.user) {
         res.cookie('sessionId', result.session.token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            path: "/",
            maxAge: result.session.expiresIn
         });
         return res.status(201).json({ message: result.statusMessage, user: { id: result.user.id, name: result.user.name, email: result.user.email } })
      }
      return res.status(400).json({ error: result.statusMessage, errortype: result.errorType })
   }

}



// Use case layer
import type { Action, RequestDS, ResultDS } from "../actionInterface.js";
import type { UserDataAccess } from "../../dataAccess/userDataAccess.js";
import type { User } from "../../core/user.js";
import type { EncryptionService } from "../../encryption/encryptionInterface.js";
import { convertToMilliseconds } from "../../utils/utils.js";
import { error } from "console";
import type { UserRepo } from "../../db/repos/userRepo.js";

/*
 * Minimum data for user signup
 * TODO:
 *   about,
 *   age,
 *   profilePic,
 *   contacts...
*/
interface SignupRequest extends RequestDS {
   email: string;
   name: string;
   password: string;
}

/*
 *  returns User object from domain layer and session details
 *  if signup succeeds
*/
type timeInMilliSec = number
interface SignupResult extends ResultDS {
   errorType: string;
   user?: User;
   session?: {
      token: string,
      expiresIn: timeInMilliSec
   }
}

export class SignupAction implements Action<SignupRequest, SignupResult> {

   #encryptionService: EncryptionService;

   constructor(
      private userDataAccess: UserDataAccess, 
      encryptionService: EncryptionService
   ) {
      this.userDataAccess = userDataAccess
      this.#encryptionService = encryptionService
   }

   async Execute(req: SignupRequest): Promise<SignupResult> {

      try{

         if(req.email.trim() === "" || req.password.trim().length < 6 || req.name.trim() === ""){
            return { 
               success: false, 
               errorType: "INVALID_USER_DATA",
               statusMessage: "Name, email and password are required for signup" 
            }
         }


         // check if user exists
         const existingUser = await this.userDataAccess.FindUserByEmail(req.email)

         if (existingUser) {
            return { 
               success: false, 
               errorType: "USER_EXISTS",
               statusMessage: "User already exists, use sign in instead" 
            }
         }

         // Create user
         const user = await this.userDataAccess.CreateUser({ name: req.name, email: req.email, password: req.password })

         if (!user) return { success: false, errorType: "UNKNOWN_ERROR", statusMessage: "User signup failed" }

         const token = this.#encryptionService.Encrypt({ id: user.id, password: user.password }, { time: 1, unit: 'd' })

         if (!token) return { success: false, errorType: "UNKNOWN_ERROR", statusMessage: "user signup failed" }
         return { 
            success: true,
            errorType: "NO_ERROR", 
            statusMessage: "user signedup successfully", 
            user: user, 
            session: { token: token, expiresIn: convertToMilliseconds(1, 'days') } 
         }

      }catch(err:any){
         return { success: false, errorType: "UNKNOWN_ERROR", statusMessage: `An error occurred during signup ${err.message}` }
      }
   }
}
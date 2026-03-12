

import type { WebRequest, WebResponse } from "../webReqRes.js";

interface LoginWebRequest extends WebRequest {
   body: {
      email: string,
      password: string
   }
}

interface LoginWebResponse extends WebResponse { }

export class LoginWebController<WebRequestType extends LoginWebRequest, WebResponseType extends LoginWebResponse> {

   loginAction: Action<LoginRequest, LoginResult>;
   constructor(loginAction: Action<LoginRequest, LoginResult>) {
      this.loginAction = loginAction
   }

   async Login(req: WebRequestType, res: WebResponseType) {

      const result = await this.loginAction.Execute(
         {
            email: req.body.email,
            password: req.body.password
         }
      )
      if (!result.success) {
         return res.status(400).json({ error: result.statusMessage, errortype: result.errorType })
      }
      if (result.session && result.user) {
         res.cookie('sessionId', result.session.token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: result.session.expiresIn
         });
         return res.status(200).json({ message: result.statusMessage, user: result.user })
      }

      return res.status(400).json({ error: result.statusMessage, errortype: result.errorType })
   }
}


// Use case layer
import type { Action, RequestDS, ResultDS } from "../actionInterface.js";
import type { UserDataAccess } from "../../dataAccess/userDataAccess.js";
import type { EncryptionService } from "../../encryption/encryptionInterface.js";
import { convertToMilliseconds } from "../../utils/utils.js";
import { User } from "../../core/user.js";

interface LoginRequest extends RequestDS {
   email: string;
   password: string;
}

interface LoginResult extends ResultDS {
   errorType: string;
   user?: User;
   session?: {
      token: string;
      expiresIn: number;
   }
}

export class LoginAction implements Action<LoginRequest, LoginResult>{
   #userDataAccess: UserDataAccess;
   #encryptionService: EncryptionService;

   constructor(userDataAccess: UserDataAccess, encryptionService: EncryptionService) {
      this.#userDataAccess = userDataAccess;
      this.#encryptionService = encryptionService;
   }

   async Execute(req: LoginRequest): Promise<LoginResult> {
      try {
         const user = await this.#userDataAccess.FindUserByEmail(req.email)
         if (!user) {
            return { success: false, errorType: "USER_NOT_FOUND", statusMessage: "User not found" }
         }

         // TODO: Store hashed password in DB
         const isPasswordValid = (req.password === user.password)
         if (!isPasswordValid) {
            return { success: false, errorType: "INVALID_PASSWORD", statusMessage: "Invalid password" }
         }

         // Generate session token
         const sessionToken = this.#encryptionService.Encrypt({ id: user.id, password: user.password }, { time: 1, unit: 'd' })

         if(!sessionToken){
            return { success: false, errorType: "UNKNOWN_ERROR", statusMessage: "Login failed" }
         }

         // Return successful login result
         return { 
            success: true, 
            errorType: "NO_ERROR", 
            statusMessage: "Login successful", 
            user: user, 
            session: { token: sessionToken, expiresIn: convertToMilliseconds(1, 'days') } 
         }
      } catch (error: any) {
         return { success: false, errorType: "INTERNAL_ERROR", statusMessage: `An internal error occurred ${error.message}` }
      }
   }
}
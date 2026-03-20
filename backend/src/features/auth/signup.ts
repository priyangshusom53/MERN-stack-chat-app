import { User } from "../../core/user.js";
import { durationToMs } from "../../utils.js";
import type { Action, RequestDS, ResponseDS } from "../action.js";
import type { UserDataAccess } from "../dataAccess/userDataAccess.js";
import { ExpiryTimeToMS, type ExpiryTime } from "../tokenService/tokenService.js";
import type { Presenter } from "../presenter.js"
import type {Request, Response} from "express"
import type { TokenService } from "../tokenService/tokenService.js";


export interface SignupWebRequest extends Request{
   body:{
      name:string,
      email:string,
      password:string,
      profilePicUrl?:string
   }
}

export interface SignupWebResponse extends Response{}

export class SignupWebController{

   action: Action<SignupRequestDS,SignupResponseDS>

   constructor(action:Action<SignupRequestDS,SignupResponseDS>){
      this.action = action
   }

   async signup(req:SignupWebRequest, res:SignupWebResponse){

      try{

         const requestDS = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
         }

         const responseDS = await this.action.execute(requestDS)

         if(!responseDS.success){
            return res.status(400).json({
               success:false,
               errorType:responseDS.errorType,
               error:responseDS.error
            })
         }

         // send cookie
         // cookie name sessionID
         res.cookie("sessionID", responseDS.session.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: responseDS.session.expiresIn
         })

         return res.status(201).json({
            success:true,
            user:{
               id:responseDS.user.id,
               name:responseDS.user.name,
               email:responseDS.user.email,
               profilePicUrl:responseDS.user.profilePicUrl,
               about:responseDS.user.about,
               createdAt:responseDS.user.createdAt,
               updatedAt:responseDS.user.updatedAt
            }
         })

      }catch(err){

         return res.status(500).json({
            success:false,
            errorType:"SERVER_ERROR",
            error:"Internal server error"
         })
      }

   }
}

enum SignupErrorTypes{
   InvalidInput="INVALID_INPUT_ERROR",
   TokenError="TOKEN_GENERATION_ERROR",
   DatabaseError="DATABASE_ERROR",
   UserAlreadyExists="USER_EXISTS_ERROR",
   NoError=""
}

type SignupRequestDS = RequestDS & {
   name:string;
   email:string;
   password:string;
}

type SignupResponseDS = ResponseDS<{
   user:User;
   session:{
      token:string,
      expiresIn:number
   };
   errorType:SignupErrorTypes;
   error:string;
},{
   errorType:SignupErrorTypes;
   error:string;
}>

export class SignupAction implements Action<SignupRequestDS, SignupResponseDS>{

   SESSION_DURATION:ExpiryTime = {
      time: 1,
      unit: "d"
   }

   userDataAccess:UserDataAccess
   tokenService:TokenService
   // encryptionService:EncryptionService

   constructor(
      userDataAccess:UserDataAccess,
      tokenService:TokenService,
      // encryptionService:EncryptionService
   ){
      this.userDataAccess = userDataAccess
      this.tokenService = tokenService
      // this.encryptionService = encryptionService
   }

   async execute(req: SignupRequestDS):Promise<SignupResponseDS>{

      if(!req.name.trim() || !req.email.trim() || !req.password.length){
         return {
            success:false,
            errorType:SignupErrorTypes.InvalidInput,
            error:"Name email or password is invalid"
         }
      }

      const existingUser = await this.userDataAccess.getUserByEmail(req.email)

      if(existingUser){
         return {
            success:false,
            errorType:SignupErrorTypes.UserAlreadyExists,
            error:"User exists with email "+req.email
         }
      }

      const createdUser = await this.userDataAccess.createUser(new User(
         "-1",
         req.name,
         req.email,
         req.password,
         new Date(),
         new Date()
      ))

      if(!createdUser){
         return {
            success:false,
            errorType:SignupErrorTypes.DatabaseError,
            error:"Failed to create user"
         }
      }

      const token = this.tokenService.encode({id:createdUser.id}, this.SESSION_DURATION)

      if(!token){
         return {
            success:false,
            errorType:SignupErrorTypes.TokenError,
            error:"Failed to generate session token"
         }
      }

      return {
         success:true,
         user:createdUser,
         session:{
            token,
            expiresIn:ExpiryTimeToMS(this.SESSION_DURATION)
         },
         errorType:SignupErrorTypes.NoError,
         error:""
      }
   }
}


// interface SignupViewModel{
//    status:number;
//    body:object
// } 

// export class SignupPresenter implements Presenter<SignupResponseDS, SignupViewModel>{

//    present(res:SignupResponseDS):SignupViewModel{

//       if(!res.success){
//          return {
//             status:400,
//             body:{
//                success:false,
//                error:res.error
//             }
//          }
//       }

//       return {
//          status:201,
//          body:{
//             success:true,
//             user:{
//                id:res.user?.id,
//                name:res.user?.name,
//                email:res.user?.email
//             }
//          }
//       }
//    }
// }
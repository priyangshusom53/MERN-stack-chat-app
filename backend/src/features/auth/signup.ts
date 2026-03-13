import { User } from "../../core/user.js";
import { durationToMs } from "../../utils.js";
import type { Action, RequestDS, ResponseDS } from "../action.js";
import type { UserDataAccess } from "../dataAccess/userDataAccess.js";
import type { EncryptionService, ExpiryTime } from "../encryption/encryptionService.js";
import type { Presenter } from "../presenter.js"


export interface SignupWebRequest{
   body:{
      name:string,
      email:string,
      password:string
   }
}

export interface SignupWebResponse{

}


export class SignupWebController<
   WebRequestType extends SignupWebRequest,
   WebResponseType extends SignupWebResponse
>{

   action: SignupAction

   constructor(action:SignupAction){
      this.action = action
   }

   async signup(req:WebRequestType, res:WebResponseType){

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
         if(responseDS.session){
            // cookie name sessionID
            res.cookie("sessionID", responseDS.session.token, {
               httpOnly: true,
               secure: process.env.NODE_ENV === "production",
               sameSite: "lax",
               path: "/",
               maxAge: responseDS.session.expiresIn
            })
         }

         return res.status(201).json({
            success:true,
            user:{
               id:responseDS.user?.id,
               name:responseDS.user?.name,
               email:responseDS.user?.email,
               about:responseDS.user?.about,
               chats:responseDS.user?.chats
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

interface SignupRequestDS extends RequestDS{
   name:string;
   email:string;
   password:string;
}

interface SignupResponseDS extends ResponseDS{
   user?:User;
   session?:{
      token:string,
      expiresIn:number
   };
   errorType:string;
   error:string;
}

export class SignupAction implements Action<SignupRequestDS, SignupResponseDS>{

   SESSION_DURATION:ExpiryTime = {
      time: 1,
      unit: "d"
   }
   userDataAccess:UserDataAccess
   encryptionService:EncryptionService

   constructor(
      userDataAccess:UserDataAccess,
      encryptionService:EncryptionService
   ){
      this.userDataAccess = userDataAccess
      this.encryptionService = encryptionService
   }

   async execute(req: SignupRequestDS):Promise<SignupResponseDS>{

      const existingUser = await this.userDataAccess.getUserByEmail(req.email)

      if(existingUser){
         return {
            success:false,
            errorType:"USER_EXISTS",
            error:"User already exists"
         }
      }

      // const encryptedPassword = await this.encryptionService.encrypt({
      //    password:req.password
      // })

      // if(!encryptedPassword){
      //    return {
      //       success:false,
      //       errorType:"ENCRYPTION_ERROR",
      //       error:"Failed to encrypt password"
      //    }
      // }

      const createdUser = await this.userDataAccess.createUser({
         name:req.name,
         email:req.email,
         password:req.password
      })

      if(!createdUser){
         return {
            success:false,
            errorType:"DATABASE_ERROR",
            error:"Failed to create user"
         }
      }

      const token = await this.encryptionService.encrypt(
         { 
            id:createdUser.id,
            password:createdUser.password
         }, this.SESSION_DURATION
      )

      const expiresIn = durationToMs(this.SESSION_DURATION);

      if(!token){
         return {
            success:false,
            errorType:"ENCRYPTION_ERROR",
            error:"Failed to generate session token"
         }
      }

      return {
         success:true,
         user:createdUser,
         session:{
            token,
            expiresIn
         },
         errorType:"",
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
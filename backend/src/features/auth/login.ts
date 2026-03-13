export interface LoginWebRequest{
   body:{
      email:string
      password:string
   }
}

export interface LoginWebResponse{}

export class LoginWebController<
   WebRequestType extends LoginWebRequest,
   WebResponseType extends LoginWebResponse
>{

   action: LoginAction

   constructor(action:LoginAction){
      this.action = action
   }

   async login(req:WebRequestType, res:WebResponseType){

      try{

         const requestDS = {
            email:req.body.email,
            password:req.body.password
         }

         const responseDS = await this.action.execute(requestDS)

         if(!responseDS.success){
            return res.status(400).json({
               success:false,
               errorType:responseDS.errorType,
               error:responseDS.error
            })
         }

         // set cookie
         if(responseDS.session){
            // cookie name sessionID
            res.cookie("sessionID", responseDS.session.token,{
               httpOnly:true,
               secure:process.env.NODE_ENV === "production",
               sameSite:"lax",
               path: "/",
               maxAge:responseDS.session.expiresIn
            })
         }

         return res.status(200).json({
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

import type { RequestDS, ResponseDS, Action } from "../action.js"
import { User } from "../../core/user.js"
import type { UserDataAccess } from "../dataAccess/userDataAccess.js"
import type { EncryptionService, ExpiryTime } from "../encryption/encryptionService.js"
import { durationToMs } from "../../utils.js"

interface LoginRequestDS extends RequestDS{
   email:string
   password:string
}

interface LoginResponseDS extends ResponseDS{
   user?:User
   session?:{
      token:string
      expiresIn:number
   }
   errorType:string
   error:string
}

export class LoginAction implements Action<LoginRequestDS, LoginResponseDS>{

   SESSION_DURATION:ExpiryTime = {
      time:1,
      unit:"d"
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

   async execute(req:LoginRequestDS):Promise<LoginResponseDS>{

      const user = await this.userDataAccess.getUserByEmail(req.email)

      if(!user){
         return {
            success:false,
            errorType:"USER_NOT_FOUND",
            error:"User does not exist"
         }
      }

      // simple password check (replace later with bcrypt)
      if(user.password !== req.password){
         return {
            success:false,
            errorType:"INVALID_CREDENTIALS",
            error:"Invalid email or password"
         }
      }

      const token = await this.encryptionService.encrypt(
         {
            id:user.id,
            password:user.password
         },
         this.SESSION_DURATION
      )

      if(!token){
         return {
            success:false,
            errorType:"ENCRYPTION_ERROR",
            error:"Failed to generate session token"
         }
      }

      const expiresIn = durationToMs(this.SESSION_DURATION)

      return {
         success:true,
         user,
         session:{
            token,
            expiresIn
         },
         errorType:"",
         error:""
      }
   }
}
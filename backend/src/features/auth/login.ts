import type { RequestDS, ResponseDS, Action } from "../action.js"
import { User } from "../../core/user.js"
import type { UserDataAccess } from "../dataAccess/userDataAccess.js"
import type { EncryptionService, ExpiryTime } from "../encryption/encryptionService.js"
import { durationToMs } from "../../utils.js"
import type { Request, Response } from "express"
import { ExpiryTimeToMS, type TokenService } from "../tokenService/tokenService.js"

export interface LoginWebRequest extends Request{
   body:{
      email:string
      password:string
   }
}

export interface LoginWebResponse extends Response{}

export class LoginWebController{

   action: LoginAction

   constructor(action:LoginAction){
      this.action = action
   }

   async login(req:LoginWebRequest, res:LoginWebResponse){

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


enum LoginErrorTypes{
   InvalidCredentials="INVALID_CREDENTIALS_ERROR",
   TokenError="TOKEN_GENERATION_ERROR",
   DatabaseError="DATABASE_ERROR",
   UserNotFound="USER_NOT_FOUND_ERROR",
   NoError=""
}

type LoginRequestDS = RequestDS & {
   email:string
   password:string
}

type LoginResponseDS = ResponseDS<{
   user:User
   session:{
      token:string
      expiresIn:number
   }
   errorType:LoginErrorTypes
   error:string
},{
   errorType:LoginErrorTypes
   error:string
}>

export class LoginAction implements Action<LoginRequestDS, LoginResponseDS>{

   SESSION_DURATION:ExpiryTime = {
      time:1,
      unit:"d"
   }

   userDataAccess:UserDataAccess
   tokenService:TokenService

   constructor(
      userDataAccess:UserDataAccess,
      tokenService:TokenService
   ){
      this.userDataAccess = userDataAccess
      this.tokenService = tokenService
   }

   async execute(req:LoginRequestDS):Promise<LoginResponseDS>{

      const user = await this.userDataAccess.getUserByEmail(req.email)

      if(!user){
         return {
            success:false,
            errorType:LoginErrorTypes.UserNotFound,
            error:"User does not exist"
         }
      }

      // simple password check (replace later with bcrypt)
      if(user.password !== req.password){
         return {
            success:false,
            errorType:LoginErrorTypes.InvalidCredentials,
            error:"Invalid email or password"
         }
      }

      const token = this.tokenService.encode({id:user.id},this.SESSION_DURATION)

      if(!token){
         return {
            success:false,
            errorType:LoginErrorTypes.TokenError,
            error:"Failed to generate session token"
         }
      }

      return {
         success:true,
         user,
         session:{
            token,
            expiresIn:ExpiryTimeToMS(this.SESSION_DURATION)
         },
         errorType:LoginErrorTypes.NoError,
         error:""
      }
   }
}
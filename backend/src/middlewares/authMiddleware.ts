import type { Request, Response, NextFunction } from "express"
import type { EncryptionService } from "../features/encryption/encryptionService.js"
import type { UserDataAccess } from "../features/dataAccess/userDataAccess.js"
import type { User } from "../core/user.js"
import type { TokenService } from "../features/tokenService/tokenService.js"


export interface AuthenticatedWebRequest extends Request{
   cookies:{
      sessionID?:string
   }
   user?:User
}

export class AuthMiddleware{

   tokenSerivce: TokenService
   userDataAccess: UserDataAccess

   constructor(
      tokenSerivce: TokenService,
      userDataAccess: UserDataAccess
   ){
      this.tokenSerivce = tokenSerivce
      this.userDataAccess = userDataAccess
   }

   async handle(req:AuthenticatedWebRequest, res:Response, next:NextFunction){

      try{

         const token = req.cookies?.sessionID

         if(!token){
            return res.status(401).json({
               success:false,
               error:"No session cookie provided"
            })
         }

         const payload = this.tokenSerivce.decode(token)

         if(!payload){
            return res.status(401).json({
               success:false,
               error:"Invalid token"
            })
         }

         const { id } = payload as {
            id:string
         }

         const user = await this.userDataAccess.getUserById(id)

         if(!user){
            return res.status(401).json({
               success:false,
               error:"User not found"
            })
         }

         req.user = user

         next()

      }catch(err){

         return res.status(500).json({
            success:false,
            error:"Server error"
         })
      }
   }
}
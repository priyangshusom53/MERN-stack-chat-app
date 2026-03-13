import type { Request, Response, NextFunction } from "express"
import type { EncryptionService } from "../features/encryption/encryptionService.js"
import type { UserDataAccess } from "../features/dataAccess/userDataAccess.js"
import type { User } from "../core/user.js"


export interface AuthenticatedWebRequest{
   cookies:{
      sessionID?:string
   }
   user?:User
}

export class AuthMiddleware{

   encryptionService: EncryptionService
   userDataAccess: UserDataAccess

   constructor(
      encryptionService: EncryptionService,
      userDataAccess: UserDataAccess
   ){
      this.encryptionService = encryptionService
      this.userDataAccess = userDataAccess
   }

   async handle(req:Request, res:Response, next:NextFunction){

      try{

         const token = req.cookies?.sessionID

         if(!token){
            return res.status(401).json({
               success:false,
               error:"No session cookie"
            })
         }

         const payload = await this.encryptionService.decrypt(token)

         if(!payload){
            return res.status(401).json({
               success:false,
               error:"Invalid token"
            })
         }

         const { id, password } = payload as {
            id:string
            password:string
         }

         const user = await this.userDataAccess.getUserById(id)

         if(!user){
            return res.status(401).json({
               success:false,
               error:"User not found"
            })
         }

         // verify password still matches DB
         if(user.password !== password){
            return res.status(401).json({
               success:false,
               error:"Session invalid"
            })
         }

         (req as any).user = user

         next()

      }catch(err){

         return res.status(401).json({
            success:false,
            error:"Authentication failed"
         })
      }

   }
}
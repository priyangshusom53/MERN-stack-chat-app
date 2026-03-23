import { User } from "../../core/user.js"
import type { AuthenticatedWebRequest } from "../../middlewares/authMiddleware.js"
import type { Action, RequestDS, ResponseDS } from "../action.js"
import type { UserDataAccess } from "../dataAccess/userDataAccess.js"
import type { Request, Response } from "express"

export interface AuthUserWebRequest extends AuthenticatedWebRequest{}

export interface AuthUserWebResponse extends Response{}

export class AuthUserWebController{

   action:Action<MeRequestDS,MeResponseDS>

   constructor(action:Action<MeRequestDS,MeResponseDS>){
      this.action = action
   }

   async getUser(req:AuthUserWebRequest, res:AuthUserWebResponse){

      if(!req.user){
         return res.status(401).json({
            success:false
         })
      }

      const requestDS = {
         user:req.user
      }

      const responseDS = await this.action.execute(requestDS)

      if(!responseDS.success){
         return res.status(401).json({
            success:false
         })
      }

      return res.json({
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
   }
}


type MeRequestDS = RequestDS & {
   user:User
}

type MeResponseDS = ResponseDS<{user:User},{}>

export class AuthUserAction implements Action<MeRequestDS, MeResponseDS>{

   userDataAccess:UserDataAccess

   constructor(userDataAccess:UserDataAccess){
      this.userDataAccess = userDataAccess
   }

   async execute(req:MeRequestDS):Promise<MeResponseDS>{

      /// DEBUG LOG
      console.log("Method: GET")
      console.log("Route: auth/me")
      console.log("Content: Auth User")
      /// DEBUG LOG

      if(!req.user){
         return { success:false }
      }

      return {
         success:true,
         user:req.user
      }
   }
}
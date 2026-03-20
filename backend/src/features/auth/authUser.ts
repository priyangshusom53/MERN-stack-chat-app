import { User } from "../../core/user.js"
import type { Action, RequestDS, ResponseDS } from "../action.js"
import type { UserDataAccess } from "../dataAccess/userDataAccess.js"
import type { Request, Response } from "express"

export interface AuthUserWebRequest extends Request{
   user:User
}

export interface AuthUserWebResponse extends Response{}

export class AuthUserWebController{

   action:Action<MeRequestDS,MeResponseDS>

   constructor(action:Action<MeRequestDS,MeResponseDS>){
      this.action = action
   }

   async getUser(req:AuthUserWebRequest, res:AuthUserWebResponse){

      const requestDS = {
         user:req.user
      }

      const response = await this.action.execute(requestDS)

      if(!response.success){
         return res.status(401).json({
            success:false
         })
      }

      return res.json({
         success:true,
         user:response.user
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

      if(!req.user){
         return { success:false }
      }

      return {
         success:true,
         user:req.user
      }
   }
}
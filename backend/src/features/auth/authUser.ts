import { User } from "../../core/user.js"

export class AuthUserWebController{

   action:AuthUserAction

   constructor(action:AuthUserAction){
      this.action = action
   }

   async getUser(req:any, res:any){

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


import type { Action, RequestDS, ResponseDS } from "../action.js"
import type { UserDataAccess } from "../dataAccess/userDataAccess.js"

interface MeRequestDS extends RequestDS{
   user:User
}

interface MeResponseDS extends ResponseDS{
   user?:User
}

export class AuthUserAction implements Action<MeRequestDS, MeResponseDS>{

   userDataAccess:UserDataAccess

   constructor(userDataAccess:UserDataAccess){
      this.userDataAccess = userDataAccess
   }

   async execute(req:MeRequestDS):Promise<MeResponseDS>{

      // const user = await this.userDataAccess.getUserById(req.userId)

      if(!req.user){
         return { success:false }
      }

      return {
         success:true,
         user:req.user
      }
   }
}
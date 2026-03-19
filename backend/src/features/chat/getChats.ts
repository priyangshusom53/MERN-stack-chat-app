import type { AuthenticatedWebRequest } from "../../middlewares/authMiddleware.js"

export interface GetChatsWebRequest{}

export interface GetChatsWebResponse{}

export class GetChatsWebController<
WebRequestType extends AuthenticatedWebRequest,
WebResponseType extends GetChatsWebResponse>{

   action:GetChatsAction

   constructor(action:GetChatsAction){
      this.action = action
   }

   async getChats(req:WebRequestType,res:WebResponseType){

      const requestDS:GetChatsRequestDS = {
         userId:req.user?.id || ""
      }

      const responseDS = await this.action.execute(requestDS)

      if(!responseDS.success){
         res.status(400).json({
            success:false,
            errorType:responseDS.errorType,
            error:responseDS.error
         })
         return
      }

      res.status(200).json({
         success:true,
         chats:responseDS.chats
      })
   }
}



import type { Action, RequestDS, ResponseDS } from "../action.js"
import { Chat } from "../../core/chat.js"
import type { ChatDataAccess } from "../dataAccess/chatDataAccess.js"

interface GetChatsRequestDS extends RequestDS{
   userId:string
}

interface GetChatsResponseDS extends ResponseDS{
   chats?:Chat[]
   errorType:string
   error:string
}

export class GetChatsAction
implements Action<GetChatsRequestDS,GetChatsResponseDS>{

   chatDataAccess:ChatDataAccess

   constructor(chatDataAccess:ChatDataAccess){
      this.chatDataAccess = chatDataAccess
   }

   async execute(req:GetChatsRequestDS):Promise<GetChatsResponseDS>{

      const chats = await this.chatDataAccess.getChatsOfUser(req.userId)

      if(!chats){
         return{
            success:false,
            errorType:"DATABASE_ERROR",
            error:"Failed to fetch chats"
         }
      }

      return{
         success:true,
         chats,
         errorType:"",
         error:""
      }
   }
}
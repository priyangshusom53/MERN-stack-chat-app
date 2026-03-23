import type { AuthenticatedWebRequest } from "../../middlewares/authMiddleware.js"
import type { Action, RequestDS, ResponseDS } from "../action.js"
import { Chat } from "../../core/chat.js"
import type { ChatDataAccess } from "../dataAccess/chatDataAccess.js"
import type { Request, Response } from "express"
import type { User } from "../../core/user.js"

export interface GetChatsWebRequest extends AuthenticatedWebRequest{}

export interface GetChatsWebResponse extends Response{}

export class GetChatsWebController{

   action:GetChatsAction

   constructor(action:GetChatsAction){
      this.action = action
   }

   async getChats(req:GetChatsWebRequest,res:GetChatsWebResponse){

      if(!req.user){
         res.status(401).json({
            success:false,
            errorType:"AUTH_ERROR",
            error:"user not authenticated"
         })
         return
      }
      const requestDS:GetChatsRequestDS = {
         user:req.user
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


enum GetChatsErrorTypes{
   DatabaseError="DATABASE_ERROR",
   NoError=""
}

type GetChatsRequestDS = RequestDS & {
   user:User
}

type GetChatsResponseDS = ResponseDS<
{
   chats:Chat[]
   errorType:GetChatsErrorTypes
   error:string
},{
   errorType:GetChatsErrorTypes
   error:string
}>

export class GetChatsAction
implements Action<GetChatsRequestDS,GetChatsResponseDS>{

   chatDataAccess:ChatDataAccess

   constructor(chatDataAccess:ChatDataAccess){
      this.chatDataAccess = chatDataAccess
   }

   async execute(req:GetChatsRequestDS):Promise<GetChatsResponseDS>{

      /// DEBUG LOG
      console.log("Method: GET")
      console.log("Route: chat/")
      console.log("Content: Chat[]")
      /// DEBUG LOG

      const chats = await this.chatDataAccess.getChatsOfUser(req.user.id)

      if(!chats){
         return{
            success:false,
            errorType:GetChatsErrorTypes.DatabaseError,
            error:"Failed to fetch chats"
         }
      }

      return{
         success:true,
         chats:chats,
         errorType:GetChatsErrorTypes.NoError,
         error:""
      }
   }
}
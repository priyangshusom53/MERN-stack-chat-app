import type { Request, Response } from "express";
import type { AuthenticatedWebRequest } from "../../middlewares/authMiddleware.js";
import type { Action, RequestDS, ResponseDS } from "../action.js";
import type { ChatDataAccess } from "../dataAccess/chatDataAccess.js";
import type { MessageDataAccess } from "../dataAccess/messageDataAccess.js";
import type { Message } from "../../core/message.js";


export interface GetMessagesWebRequest extends AuthenticatedWebRequest{
   params:{
      chatId:string
   },
   query:{
      limit:string,
      from:string
   }
}

export interface GetMessageWebResponse extends Response{}

export class GetMessagesWebController{
   
   action:Action<GetMessagesRequestDS, GetMessagesResponseDS>

   constructor(action:Action<GetMessagesRequestDS, GetMessagesResponseDS>){
      this.action = action
   }

   async getMessages(req:GetMessagesWebRequest, res:GetMessageWebResponse){

      const requestDS:GetMessagesRequestDS={
         chatId:req.params.chatId,
         from:parseInt(req.query.from,10),
         limit:parseInt(req.query.limit,10)
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
         messages:responseDS.messages
      })
   }
}


enum GetMessagesErrorTypes{
   ChatNotExist="CHAT_NOT_EXIST_ERROR",
   DatabaseError="DATABASE_ERROR",
   NoEror=""
}

type GetMessagesRequestDS = RequestDS & {
   chatId:string,
   from:number,
   limit:number
}

type GetMessagesResponseDS = ResponseDS<{
   messages:Message[],
   errorType:GetMessagesErrorTypes,
   error:string
},{
   errorType:GetMessagesErrorTypes,
   error:string
}>

export class GetMessagesAction implements Action<GetMessagesRequestDS, GetMessagesResponseDS>{

   chatDataAccess:ChatDataAccess
   messageDataAccess:MessageDataAccess

   constructor(chatDataAccess:ChatDataAccess, messageDataAccess:MessageDataAccess){
      this.chatDataAccess = chatDataAccess
      this.messageDataAccess = messageDataAccess
   }

   async execute(req: GetMessagesRequestDS):Promise<GetMessagesResponseDS> {

      const chat = await this.chatDataAccess.getChatById(req.chatId)

      if(!chat){
         return {
            success:false,
            errorType:GetMessagesErrorTypes.ChatNotExist,
            error:"chat with id: "+req.chatId+" not exist"
         }
      }

      const messages = await this.messageDataAccess.getMessagesByChatId(req.chatId)
      
      if(!messages){
         return{
            success:false,
            errorType:GetMessagesErrorTypes.DatabaseError,
            error:"failed to get messages"
         }
      }

      return{
         success:true,
         messages:messages,
         errorType:GetMessagesErrorTypes.NoEror,
         error:""
      }
   }
}
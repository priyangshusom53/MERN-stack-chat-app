import type { AuthenticatedWebRequest } from "../../middlewares/authMiddleware.js"


export interface CreateChatWebResponse{}

export interface CreatePrivateChatWebRequest{
   body:{
      email:string
   }
}

export class CreatePrivateChatWebController<
Req extends AuthenticatedWebRequest & CreatePrivateChatWebRequest,
Res extends Response>{

   action:CreatePrivateChatAction

   constructor(action:CreatePrivateChatAction){
      this.action = action
   }

   async createPrivateChat(req:Req,res:Res){

      const requestDS = {
         userId:req.user?.id || "",
         participantId:req.body.email
      }

      const responseDS = await this.action.execute(requestDS)

      if(!responseDS.success){
         res.status(400).json(responseDS)
         return
      }

      res.status(201).json({
         success:true,
         chat:responseDS.chat
      })
   }
}



import type { Action, RequestDS, ResponseDS } from "../action.js"
import { Chat } from "../../core/chat.js"
import type { ChatDataAccess } from "../dataAccess/chatDataAccess.js"
import type { UserDataAccess } from "../dataAccess/userDataAccess.js"



interface CreatePrivateChatRequestDS extends RequestDS{
   userId:string
   participantId:string
}

interface CreatePrivateChatResponseDS extends ResponseDS{
   chat?:Chat
   errorType:string
   error:string
}

export class CreatePrivateChatAction
implements Action<CreatePrivateChatRequestDS,CreatePrivateChatResponseDS>{

   chatDataAccess:ChatDataAccess
   userDataAccess:UserDataAccess

   constructor(
      chatDataAccess:ChatDataAccess,
      userDataAccess:UserDataAccess
   ){
      this.chatDataAccess = chatDataAccess
      this.userDataAccess = userDataAccess
   }

   async execute(
      req:CreatePrivateChatRequestDS
   ):Promise<CreatePrivateChatResponseDS>{

      if(req.userId === req.participantId){
         return{
            success:false,
            errorType:"INVALID_USER",
            error:"Cannot create chat with yourself"
         }
      }

      // Validate participant exists
      const user = await this.userDataAccess.getUserByEmail(req.participantId)

      if(!user){
         return{
            success:false,
            errorType:"USER_NOT_FOUND",
            error:"User does not exist"
         }
      }

      // Deduplication check
      const existingChat =
         await this.chatDataAccess.findPrivateChatBetweenUsers(
            req.userId,
            user.id
         )

      if(existingChat){
         return{
            success:true,
            chat:existingChat,
            errorType:"",
            error:""
         }
      }
      console.log(req.userId)
      console.log(user.id)
      // Create new chat
      const chat = await this.chatDataAccess.createChat({
         name:"",
         isGroupChat:false,
         participants:[
            req.userId,
            user.id
         ],
         createdBy:req.userId
      })

      if(!chat){
         return{
            success:false,
            errorType:"DATABASE_ERROR",
            error:"Failed to create chat"
         }
      }

      return{
         success:true,
         chat,
         errorType:"",
         error:""
      }
   }
}
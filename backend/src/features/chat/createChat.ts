import type { AuthenticatedWebRequest } from "../../middlewares/authMiddleware.js"
import type { Action, RequestDS, ResponseDS } from "../action.js"
import { Chat } from "../../core/chat.js"
import type { ChatDataAccess } from "../dataAccess/chatDataAccess.js"
import type { UserDataAccess } from "../dataAccess/userDataAccess.js"
import type { Response } from "express"
import type { User } from "../../core/user.js"
import url from 'node:url'
import path from 'node:path'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export interface CreateChatWebRequest extends AuthenticatedWebRequest{
   body:{
      type:'private' | 'group',
      name?:string,
      participants:string[]
   }
}

export interface CreateChatWebResponse extends Response{}

export class CreateChatWebController{

   action:Action<CreateChatRequestDS,CreateChatResponseDS>

   constructor(action:Action<CreateChatRequestDS,CreateChatResponseDS>){
      this.action = action
   }

   async createPrivateChat(req:CreateChatWebRequest,res:CreateChatWebResponse){

      try{
         if(!req.user){
            res.status(401).json(
               {
                  success:false,
                  error:"user not authenticated"
               }
            )
            return
         }

         const requestDS:CreateChatRequestDS = {
            user:req.user,
            isGroupChat:(req.body.type==='group') ? true : false,
            name:req.body.name||null,
            participants:req.body.participants
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

         res.status(201).json({
            success:true,
            chat:responseDS.chat
         })
         
      }catch(err){
         console.error(`Error in file: ${__filename} `+err)
         res.status(500).json({
            success:false,
            error:"server error"
         })
      }
   }
}

enum CreateChatErrorTypes{
   InvalidInput="INVALID_INPUT_ERROR",
   DatabaseError="DATABASE_ERROR",
   NoError=""
}

type CreateChatRequestDS = RequestDS & {
   user:User,
   isGroupChat:boolean,
   name:string | null,
   participants:string[]
}

type CreateChatResponseDS = ResponseDS<
{
   chat:Chat
   errorType:CreateChatErrorTypes
   error:string
},{
   errorType:CreateChatErrorTypes
   error:string
}>

export class CreatePrivateChatAction
implements Action<CreateChatRequestDS,CreateChatResponseDS>{

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
      req:CreateChatRequestDS
   ):Promise<CreateChatResponseDS>{

      if(req.isGroupChat){

         if(!req.name) req.name = "New group"

         const participants:User[] = []
         for(let i=0; i<req.participants.length; ++i){
            const participant = await this.userDataAccess.getUserByEmail(req.participants[i] as string)

            if(!participant){
               return{
                  success:false,
                  errorType:CreateChatErrorTypes.InvalidInput,
                  error:"invalid user emails"
               }
            }

            participants.push(participant)
         }

         const ids = participants.map(participant=>participant.id)

         const group = await this.chatDataAccess.createChat(new Chat(
            "-1",
            req.name,
            true,
            ids,
            "",
            req.user.id
         ))

         if(!group){
            return{
               success:false,
               errorType:CreateChatErrorTypes.DatabaseError,
               error:"failed to create chat"
            }
         }

         return {
            success:true,
            chat:group,
            errorType:CreateChatErrorTypes.NoError,
            error:""
         }

      }else{
         if(req.participants.length===1 || req.participants.length>2){
            return {
               success:false,
               errorType:CreateChatErrorTypes.InvalidInput,
               error:"invalid user input"
            }
         }

         const otherUserEmail = req.participants.filter(email=> email!=req.user.email)
         if(otherUserEmail.length===0){
            return {
               success:false,
               errorType:CreateChatErrorTypes.InvalidInput,
               error:"Can't create chat with self"
            }
         }

         const otherUser = await this.userDataAccess.getUserByEmail(otherUserEmail[0] as string)
         if(!otherUser){
            return {
               success:false,
               errorType:CreateChatErrorTypes.InvalidInput,
               error:"user emails not valid"
            }
         }
         const existingChat = await this.chatDataAccess.findPrivateChatBetweenUsers(req.user.id, otherUser.id)

         if(existingChat){
            return {
               success:true,
               chat:existingChat,
               errorType:CreateChatErrorTypes.NoError,
               error:""
            }
         }

         const chat = await this.chatDataAccess.createChat(new Chat(
            "-1",
            "",
            false,
            [req.user.id, otherUser.id]            
         ))

         if(!chat){
            return{
               success:false,
               errorType:CreateChatErrorTypes.DatabaseError,
               error:"failed to create chat"
            }
         }

         return{
            success:true,
            chat:chat,
            errorType:CreateChatErrorTypes.NoError,
            error:""
         }
      }
   }
}
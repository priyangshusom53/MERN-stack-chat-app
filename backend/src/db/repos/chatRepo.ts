import type { ChatDataAccess } from "../../features/dataAccess/chatDataAccess.js"
import type { IDatabase, MongoNoSQLDB } from "../db.js"
import { Chat } from "../../core/chat.js"
import { User } from "../../core/user.js"
import { ChatModel, type IChatSchema, type IMessageSchema, type WithId } from "../schemas.js"
import { FromMessageDocToMessage } from "./messageRepo.js"
import mongoose from "mongoose"

export function FromChatDocToChat(doc:WithId<IChatSchema>,messageDoc?:WithId<IMessageSchema>){
   return new Chat(
      doc._id.toString(),
      doc.name,
      doc.isGroupChat,
      doc.participants.map(participant=>{
         return participant.toString()
      }),
      doc.icon || undefined,
      doc.createdBy?.toString() || undefined,
      doc.createdAt,
      doc.inviteToken || undefined,
      (messageDoc) ? FromMessageDocToMessage(messageDoc) : undefined
   )
}

export function FromChatToChatDoc(chat:Chat){
   const doc:Partial<IChatSchema> = {
      name:chat.name,
      isGroupChat:chat.isGroupChat,
      participants:chat.participants.map(p=> new mongoose.Types.ObjectId(p)),
      icon:chat.icon,
      createdBy: chat.createdBy ? new mongoose.Types.ObjectId(chat.createdBy) : null,
      inviteToken: chat.inviteToken,
      lastMessage: chat.lastMessage ? new mongoose.Types.ObjectId(chat.lastMessage.id) : null
   }
   return doc
}

export class ChatRepo implements ChatDataAccess{

   db:MongoNoSQLDB
   model:typeof ChatModel

   constructor(
      db:MongoNoSQLDB,
      model:typeof ChatModel
   ){
      this.db = db
      this.model = model
   }

   async getChatById(id:string):Promise<Chat|null>{
      const res = await this.db.findOne(this.model,{_id:id})
      if(!res) return null
      return FromChatDocToChat(res)
   }

   async getChatsOfUser(userId:string):Promise<Chat[] | null>{
      const res = await this.db.find(this.model, { participants: new mongoose.Types.ObjectId(userId) },{sort:{updatedAt:-1},populate:"lastMessage"})

      if(!res) return null
      const chats = res.map(chat=>{
         return FromChatDocToChat(chat,chat.lastMessage as any)
      })
      return chats
   }

   async findPrivateChatBetweenUsers(userA:string,userB:string):Promise<Chat|null>{
      const res = await this.db.findOne(this.model, {
         participants: { $all: [userA, userB] },
         isGroupChat: false
      },{
         populate:"lastMessage"
      })
      if(!res) return null
      return FromChatDocToChat(res, res.lastMessage as any)
   }

   async findGroupChats(id:string):Promise<Chat[]|null>{
      const res = await this.db.find(this.model, {
         participants:id,
         isGroupChat:true
      },{
         sort:{ updatedAt:-1 },
         populate:"lastMessage"
      })
      if(!res) return null
      const grpChats = res.map(chat=>{
         return FromChatDocToChat(chat, chat.lastMessage as any)
      })
      return grpChats
   }

   async createChat(data:Chat):Promise<Chat | null>{
      const doc = FromChatToChatDoc(data)
      const res = await this.db.create(this.model, doc)
      if(!res) return null
      return FromChatDocToChat(res)
   }

   async deleteChat(chatId:string):Promise<boolean>{
      const res = await this.db.deleteOne(this.model,{_id:chatId})
      if(!res) return false
      return true
   }
}

import type { MessageDataAccess } from "../../features/dataAccess/messageDataAccess.js"
import { MongoNoSQLDB } from "../db.js"
import { MessageModel, type IMessageSchema, type WithId } from "../schemas.js"
import { Message } from "../../core/message.js"
import mongoose from "mongoose"

function FromMessageDocToMessage(doc:WithId<IMessageSchema>){
   return new Message(
      doc._id.toString(),
      doc.chatId.toString(),
      doc.senderId.toString(),
      doc.createdAt,
      doc.text,
      doc.image || undefined,
      doc.isDeleted
   )
}

function FromMessageToMessageDoc(message:Message){
   const doc:Partial<IMessageSchema> = {
      chatId:new mongoose.Types.ObjectId(message.chatId),
      senderId:new mongoose.Types.ObjectId(message.senderId),
      text:message.text || "",
      image:message.image,
      createdAt:message.sentAt,
      isDeleted:message.isDeleted
   }
   return doc
}

export class MessageRepo implements MessageDataAccess{

   db:MongoNoSQLDB
   model:typeof MessageModel

   constructor(
      db:MongoNoSQLDB,
      model:typeof MessageModel
   ){
      this.db = db
      this.model = model
   }

   async getMessagesByChatId(chatId:string):Promise<Message[] | null>{
      const res = await this.db.find(this.model,{chatId:chatId},{ sort:{ createdAt:-1 }})
      if(!res) return null
      const messages = res.map(messageDoc=>{
         return FromMessageDocToMessage(messageDoc)
      })
      return messages
   }

   async getLastMessageOfChat(chatId:string):Promise<Message | null>{

      const res = await this.db.find(this.model,{chatId:chatId},
         {
            sort:{createdAt:-1},
            limit:1
         }
      )
      if(!res || !res.length) return null
      return FromMessageDocToMessage(res[0] as WithId<IMessageSchema>)
   }

   async getMessageById(id:string):Promise<Message | null>{
      const res = await this.db.findOne(this.model,{_id:id})
      if(!res) return null
      return FromMessageDocToMessage(res)
   }

   async addMessage(data:Message):Promise<Message | null>{
      const res = await this.db.create(this.model,FromMessageToMessageDoc(data))
      if(!res) return null
      return FromMessageDocToMessage(res)
   }

   async deleteMessage(id:string):Promise<boolean>{
      let res = await this.db.updateOne(this.model, {_id:id},{isDeleted:true})
      if(!res) return false
      return res.isDeleted
   }
}

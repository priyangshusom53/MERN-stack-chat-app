import type { MessageDataAccess } from "../../features/dataAccess/messageDataAccess.js"
import type { IDatabase } from "../db.js"
import { Message } from "../../core/message.js"

export class MessageRepo implements MessageDataAccess{

   db:IDatabase
   tableName:string

   constructor(
      db:IDatabase,
      tableName:string
   ){
      this.db = db
      this.tableName = tableName
   }

   private toDomain(data:any):Message{
      return new Message(
         data._id.toString(),
         data.chatId.toString(),
         data.senderId.toString(),
         data.text,
         data.timestamp
      )
   }

   async getMessagesByChatId(chatId:string):Promise<Message[] | null>{

      const results = await this.db.find(
         this.tableName,
         { chatId },
         { sort:{ timestamp:1 } }
      )

      if(!results.length) return []

      return results.map((m)=>this.toDomain(m))
   }

   async getLastMessageOfChat(chatId:string):Promise<Message | null>{

      const results = await this.db.find(
         this.tableName,
         { chatId },
         {
            sort:{ timestamp:-1 },
            limit:1
         }
      )

      if(!results.length) return null

      return this.toDomain(results[0])
   }

   async getMessageById(id:string):Promise<Message | null>{

      const result = await this.db.findOne(
         this.tableName,
         { _id:id }
      )

      if(!result) return null

      return this.toDomain(result)
   }

   async addMessage(data:{senderId:string, text:string, chatId:string}):Promise<Message | null>{

      const result = await this.db.create(
         this.tableName,
         {
            senderId:data.senderId,
            chatId:data.chatId,
            text:data.text,
            timestamp:new Date()
         }
      )

      if(!result) return null

      return this.toDomain(result)
   }
}

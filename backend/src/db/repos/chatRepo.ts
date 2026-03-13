import type { ChatDataAccess } from "../../features/dataAccess/chatDataAccess.js"
import type { IDatabase } from "../db.js"
import { Chat } from "../../core/chat.js"
import { User } from "../../core/user.js"

export class ChatRepo implements ChatDataAccess{

   db:IDatabase
   chatTable:string
   userTable:string

   constructor(
      db:IDatabase,
      chatTable:string,
      userTable:string
   ){
      this.db = db
      this.chatTable = chatTable
      this.userTable = userTable
   }

   private toDomain(data:any):Chat{
      return new Chat(
         data._id.toString(),
         data.name,
         data.isGroupChat,
         data.participants.map((p:any)=>p.toString())
      )
   }

   private userToDomain(data:any):User{
      return new User(
         data._id.toString(),
         data.name,
         data.email,
         data.password,
         data.createdAt,
         data.profilePicUrl,
         data.about,
         data.chats
      )
   }

   async getChatById(id:string):Promise<Chat | null>{

      const result = await this.db.findOne(
         this.chatTable,
         { _id:id }
      )

      if(!result) return null

      return this.toDomain(result)
   }

   async getParticipants(id:string):Promise<User[] | null>{

      const chat = await this.db.findOne(
         this.chatTable,
         { _id:id }
      )

      if(!chat) return null

      const users = await this.db.find(
         this.userTable,
         { _id:{ $in: chat.participants } }
      )

      return users.map((u:any)=>this.userToDomain(u))
   }

   async createChat(
      data:{
         name:string,
         isGroupChat:boolean,
         participants:string[]
      }
   ):Promise<Chat | null>{

      const result = await this.db.create(
         this.chatTable,
         {
            name:data.name,
            isGroupChat:data.isGroupChat,
            participants:data.participants
         }
      )

      if(!result) return null

      return this.toDomain(result)
   }
}

import type { ChatDataAccess } from "../../features/dataAccess/chatDataAccess.js"
import type { IDatabase, MongoNoSQLDB } from "../db.js"
import { Chat } from "../../core/chat.js"
import { User } from "../../core/user.js"
import { ChatModel, type IChatSchema, type WithId } from "../schemas.js"

function FromChatDocToChat(doc:WithId<IChatSchema>){
   return new Chat(
      doc._id.toString(),
      doc.name,
      doc.isGroupChat,
      doc.participants.map(participant=>{
         return participant.toString()
      }),
      doc.groupIcon || undefined,
      doc.createdBy?.toString() || undefined,
      doc.createdAt,
      doc.inviteToken || undefined,
      doc.lastMessage || undefined
   )
}

function FromChatToChatDoc(chat:Chat){
   const doc:Partial<IChatSchema> = {
      
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

   }
   getChatsOfUser(userId:string):Promise<Chat[] | null>;
   findPrivateChatBetweenUsers(userA:string,userB:string):Promise<Chat|null>;
   findGroupChat(id:string):Promise<Chat|null>;
   createChat(data:Chat):Promise<Chat | null>;
   deleteChat(chatId:string):Promise<boolean|null>;
}

import type { Chat } from "../../core/chat.js";
import type { User } from "../../core/user.js";

export interface ChatDataAccess{
   getChatById(id:string):Promise<Chat  | null>;
   getParticipants(id:string):Promise<User[]  | null>;
   createChat(
      data:{
         name:string, 
         isGroupChat:boolean,
         participants:string[] 
      }
   ):Promise<Chat | null>
}
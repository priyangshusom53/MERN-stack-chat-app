import type { Chat } from "../../core/chat.js";
import type { User } from "../../core/user.js";

export interface ChatDataAccess{
   getChatById(id:string):Promise<Chat|null>;
   getChatsOfUser(userId:string):Promise<Chat[] | null>;
   findPrivateChatBetweenUsers(userA:string,userB:string):Promise<Chat|null>;
   findGroupChats(id:string):Promise<Chat[]|null>;
   createChat(data:Chat):Promise<Chat | null>;
   deleteChat(chatId:string):Promise<boolean>;
}
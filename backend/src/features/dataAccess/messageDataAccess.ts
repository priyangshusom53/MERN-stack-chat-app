import type { Message } from "../../core/message.js";

export interface MessageDataAccess{
   getMessagesByChatId(chatId:string):Promise<Message[] | null>;
   getLastMessageOfChat(chatId:string):Promise<Message | null>;
   getMessageById(id:string):Promise<Message | null>;
   addMessage(data:Message):Promise<Message | null>;
   deleteMessage(id:string):Promise<boolean>;
}
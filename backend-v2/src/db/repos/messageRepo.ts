
import type { DocumentDatabase } from "./dbInterface.js";
import type { MessageDataAccess } from "../../dataAccess/messageDataAccess.js";
import type { Message } from "../../core/message.js";

class MessageRepo implements MessageDataAccess {
   db: DocumentDatabase;

   constructor(db: DocumentDatabase) { this.db = db }

   async FindMessageById(id: string): Promise<Message | null> {

   }

   async AddMessageBetweenUsers(senderId: string, receiverId: string): Promise<Message> {

   }

   async FindMessagesBetweenUsers(userId1: string, userId2: string, limit: number): Promise<Message[] | null> {

   }
}
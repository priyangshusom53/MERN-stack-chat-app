import type { Message } from "../core/message.js";

export interface MessageDataAccess {
   FindMessageById(id: string): Promise<Message | null>;
   AddMessageBetweenUsers(senderId: string, receiverId: string): Promise<Message | null>;
   FindMessagesBetweenUsers(userId1: string, userId2: string, limit: number): Promise<Message[] | null>
}

import type { DocumentDatabase } from "./dbInterface.js";
import type { MessageDataAccess } from "../../dataAccess/messageDataAccess.js";
import { Message } from "../../core/message.js";
import type { IDataBase } from "../db.js";

export class MessageRepo implements MessageDataAccess {

   db: IDataBase;
   tableName: string;

   constructor(db: IDataBase, tableName: string) {
      this.db = db;
      this.tableName = tableName;
   }

   async FindMessageById(id: string): Promise<Message | null> {

      const res = await this.db.findOne(this.tableName, { _id: id });

      if (!res) return null;

      return new Message(
         res._id.toString(),
         res.senderId.toString(),
         res.receiverId.toString(),
         res.createdAt,
         res.text
      );
   }

   async AddMessageBetweenUsers(
      senderId: string,
      receiverId: string,
      text: string,
      media?: string
   ): Promise<Message | null> {

      const res = await this.db.create(this.tableName, {
         senderId,
         receiverId,
         text,
         media
      });

      if (!res) return null;

      return new Message(
         res._id.toString(),
         res.senderId.toString(),
         res.receiverId.toString(),
         res.createdAt,
         res.text,
         res.media
      );
   }

   async FindMessagesBetweenUsers(
      userId1: string,
      userId2: string,
      limit: number
   ): Promise<Message[] | null> {

      const res = await this.db.find(this.tableName, {
         $or: [
            { senderId: userId1, receiverId: userId2 },
            { senderId: userId2, receiverId: userId1 }
         ]
      });

      if (!res) return null;

      if(limit===-1){
         const messages = res
         .sort((a: any, b: any) => a.createdAt - b.createdAt)
         .map((msg: any) =>
            new Message(
               msg._id.toString(),
               msg.senderId.toString(),
               msg.receiverId.toString(),
               msg.createdAt,
               msg.text,
               msg.media
            )
         );

         return messages;
      }else{
         const messages = res
         .sort((a: any, b: any) => a.createdAt - b.createdAt)
         .slice(-limit)
         .map((msg: any) =>
            new Message(
               msg._id.toString(),
               msg.senderId.toString(),
               msg.receiverId.toString(),
               msg.createdAt,
               msg.text,
               msg.media
            )
         );
         return messages;
      }
   }
}
import mongoose, { Document } from "mongoose";
import { findUserById, getModel as getUserModel } from './user.js'

// types
import { type DataBase } from "../db.js";

export interface IMessage extends Document {
   _id: mongoose.Types.ObjectId
   senderId: mongoose.Types.ObjectId
   receiverId: mongoose.Types.ObjectId
   content: string
   timestamp: Date
}

export const messageSchema = new mongoose.Schema<IMessage>({
   senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   content: { type: String, required: true },
   timestamp: { type: Date, default: Date.now }
})

export const messageCollection = "Messages";
let Message: mongoose.Model<IMessage> | null = null;
export const setModel = (db: DataBase) => {
   Message = db.createCollection('Message', messageSchema, 'Messages')
}
export const getModel = (db: DataBase) => {
   return db.createCollection<IMessage>('Message', messageSchema, 'Messages')
}

export type MessageData = {
   senderId: mongoose.Types.ObjectId
   receiverId: mongoose.Types.ObjectId
   content: string
}

import { addContact } from "./user.js";

export const addMessage = async (db: DataBase, messageData: MessageData) => {
   if (db.isConnected) {
      if (Message) {
         // Create a new message instance
         const message = new Message({
            senderId: messageData.senderId,
            receiverId: messageData.receiverId,
            content: messageData.content,
            timestamp: Date.now()
         });
         try {
            const savedMessage = await message.save();
            console.log("Message saved:", savedMessage);
            const sender = await findUserById(db, messageData.senderId)
            if (sender !== null) {
               const contact = sender.contacts.find((c) => { return c.contact === messageData.receiverId })
               if (contact) {
                  if (contact.chatDeleted) {
                     contact.chatDeleted = false
                  }
                  contact.messageCount += 1
                  contact.currentMessageCount += 1
                  contact.lastMessage = savedMessage._id
                  const contactIdx = sender.contacts.findIndex((c) => { return c.contact === messageData.receiverId })
                  if (contactIdx !== -1) {
                     sender.contacts[contactIdx] = contact
                  }
                  await sender.save()

               } else {
                  const updatedSender = await addContact(db, sender._id, messageData.receiverId)

                  const contact = updatedSender.contacts.find((c) => { return c.contact === messageData.receiverId })
                  if (contact) {
                     contact.messageCount += 1
                     contact.currentMessageCount += 1
                     contact.lastMessage = savedMessage._id
                     const contactIdx = updatedSender.contacts.findIndex((c) => { return c.contact === messageData.receiverId })
                     if (contactIdx !== -1) {
                        updatedSender.contacts[contactIdx] = contact
                     }
                     await updatedSender.save()

                  }

               }
            }
            const receiver = await findUserById(db, messageData.receiverId)
            if (receiver) {
               const contact = receiver.contacts.find((c) => { return c.contact === messageData.senderId })
               if (contact) {
                  if (contact.chatDeleted) {
                     contact.chatDeleted = false
                  }
                  contact.messageCount += 1
                  contact.currentMessageCount += 1
                  contact.lastMessage = savedMessage._id
                  const contactIdx = receiver.contacts.findIndex((c) => { return c.contact === messageData.senderId })
                  if (contactIdx !== -1) {
                     receiver.contacts[contactIdx] = contact
                  }
                  await receiver.save()
                  return message;
               } else {
                  const updatedReceiver = await addContact(db, receiver._id, messageData.senderId)

                  const contact = updatedReceiver.contacts.find((c) => { return c.contact === messageData.senderId })
                  if (contact) {
                     contact.messageCount += 1
                     contact.currentMessageCount += 1
                     contact.lastMessage = savedMessage._id
                     const contactIdx = updatedReceiver.contacts.findIndex((c) => { return c.contact === messageData.senderId })
                     if (contactIdx !== -1) {
                        updatedReceiver.contacts[contactIdx] = contact
                     }
                     await updatedReceiver.save()

                  }
                  return message;
               }
            }

         } catch (err: any) {
            throw new Error(`Error saving message ${err.message}`);
         }
      }
      throw new Error(`Message Collection does not exist`)
   }
   else {
      throw new Error("DB not connected");
   }
}


export const findMessagesBetweenUsers = async (db: DataBase, userId1: mongoose.Types.ObjectId, userId2: mongoose.Types.ObjectId, limit: number) => {
   if (db.isConnected) {
      try {
         if (Message) {
            const user1 = await findUserById(db, userId1)
            const contact = user1?.contacts.find((c) => { return c.contact === userId2 })
            if (contact) {
               let messageCountToFetch = 0
               if (limit >= 1) {
                  messageCountToFetch = Math.min(contact.currentMessageCount, limit)
               } else {
                  messageCountToFetch = contact.currentMessageCount
               }
               const messages = await Message.find({
                  $or: [
                     { senderId: userId1, receiverId: userId2 },
                     { senderId: userId2, receiverId: userId1 }
                  ]
               }).sort({ timestamp: -1 }).limit(messageCountToFetch);
               return messages;
            }
         }
      } catch (err: any) {
         throw new Error(`Error finding messages between users:${err.message}`);
      }
   }
   else {
      throw new Error("DB not connected");
   }
}

// export const deleteMessagesBetweenUsers = async (db, userId1, userId2) => {
//    if (db.isConnected) {
//       try {
//          const result = await Message.deleteMany({
//             $or: [
//                { senderId: userId1, receiverId: userId2 },
//                { senderId: userId2, receiverId: userId1 }
//             ]
//          });
//          return result;
//       } catch (err) {
//          console.log("Error deleting messages between users:", err.message);
//          return new Error("Error deleting messages between users");
//       }
//    }
//    else {
//       return new Error("DB not connected");
//    }
// }
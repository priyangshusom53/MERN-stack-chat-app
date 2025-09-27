import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
   senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   content: { type: String, required: true },
   timestamp: { type: Date, default: Date.now }
})

export const messageCollection = "Messages";
let Message = null;
export const setModel = (db) => {
   Message = db.createCollection('Message', messageSchema, 'Messages')
}


export const addMessage = async (db, messageData) => {
   if (db.isConnected) {
      if (messageData?.senderId === null) return new Error("Sender ID is required");
      if (messageData?.receiverId === null) return new Error("Receiver ID is required");
      if (messageData?.content === null) return new Error("Content is required");
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
      } catch (err) {
         console.log("Error saving message:", err.message);
         return new Error("Error saving message");
      }
   }
   else {
      return new Error("DB not connected");
   }
}

export const findMessagesBetweenUsers = async (db, userId1, userId2, limit) => {
   if (db.isConnected) {
      try {
         const messages = await Message.find({
            $or: [
               { senderId: userId1, receiverId: userId2 },
               { senderId: userId2, receiverId: userId1 }
            ]
         }).sort({ timestamp: 1 }).limit(limit);
         return messages;
      } catch (err) {
         console.log("Error finding messages between users:", err.message);
         return new Error("Error finding messages between users");
      }
   }
   else {
      return new Error("DB not connected");
   }
}

export const deleteMessagesBetweenUsers = async (db, userId1, userId2) => {
   if (db.isConnected) {
      try {
         const result = await Message.deleteMany({
            $or: [
               { senderId: userId1, receiverId: userId2 },
               { senderId: userId2, receiverId: userId1 }
            ]
         });
         return result;
      } catch (err) {
         console.log("Error deleting messages between users:", err.message);
         return new Error("Error deleting messages between users");
      }
   }
   else {
      return new Error("DB not connected");
   }
}
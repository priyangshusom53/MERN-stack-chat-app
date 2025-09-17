import { addMessage } from "../../db/models/message.js";
import { findUserById, findUserByEmail } from "../../db/models/user.js";
import { dbConnection } from "../../index.js";

export const sendMessage = async (req, res) => {
   const data = req.body;
   try {
      if (!data.senderId || !data.receiverEmail || !data.messageContent) {
         res.status(400).json({ message: "Insufficient information" });
         return;
      }
      const sendingUser = await findUserById(dbConnection, data.senderId);
      const receivingUser = await findUserByEmail(dbConnection, data.receiverEmail);
      const messageData = {
         senderId: sendingUser._id,
         receiverId: receivingUser._id,
         content: data.messageContent
      }
      await addMessage(dbConnection, messageData);
      res.status(201).json({ message: "Message send successfully" })
   } catch (err) {
      console.log("Error in message route: ", err.message);
      res.status(500).json({ message: "Server error" });
   }
}
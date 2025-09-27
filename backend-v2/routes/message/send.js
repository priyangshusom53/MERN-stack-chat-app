import { addMessage } from "../../db/models/message.js";
import { findUserById, findUserByEmail } from "../../db/models/user.js";
import { db } from "../../index.js";

export const sendMessage = async (req, res) => {
   const data = req.body;
   try {
      if (!data.senderEmail || !data.receiverEmail || !data.messageContent) {
         console.log(`Error in /send-message route: Insufficient information`)
         res.status(400).json({ message: "Insufficient information" });
         return;
      }
      const sendingUser = await findUserByEmail(db, data.senderEmail);
      const receivingUser = await findUserByEmail(db, data.receiverEmail);
      const messageData = {
         senderId: sendingUser._id,
         receiverId: receivingUser._id,
         content: data.messageContent
      }
      await addMessage(db, messageData);
      console.log('/send-message route: message saved')
      res.status(201).json({ message: "Message send successfully" })
   } catch (err) {
      console.log("Error in send-message route: ", err.message);
      res.status(500).json({ message: "Server error" });
   }
}
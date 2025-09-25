import { findUserById, findUserByEmail } from "../../db/models/user.js"
import { findMessagesBetweenUsers } from '../../db/models/message.js'
import { db } from "../../index.js";

export const getMessages = async (req, res) => {
   const data = req.body;
   try {
      if (!data.senderId || !data.receiverEmail) {
         res.status(400).json({ message: "Insufficient information" });
         return;
      }
      const sendingUser = await findUserById(db, data.senderId);
      const recevingUser = await findUserByEmail(db, data.receiverEmail);
      const messages = await findMessagesBetweenUsers(db, sendingUser._id, recevingUser._id);
      const _messages = messages.map((message) => {
         const type = (message.senderId === sendingUser._id) ? 'sent' : 'received'
         const _message = {
            type, content: message.content, timestamp: message.timestamp
         }
         return _message
      })
      res.status(200).json({ message: "Message fetched successfully", data: _messages })
   } catch (err) {
      console.log("Error in message route: ", err.message);
      res.status(500).json({ message: "Server error" });
   }
}
import { findUserById, findUserByEmail } from "../../db/models/user.js"
import { findMessagesBetweenUsers } from '../../db/models/message.js'
import { db } from "../../index.js";

export const getMessages = async (req, res) => {
   const data = req.body;
   let limit = req.query.limit ? parseInt(req.query.limit) : 0

   try {
      if (!data.senderEmail || !data.receiverEmail) {
         res.status(400).json({ message: "Insufficient information" });
         return;
      }
      const sendingUser = await findUserByEmail(db, data.senderEmail);
      const recevingUser = await findUserByEmail(db, data.receiverEmail);
      const messages = await findMessagesBetweenUsers(db, sendingUser._id, recevingUser._id, limit);
      const _messages = messages.map((message) => {
         const type = (message.senderId === sendingUser._id) ? 'sent' : 'received'
         const _message = {
            type, content: message.content, timestamp: message.timestamp
         }
         return _message
      })
      res.status(200).json({ message: "Messages fetched successfully", data: _messages })
   } catch (err) {
      console.log("Error in message route: ", err.message);
      res.status(500).json({ message: "Server error" });
   }
}
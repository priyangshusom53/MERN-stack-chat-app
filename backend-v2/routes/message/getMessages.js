import { findUserById, findUserByEmail } from "../../db/models/user.js"
import { findMessagesBetweenUsers } from '../../db/models/message.js'
import { dbConnection } from "../../index.js";

export const getMessages = async (req, res) => {
   const data = req.body;
   try {
      if (!data.senderId || !data.receiverEmail) {
         res.status(400).json({ message: "Insufficient information" });
         return;
      }
      const sendingUser = await findUserById(dbConnection, data.senderId);
      const recevingUser = await findUserByEmail(dbConnection, data.receiverEmail);
      const messages = await findMessagesBetweenUsers(dbConnection, sendingUser._id, recevingUser._id);
      res.status(200).json({ message: "Message fetched successfully", data: messages })
   } catch (err) {
      console.log("Error in message route: ", err.message);
      res.status(500).json({ message: "Server error" });
   }
}
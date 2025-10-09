import { addMessage } from "../../db/models/message.js";
import { findUserById, findUserByEmail } from "../../db/models/user.js";
import { db } from "../../index.js";

const statusCodes = {
   BadRequest: 400,
   Unauthorized: 401,
   Forbidden: 403,
   NotFound: 404
}

// types
import { type DataBase } from "../../db/db.js";
import type { Request, Response, NextFunction, } from "express";
import { type MessageData } from "../../db/models/message.js";

// export const sendMessage = async (req, res) => {
//    const data = req.body;
//    try {
//       if (!data.senderEmail || !data.receiverEmail || !data.messageContent) {
//          console.log(`Error in /send-message route: Insufficient information`)
//          res.status(400).json({ message: "Insufficient information" });
//          return;
//       }
//       const sendingUser = await findUserByEmail(db, data.senderEmail);
//       const receivingUser = await findUserByEmail(db, data.receiverEmail);
//       const messageData = {
//          senderId: sendingUser._id,
//          receiverId: receivingUser._id,
//          content: data.messageContent
//       }
//       await addMessage(db, messageData);
//       console.log('/send-message route: message saved')
//       res.status(201).json({ message: "Message send successfully" })
//    } catch (err) {
//       console.log("Error in send-message route: ", err.message);
//       res.status(500).json({ message: "Server error" });
//    }
// }

import * as jwt from '../../utils/jwt.js'
import { timeStamp } from "console";

//POST: /api/v1/contacts/:contactEmail/message
export const postMessage = async (req: Request, res: Response) => {

   const data = req.body;
   if (!data.text) {
      console.error(`Error in POST:/api/v1/contacts/:contactEmail/message route: Insufficient information`)
      res.status(400).json({ message: "Insufficient information" });
      return;
   }
   try {
      const sessionId = req.cookies.sessionId
      const decoded = jwt.verifyToken(sessionId)
      if (!decoded) {
         res.status(401).json({ message: "invalid user" })
         return
      }
      const { userId, password } = decoded
      const authUser = await findUserById(db, userId)
      if (!authUser) {
         res.status(401).json({ message: "invalid user" })
         return
      }
      if (authUser.password !== password) {
         res.status(401).json({ message: "invalid user" })
         return
      }
      const contactEmail = req.params.contactEmail;
      if (typeof contactEmail === 'string') {
         const receiver = await findUserByEmail(db, contactEmail)
         if (!receiver) {
            res.status(404).json({ message: "receiver does not exist" })
            return
         }
         const messageData: MessageData = {
            senderId: authUser._id,
            receiverId: receiver._id,
            content: data.text
         }
         const message = await addMessage(db, messageData)
         const _message = {
            senderEmail: authUser.email,
            receiverEmail: receiver.email,
            _id: message._id,
            content: message.content,
            timeStamp: message.timestamp
         }
         res.status(201).json({ message: 'Message send successfully', data: _message })
      }

   } catch (err: any) {
      console.error("Error in POST:/api/v1/message route: ", err.message);
      res.status(500).json({ message: "Server error" });
   }
}
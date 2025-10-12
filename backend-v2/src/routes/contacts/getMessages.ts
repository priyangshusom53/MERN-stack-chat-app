import { findUserById, findUserByEmail } from "../../db/models/user.js"
import { findMessagesBetweenUsers } from '../../db/models/message.js'
import { db } from "../../index.js";

// types
import type { Request, Response, NextFunction } from "express";

//GET: /api/v1/contacts/:contactEmail/messages?limit=number
export const getMessages = async (req: Request, res: Response) => {
   console.log(`GET: /api/v1/contacts/:contactEmail/messages: route`)
   const authUser = req.authUser
   if (!authUser) return
   let limit = 0
   if (typeof req.query.limit === 'string') {
      limit = parseInt(req.query.limit)
   }
   try {
      const contactEmail = req.params.contactEmail
      if (!contactEmail) {
         console.log(`GET: /api/v1/contacts/:contactEmail/messages: contactEmail not provided`)
         res.status(400).json({ messages: 'contactEmail not provided' })
         return
      }
      const contactUser = await findUserByEmail(db, contactEmail)
      if (!contactUser) {
         console.log(`GET: /api/v1/contacts/:contactEmail/messages: contact not found`)
         res.status(400).json({ messages: 'contact not found' })
         return
      }
      const contact = authUser?.contacts.find((c) => {
         return c.contact.equals(contactUser?._id)
      })
      console.log(contact)
      if (contact) {
         const messages = await findMessagesBetweenUsers(db, authUser._id, contactUser._id, limit)
         if (messages) {
            const _messages = messages.map((message) => {
               const type = (message.senderId.toString() === authUser._id.toString()) ? 'sent' : 'received'

               const _message = {
                  _id: message._id, type: type, content: message.content, timestamp: message.timestamp
               }
               return _message
            })
            res.status(200).json({ message: "Messages fetched successfully", data: _messages })
         } else {
            console.log('GET: /api/v1/contacts/:contactEmail/messages: Messages not found')
            res.status(404).json({ message: "Messages not found", data: [] })
         }
      } else {
         console.log('GET: /api/v1/contacts/:contactEmail/messages: contact not found in users contacts')
         res.status(404).json({ messages: 'contact not found' })
      }
   } catch (err: any) {
      console.log("Error in message route: ", err.message);
      res.status(500).json({ message: "Server error" });
   }
}
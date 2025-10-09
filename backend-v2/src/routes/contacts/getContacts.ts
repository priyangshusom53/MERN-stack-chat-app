import { db } from "../../index.js"
import { findUserByEmail, getContacts as getContactList } from "../../db/models/user.js"

// types
import type { Request, Response, NextFunction } from "express";
import { timeStamp } from "console";

//GET: /api/v1/contacts
export const getContacts = async (req: Request, res: Response) => {
   try {
      const authUser = req.authUser
      if (!authUser) return

      const contacts = await getContactList(db, authUser._id)
      if (contacts) {
         if (!contacts.length) {
            res.status(200).json({ message: 'User has no contact', data: [] })
         }
         const _contacts = contacts.map((c: any) => {
            const _contact = {
               contactDetails: {
                  name: c.contact.name,
                  email: c.contact.email,
                  avatarUrl: c.contact.avatarUrl
               },
               chatDeleted: c.chatDeleted,
               messageCount: c.messageCount,
               currentMessageCount: c.currentMessageCount,
               lastMessage: {
                  type: (c.lastMessage.senderId === authUser._id) ? 'sent' : 'received',
                  _id: c.lastMessage._id,
                  content: c.lastMessage.content,
                  timeStamp: c.lastMessage.timeStamp
               }
            }
            return _contact
         })
         res.status(200).json({ message: "Contacts fetched successfully", data: _contacts })
         return
      }

   } catch (err: any) {
      console.log(`Error in getContacts route: `, err.message)
      res.status(500).json({ message: "Server error" });
   }
} 
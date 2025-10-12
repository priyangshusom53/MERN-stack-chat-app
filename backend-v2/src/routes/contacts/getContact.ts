import { db } from "../../index.js"
import { findUserByEmail, getContacts as getContactList } from "../../db/models/user.js"

// types
import type { Request, Response } from "express"


//GET: /api/v1/contacts/:contactEmail
export const getContact = async (req: Request, res: Response) => {
   try {
      const authUser = req.authUser
      if (!authUser) return

      const contactEmail = req.params.contactEmail
      if (!contactEmail) {
         console.log(`GET: /api/v1/contacts/contactEmail: contactEmail not provided`)
         res.status(400).json({ messages: 'contactEmail not provided' })
         return
      }
      const contactUser = await findUserByEmail(db, contactEmail)
      if (!contactUser) {
         console.log(`GET: /api/v1/contacts/contactEmail: contact not found`)
         res.status(404).json({ messages: 'contact not found' })
         return
      }
      const contacts = await getContactList(db, authUser._id)
      if (contacts) {
         if (!contacts.length) {
            res.status(400).json({ message: 'User has no contact', data: null })
            return;
         }
         const contact = contacts.find((c: any) => {
            return c.contact.email === contactUser.email
         })
         if (!contact) {
            res.status(400).json({ message: `User does not have contact with email: ${contactUser.email}` })
            return;
         }
         const _contact = {
            contactDetails: {
               name: contact.contact.name,
               email: contact.contact.email,
               avatarUrl: contact.contact.avatarUrl
            },
            chatDeleted: contact.chatDeleted,
            messageCount: contact.messageCount,
            currentMessageCount: contact.currentMessageCount,
            lastMessage: (contact.chatDeleted && !contact.currentMessageCount) ? null : {
               type: (contact.lastMessage.senderId === authUser._id) ? 'sent' : 'received',
               _id: contact.lastMessage._id,
               content: contact.lastMessage.content,
               timeStamp: contact.lastMessage.timeStamp
            }
         }

         res.status(200).json({ message: "Contact fetched successfully", data: _contact })
         return
      } else {
         console.log('GET: /api/v1/contacts/contactEmail: contact not found')
         res.status(400).json({ message: `User does not have contact with email: ${contactUser.email}` })
      }
   } catch (err: any) {
      console.log(`Error in getContact route: `, err.message)
      res.status(500).json({ message: "Server error" });
   }
}
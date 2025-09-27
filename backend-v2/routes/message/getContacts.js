import { db } from "../../index.js"
import { findUserByEmail, getContacts as getContactList } from "../../db/models/user.js"

export const getContacts = async (req, res) => {
   const email = req.params.id
   try {
      if (!email) {
         res.status(400).json({ message: "Insufficient information" })
         return
      }
      const user = await findUserByEmail(db, email)
      const contacts = await getContactList(db, user._id)
      const _contacts = contacts.map((contact) => {
         return {
            name: contact.name,
            email: contact.email
         }
      })
      res.status(200).json({ message: "Messages fetched successfully", data: _contacts })
   } catch (err) {
      console.log(`Error in getContacts route: `, err.message)
      res.status(500).json({ message: "Server error" });
   }
} 
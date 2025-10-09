import { db } from "../../index.js"
import { findUserByEmail } from "../../db/models/user.js"

export const getUser = async (req, res) => {
   const userEmail = req.params.id
   try {
      const user = await findUserByEmail(db, userEmail)
      if (user) {
         res.status(200).json({ name: user.name, email: user.email })
         return
      }
      res.status(400).json({ message: 'user does not exist' })
      return
   } catch (err) {
      console.log(`Error in getUser route: `, err.message)
      res.status(500).json({ message: 'server error' })
   }

}
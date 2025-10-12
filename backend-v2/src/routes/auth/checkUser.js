import { findUserById } from '../../db/models/user.js';
import * as jwt from '../../utils/jwt.js';
import { db } from '../../index.js';


export const checkUser = async (req, res) => {
   const sessionId = req.cookies.sessionId
   console.log('route /api/v1/auth/check-user: ', sessionId)
   try {
      if (!sessionId) {
         console.log('route /api/v1/auth/check-user: No sessionId provided')
         res.status(401).json({ message: 'unauthorized user' })
      }
      const decoded = jwt.verifyToken(sessionId)
      if (decoded !== null) {
         const { userId, password } = decoded
         const user = await findUserById(db, userId)
         if (!user) {
            console.log('route /api/v1/auth/check-user: User not found')
            res.status(404).json({ message: 'user not found' })
            return
         }
         if (password === user.password) {
            console.log('route /api/v1/auth/check-user: user verified successfully')
            res.status(200).json({ message: 'user verified successfully', data: user })
            return
         } else {
            console.log('route /api/v1/auth/check-user: incorrect user info')
            res.status(401).json({ message: 'unauthorized user' })
            return
         }
      }
      else {
         console.log(`route /api/v1/auth/check-user: Invalid sessionId`)
         res.status(401).json({ message: 'unauthorized user' })
         return
      }

   } catch (err) {
      console.error(`Error in route/api/v1/auth/check-user: ${err.message}`)
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "unauthorized user" }));
      return
   }
}
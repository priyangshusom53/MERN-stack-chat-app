import { findUserById } from '../db/models/user.js';
import * as jwt from '../utils/jwt.js';
import { db } from '../index.js';

export const verifyUser = async (req, res, next) => {
   // const cookieHeader = req.headers['cookie'];
   // let cookies = {};
   // if (cookieHeader) {
   //    cookies = Object.fromEntries(
   //       cookieHeader.split(';').map(c => {
   //          const [key, value] = c.trim().split('=');
   //          return [key, decodeURIComponent(value)];
   //       })
   //    );
   // }
   const sessionId = req.cookies.sessionId
   console.log(sessionId)
   try {
      if (!sessionId) throw new Error("No sessionId porvided");
      const decoded = jwt.verifyToken(sessionId);

      if (decoded !== null) {
         const user = await findUserById(db, decoded.userId)
         req.user = { email: user.email, name: user.name }
         console.log(`auth/check-user route: verification successful`)
         next();
      }
      else {
         console.log(`auth/check-user route: verification failed`)
         throw new Error("Invalid sessionId");
      }

   } catch (err) {
      console.log(`Error in verifyUser middleware: ${err.message}`)
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid or expired token" }));
   }
}
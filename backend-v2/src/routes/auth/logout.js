import { findUserById } from "../../db/models/user.js"
import { db } from "../../index.js"
import * as jwt from '../../utils/jwt.js'

export const logout = async (req, res) => {
   const cookieHeader = req.headers['cookie'];
   let cookies = {};
   if (cookieHeader) {
      cookies = Object.fromEntries(
         cookieHeader.split(';').map(c => {
            const [key, value] = c.trim().split('=');
            return [key, decodeURIComponent(value)];
         })
      );
   }

   try {
      if (!cookies.sessionId) throw new Error("No sessionId porvided");
      const token = cookies.sessionId;
      const decoded = jwt.verifyToken(token);
      if (decoded !== null) {
         const user = await findUserById(db, decoded.userId)
         res.status(200);
         res.cookie('sessionId', "", {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 0
         })
         res.end(JSON.stringify({ message: "Logout successful" }));
      }
      else {
         throw new Error("Invalid sessionId");
      }

   } catch (err) {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid or expired token" }));
   }
}
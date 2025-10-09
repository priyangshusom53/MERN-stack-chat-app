import { findUserByEmail, findUserById } from "../../db/models/user.js"
import { db } from '../../index.js';
import * as jwt from '../../utils/jwt.js';


export const login = async (req, res) => {

   const data = req.body;
   try {
      if (!data.email || !data.password) {
         res.status(400).json({ message: "Insufficient credentials" })
         return;
      }
      const email = data.email;
      const user = await findUserByEmail(db, email);
      if (!user) {
         res.status(401).json({ message: 'invalid credentials' })
         return;
      }
      if (user.password !== data.password) {
         res.status(401).json({ message: 'invalid credentials' })
         return;
      }
      else {
         const token = jwt.generateToken({ userId: user._id }, '1d');
         res.cookie('sessionId', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
         });
         res.status(200).json({ message: "Login successful" });
      }

   } catch (err) {
      console.log("Error in login route: ", err.message);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Server error" }));
   }
}
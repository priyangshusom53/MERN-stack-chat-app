import { addUser } from '../../db/models/user.js'
import { db } from '../../index.js';
import * as jwt from '../../utils/jwt.js';

export const signup = async (req, res) => {
   const data = req.body;
   const userData = {
      email: data.email,
      password: data.password,
      name: data.name,
      avatarUrl: data.avatarUrl ?? ''
   }
   try {
      const user = await addUser(db, userData);
      const token = jwt.generateToken({ userId: user._id }, '1d');
      res.cookie('sessionId', token, {
         httpOnly: true,
         secure: false,
         sameSite: 'strict',
         maxAge: 24 * 60 * 60 * 1000
      });
      res.status(201).json({ message: 'User created successfully' });
   } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: 'Signup failed' });
   }


}

export const signupDemo = async (req, res) => {
   try {
      await new Promise((resolve, reject) => {
         setTimeout(() => { resolve("Request success") }, 2000)
      })
      res.cookie('demo-cookie', "demo-cookie-123", {
         httpOnly: true,
         secure: false,
         sameSite: 'strict',
         maxAge: 24 * 60 * 60 * 1000
      });
      res.status(201).json({ message: 'success' })
   } catch (err) {
      res.status(500).json({ message: 'Signup demo failed' })
   }
}
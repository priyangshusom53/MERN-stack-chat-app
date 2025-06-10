import { Router } from 'express';
import User from '../models/userModel.js';
import { generateToken } from '../lib/utils.js';
import { protectRoute } from '../middlewares/authMiddleware.js';

const authRoutes = Router();

authRoutes.post('/signup', async (req, res) => {
   console.log(req.body);
   const { name, email, password } = req.body;
   try {
      if (!name || !email || !password) {
         return res.status(400).json({ message: 'Name, email and password are required' });
      } else if (password.length < 6) {
         return res.status(400).json({ message: 'Password must be at least 6 characters long' });
      }
      const user = await User.findOne({ email: email });
      if (user) {
         return res.status(400).json({ message: 'User already exists' });
      }
      const newUser = await User.create({
         name: name,
         email: email,
         password: password,
      });
      if (newUser) {
         const token = generateToken(newUser._id, res);
         res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
         })
      } else {
         return res.status(400).json({ message: 'Invalid user data' });
      }

   } catch (err) {
      console.log('error in signup route')
      console.log(err);
      res.status(500).json({ message: 'internal server error' });
   }

})

authRoutes.get('/check', protectRoute, (req, res) => {
   try {
      const user = req.user;
      res.status(200).json(user)
   } catch (err) {
      console.log('error in check route')
      console.log(err);
      res.status(500).json({ message: 'internal server error' });
   }
})

authRoutes.post('/login', async (req, res) => {
   const { email, password } = req.body
   try {
      const user = await User.findOne({ email: email });
      if (!user) {
         return res.status(400).json({ message: 'User or password is not correct' });
      } else if (user.password !== password) {
         return res.status(400).json({ message: 'User or password is not correct' });
      }
      const token = generateToken(user._id, res);
      res.status(200).json({
         _id: user._id,
         name: user.name,
         email: user.email
      });
   } catch (err) {
      console.log('error in login route')
      console.log(err);
      res.status(500).json({ message: 'internal server error' });
   }

})

authRoutes.post('/logout', (req, res) => {
   try {
      res.cookie('jwt', '', { maxAge: 0 });
      res.status(200).json({ message: 'User logged out successfully' })
   } catch (err) {
      console.log('error in logout route')
      console.log(err);
      res.status(500).json({ message: 'internal server error' });
   }
})

export default authRoutes;
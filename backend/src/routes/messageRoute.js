import { Router } from 'express';
import { protectRoute } from '../middlewares/authMiddleware.js';
import User from '../models/userModel.js';
import Message from '../models/messageModel.js';

import { io, getReceiverSocketID } from '../lib/socket.js'

const messageRoutes = Router();

messageRoutes.post('/addContact', protectRoute, async (req, res) => {
   const loggedInUserId = req.user._id
   const { email } = req.body
   try {
      const user = await User.findOne({ email: email })
      if (!user) {
         return res.status(404).json({ message: 'user not found' })
      }
      if (user._id.toString() === loggedInUserId.toString()) {
         return res.status(400).json({ message: 'you cannot add yourself as a contact' })
      }
      const result = await User.updateOne(
         {
            _id: loggedInUserId,
            contactList: { $ne: user._id }
         },
         { $addToSet: { contactList: user._id } },
         { runValidators: true }
      )

      console.log(result)
      if (result.matchedCount === 0) {

         return res.status(400).json({ message: "contact already exists" })

      }
      await User.updateOne({
         _id: user._id,
         contactList: { $ne: loggedInUserId }
      },
         { $addToSet: { contactList: loggedInUserId } },
         { runValidators: true }
      )
      const updatedUser = await User.findById(loggedInUserId).select('-password')
      res.status(200).json(updatedUser)
   } catch (err) {
      console.log('error in addContact route')
      console.log(err.message);
      res.status(500).json({ message: 'internal server error' });
   }
})

messageRoutes.get('/contacts', protectRoute, async (req, res) => {
   const loggedInUserId = req.user._id
   try {
      const user = await User.findById(loggedInUserId)
         .select('-password')
         .populate('contactList', 'name email');

      res.status(200).json({ contacts: user.contactList });
   } catch (err) {
      console.log('error in getContacts route')
      console.log(err.message);
      res.status(500).json({ message: 'internal server error' });
   }

})

messageRoutes.get('/:id', protectRoute, async (req, res) => {
   try {
      const { id: userToChatId } = req.params
      const myId = req.user._id
      const messages = await Message.find({
         $or: [
            { senderId: myId, receiverId: userToChatId },
            { senderId: userToChatId, receiverId: myId }
         ]
      })
      res.status(200).json({ messages: messages })
   } catch (err) {
      console.log('error in getMessages route')
      console.log(err.message);
      res.status(500).json({ message: 'internal server error' });
   }
})

messageRoutes.post('/send/:id', protectRoute, async (req, res) => {
   try {
      const { text } = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user._id;
      const newMessage = new Message({
         senderId: senderId,
         receiverId: receiverId,
         text: text,
      });

      const receiverSocketId = getReceiverSocketID(receiverId)
      if (receiverSocketId) {
         io.to(receiverSocketId).emit('newMessage', newMessage)
         console.log("emitted new message")
      }
      await newMessage.save();
      res.status(201).json(newMessage)
   } catch (err) {
      console.log('error in sendMessage route')
      console.log(err.message);
      res.status(500).json({ message: 'internal server error' });
   }
})

export default messageRoutes;
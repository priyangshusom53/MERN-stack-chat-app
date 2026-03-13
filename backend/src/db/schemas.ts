import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
{
   name: {
      type: String,
      required: true
   },

   email: {
      type: String,
      required: true,
      unique: true
   },

   password: {
      type: String,
      required: true
   },

   profilePicUrl: {
      type: String,
      default: null
   },

   about: {
      type: String,
      default: ""
   },

   chats: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat"
   }],

   createdAt: {
      type: Date,
      default: Date.now
   }
})

export const messageSchema = new mongoose.Schema({

   chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true
   },

   senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
   },

   text: {
      type: String,
      required: true
   },

   timestamp: {
      type: Date,
      default: Date.now
   }
})

export const chatSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },

   isGroupChat: {
      type: Boolean,
      default: false
   },

   participants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   }],
   },
   {
      timestamps: true
   }
)
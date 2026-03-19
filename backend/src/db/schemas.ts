import mongoose from "mongoose";


export type Doc = Record<string,any>
export type WithId<T> = T & {
  _id: mongoose.Types.ObjectId
}

export interface IUserSchema{
   name:string;
   email:string;
   password:string;
   profilePicUrl:string | null;
   about:string | "" | null;
   chats:mongoose.Types.ObjectId[] | null;
   createdAt:Date;
   updatedAt:Date;
}

export const userSchema = new mongoose.Schema<IUserSchema>(
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
      }]
   },
   {
      timestamps:true
   }
)


export interface IMessageSchema{
   chatId:mongoose.Types.ObjectId;
   senderId:mongoose.Types.ObjectId;
   text:string;
   image:string | null;
   createdAt:Date;
   isDeleted:boolean;
}

export const messageSchema = new mongoose.Schema<IMessageSchema>({

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

   image: {
      type:String
   },

   isDeleted:{
      type:Boolean,
      default:false
   }
},{ timestamps:true })


export interface IChatSchema{
   name:string;
   isGroupChat:boolean;
   participants:mongoose.Types.ObjectId[];
   groupIcon:string | null;
   createdBy:mongoose.Types.ObjectId | null;
   inviteToken:string | null;
   lastMessage:mongoose.Types.ObjectId | null;
   createdAt:Date;
   updatedAt:Date;
}

export const chatSchema = new mongoose.Schema<IChatSchema>(
{

   
   name: {
      type: String,
      default: ""
   },

   isGroupChat: {
      type: Boolean,
      default: false
   },

   participants: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true
      }
   ],

   groupIcon:{
      type:String,
      default:null
   },

   createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   },

   inviteToken: {
      type: String,
   },

   lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null
   }

},{ timestamps:true })

const UserModel = mongoose.model('User',userSchema,'users')
const MessageModel = mongoose.model('Message',messageSchema,'messages')
const ChatModel = mongoose.model('Chat',chatSchema,'chats')
export { UserModel, MessageModel, ChatModel }

chatSchema.index({ participants: 1 })
chatSchema.index({ updatedAt: -1 })
chatSchema.index({ inviteToken: 1 })
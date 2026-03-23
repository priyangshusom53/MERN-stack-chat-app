import { MongoNoSQLDB } from "./db/db.js"
import {UserRepo} from "./db/repos/userRepo.js"
import { JwtEncryptionService } from "./features/encryption/jwt.js"
import express from 'express'
import mongoose from "mongoose"
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path'

import { userSchema, chatSchema, messageSchema } from "./db/schemas.js"

import { SignupAction, SignupWebController } from "./features/auth/signup.js"
import { LoginAction, LoginWebController } from "./features/auth/login.js"
import { AuthUserAction, AuthUserWebController } from "./features/auth/authUser.js"

dotenv.config();
//const PORT = 5001;

const __dirname = path.resolve()

const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
   origin: 'http://localhost:5173',
   credentials: true,
}));


const dburi = process.env.MONGO_URI
if(!dburi) throw new Error("No Mongodb url found in .env")
await mongoose.connect(dburi);
console.log('MongoDB connected at ', process.env.MONGO_URI);

const dbName = "mern-chat-app"
const connection:mongoose.Connection = mongoose.connection.useDb(dbName, { useCache: true });
if(!connection) throw new Error("Mongodb not connected")

const modelNames = {
   userModel:"User",
   messageModel:"Message",
   chatModel:"Chat"
}

const collectionNames = {
   userModel:"users",
   messageModel:"messages",
   chatModel:"chats"
}

// schema map
// collectionName : { modelName, mongoose.schema }
const schemaMap = new Map<string, { modelName:string, schema:mongoose.Schema}>([
   [collectionNames.userModel, {modelName:modelNames.userModel, schema:userSchema}],
   [collectionNames.messageModel, {modelName:modelNames.messageModel, schema:messageSchema}],
   [collectionNames.chatModel, {modelName:modelNames.chatModel, schema:chatSchema}]
])

const db = new MongoNoSQLDB()
// Create repos in infra layer for data access
const UserModel = connection.model(modelNames.userModel, userSchema, collectionNames.userModel)

const MessageModel = connection.model(modelNames.messageModel, messageSchema, collectionNames.messageModel)

const ChatModel = connection.model(modelNames.chatModel, chatSchema, collectionNames.chatModel)

const userRepo = new UserRepo(db, UserModel)
const messageRepo = new MessageRepo(db, MessageModel)
const chatRepo = new ChatRepo(
   db, 
   ChatModel
)

// const encryptionService = new JwtEncryptionService()
if(!process.env.JWT_SECRET){
   throw new Error("Jwt secret not found in env")
}
const tokenService = new JWTTokenService(process.env.JWT_SECRET)

// create actions 
const signupAction = new SignupAction(
   userRepo,
   tokenService
)

const loginAction = new LoginAction(
   userRepo,
   tokenService
)

const meAction = new AuthUserAction(userRepo)

const createChatAction = new CreateChatAction(chatRepo, userRepo)

const getChatsAction = new GetChatsAction(chatRepo)


// create controllers
const signupController = new SignupWebController(signupAction)

const loginController = new LoginWebController(loginAction)

const authUserController = new AuthUserWebController(meAction)

const createChatController = new CreateChatWebController(createChatAction)

const getChatsController = new GetChatsWebController(getChatsAction)


// create middlewares
import { AuthMiddleware } from "./middlewares/authMiddleware.js"

const authMiddleware = new AuthMiddleware(
   tokenService,
   userRepo
)

// Bind routes to express routers
import { Router } from "express"
import { addAuthUserRoute, addLoginRoute, addSignupRoute } from "./routes/authRoutes.js"
import { MessageRepo } from "./db/repos/messageRepo.js"
import { ChatRepo } from "./db/repos/chatRepo.js"
import { addCreateChatRoute, addGetChatsRoute } from "./routes/chatRoutes.js"
import { CreateChatAction, CreateChatWebController } from "./features/chat/createChat.js"
import { GetChatsAction, GetChatsWebController } from "./features/chat/getChats.js"
import { JWTTokenService } from "./features/tokenService/jwt.js"
const authRouter = Router()
addSignupRoute(authRouter,"/signup",signupController)
addLoginRoute(authRouter, "/login", loginController)
addAuthUserRoute(authRouter, "/me", authUserController, authMiddleware)
app.use("/auth", authRouter)


const chatRouter = Router()
addCreateChatRoute(chatRouter, "/new",createChatController, authMiddleware)
addGetChatsRoute(chatRouter, "/",getChatsController,authMiddleware)
app.use("/chat", chatRouter)

// run express server
const PORT = process.env.PORT || 5001
app.listen(PORT, ()=>{
   console.log(`Server running on port ${PORT}`)
})
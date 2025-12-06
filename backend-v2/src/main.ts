
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import type { Request, Response } from 'express';
// import { createServer } from 'node:http'
// import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import { UserSchema } from './db/_models/user.js';
import { MongoDatabase } from './db/repos/dbInterface.js';
import { UserRepo } from './db/repos/userRepo.js';
import { GetUserDetailsAction, GetUserDetailsWebController } from './features/getUserDetails/getUserDetails.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const app = express();
app.use(express.json());

const connectionAddress = process.env.MONGODB_CONNECTION_STRING;
if (connectionAddress) {
   await mongoose.connect(connectionAddress);
   console.log(`Connected to MongoDB: ${connectionAddress}`);
}
let connection = mongoose.connection.useDb("chat-app", { useCache: true });
connection = connection.useDb("chat-app");
const userModel = connection.model("User", UserSchema, "Users");

const mongoDocumentDb = new MongoDatabase(userModel);
const userRepo = new UserRepo(mongoDocumentDb);

app.get('/users/:email', async (req: Request, res: Response) => {
   const userEmail = req.params.email as string
   const getUserDetailsAction = new GetUserDetailsAction(userRepo)

   const getUserDetailsWebController = new GetUserDetailsWebController(getUserDetailsAction)

   await getUserDetailsWebController.GetUserDetails({ email: userEmail }, res)
})

app.listen(8000, () => {
   console.log('Server is running on http://localhost:8000');
})


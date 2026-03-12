
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
import { JWTEncryption } from './encryption/jwt.js'
import { GetUserDetailsAction, GetUserDetailsWebController } from './features/getUserDetails/getUserDetails.js';
import { MongoNoSQLDB } from './db/db.js';
import { SignupAction, SignupWebController } from './features/authentication/signup.js';
import { LoginAction, LoginWebController } from './features/authentication/login.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const app = express();
app.use(express.json());

// Database setup
const connectionAddress = process.env.MONGODB_CONNECTION_STRING;
const dbName = process.env.MONGODB_DATABASE;

if (connectionAddress) {
   await mongoose.connect(connectionAddress);
   console.log(`Connected to MongoDB: ${connectionAddress}`);
}
let connection: mongoose.Connection | null = null;
if(dbName){
   connection = mongoose.connection.useDb(dbName, { useCache: true });
}

if(!connection){
   throw new Error("Failed to connect to the database. Please check your connection string and database name.");
}

const schemaMap = new Map<string, { modelName: string, schema: mongoose.Schema}>();

// User collection setup
const userModelName = "User"
let userCollectionName = "Users"
const userModel = connection.model(userModelName, UserSchema, userCollectionName);

schemaMap.set(userCollectionName, { modelName: userModelName, schema: UserSchema })
const mongoDatabase = new MongoNoSQLDB(connection, schemaMap);
const userRepo = new UserRepo(mongoDatabase, userCollectionName);
const encryptionService = new JWTEncryption()


// Message collection setup


// routes setup
const authRouter = express.Router();
authRouter.post('/signup', async (req: Request, res: Response) => {
   // const { name, email, password } = req.body;
   const signupAction = new SignupAction(userRepo, encryptionService)
   const signupController = new SignupWebController<Request,Response>(signupAction)
   await signupController.Signup(req, res)
});

authRouter.post('/login', async(req, res)=>{
   const loginAction = new LoginAction(userRepo, encryptionService)
   const loginController = new LoginWebController<Request, Response>(loginAction)
   await loginController.Login(req, res)
})
app.use('/auth', authRouter);

app.listen(8000, () => {
   console.log('Server is running on http://localhost:8000');
})


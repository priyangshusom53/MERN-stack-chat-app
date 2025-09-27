import express from 'express';
import dotenv from 'dotenv';


dotenv.config();
const app = express();

import cookieParser from 'cookie-parser';
// Middleware setup
app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {
   res.send('<h1>Hello from Backend V2</h1>');
});

// Database setup
import { DB } from './db/db.js';
const connectionAddress = process.env.MONGODB_CONNECTION_STRING;
if (!connectionAddress) throw new Error("No connection string found in .env file");
export const db = new DB(connectionAddress, "chat-app")
await db.connect()


// Database config
await db.useDB()
import { setModel as setUserModel } from './db/models/user.js';
setUserModel(db)
import { setModel as setMessageModel } from './db/models/message.js';
setMessageModel(db)


import { addUser, findUserByEmail } from './db/models/user.js';
const userData = {
   email: "example@email.com",
   password: "examplePassword",
   name: "Example Name",
   avatarUrl: "http://example.com/avatar.png",
   contacts: []
}
const res = await addUser(db, userData);
console.log(res);
const user = await findUserByEmail(db, userData.email)
console.log(user);

// Routes setup
import { authRouter } from './routes/auth/authRoute.js';
app.use('/auth', authRouter);
import { messageRouter } from './routes/message/messageRoute.js';
app.use('/message', messageRouter);


app.listen(8000, () => {
   console.log('Server is running on http://localhost:8000');
})
import express from 'express';
import dotenv from 'dotenv';


dotenv.config();
const app = express();

// Middleware setup
app.use(express.json());


app.get('/', (req, res) => {
   res.send('<h1>Hello from Backend V2</h1>');
});

// Database setup
import { DBConn } from './db/db.js';
const connectionAddress = process.env.MONGODB_CONNECTION_STRING;
if (!connectionAddress) throw new Error("No connection string found in .env file");
export const dbConnection = new DBConn(connectionAddress);
await dbConnection.connect();
console.log("DB connection status:", dbConnection.isConnected);

// Database config
import { dbExists, createDatabase, useDatabase } from './db/dbconfig.js';
const exists = await dbExists("chat-app");
if (!exists) {
   await createDatabase("chat-app");
}
const chatAppDB = await useDatabase("chat-app");


import { setUserCollection, addUser, findUserByEmail } from './db/models/user.js';
await setUserCollection(dbConnection, chatAppDB);
import { setMessageCollection } from './db/models/message.js';
await setMessageCollection(dbConnection, chatAppDB);

const userData = {
   email: "example@email.com",
   password: "examplePassword",
   name: "Example Name",
   avatarUrl: "http://example.com/avatar.png",
   contacts: []
}
const res = await addUser(dbConnection, userData);
console.log(res);
const user = await findUserByEmail(dbConnection, userData.email)
console.log(user);

// Routes setup
import { authRouter } from './routes/auth/authRoute.js';
app.use('/auth', authRouter);
import { messageRouter } from './routes/message/messageRoute.js';
app.use('/message', messageRouter);


app.listen(8000, () => {
   console.log('Server is running on http://localhost:8000');
})
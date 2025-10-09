import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'node:http'
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const app = express();


// Middleware setup
import cors from 'cors'

const corsOptions = {
   origin: 'http://192.168.0.103:3000', // Replace with your client's origin
   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
   credentials: true
};
app.use(cors(corsOptions))
app.use(express.json());
import cookieParser from 'cookie-parser';
app.use(cookieParser());


// socket.io and http server
const server = createServer(app)
const io = new Server(server, { cors: corsOptions })

// Socket io setup
const onlineUsers = new Map();

// handlers
import { getMessageHandler } from './socket/eventHandlers/messageHandler.js';
io.on('connection', (socket) => {
   const email = socket.handshake.auth.email;
   if (email) {
      // A user may have multiple tabs, so store all socket ids
      if (!onlineUsers.has(email)) {
         onlineUsers.set(email, []);
      }
      onlineUsers.get(email).push(socket.id);
   }

   console.log(`${email} connected with socket ${socket.id}`);

   socket.on("disconnect", () => {
      if (email && onlineUsers.has(email)) {
         onlineUsers.set(
            email,
            onlineUsers.get(email).filter(id => id !== socket.id)
         );
         if (onlineUsers.get(email).length === 0) {
            onlineUsers.delete(email);
         }
      }
      console.log(`${email} disconnected with socket: ${socket.id}`);
   });

   // message handler
   const messageHandler = getMessageHandler(socket, io, onlineUsers)
   socket.on("message", messageHandler);
})



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
app.use('/api/v1/auth', authRouter);
import { messageRouter } from './routes/contacts/messageRoute.js';
app.use('/api/v1/contacts', messageRouter);


server.listen(8000, () => {
   console.log('Server is running on http://localhost:8000');
})
import express from 'express';
import cookieParser from 'cookie-parser';
import http from 'http';
import authRoutes from './routes/authRoute.js';
import messageRoutes from './routes/messageRoute.js';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import { server, io, app } from './lib/socket.js'
import cors from 'cors';
import path from 'path'

dotenv.config();
//const PORT = 5001;

const __dirname = path.resolve()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
   origin: 'http://localhost:5173',
   credentials: true,
}));
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes)

if (process.env.NODE_ENV === 'production') {
   app.use(express.static(path.join(__dirname, "../frontend/dist")))

   app.get('/{*route}', (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
   })
}

server.listen(process.env.PORT, () => {
   console.log(`Server is running on port ${process.env.PORT}`);
   connectDB();
});

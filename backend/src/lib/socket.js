import { Server } from "socket.io"
import http from 'http'
import express from 'express'

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
   cors: {
      origin: ["http://localhost:5173"]
   }
})

export function getReceiverSocketID(userId) {
   return userSocketMap[userId]
}

const userSocketMap = {}

io.on('connection', (socket) => {
   console.log("user connected: ", socket.id)

   const userId = socket.handshake.query.userId
   if (userId) userSocketMap[userId] = socket.id
   console.log(userSocketMap)

   socket.on('disconnect', () => {
      console.log("user disconnected: ", socket.id)
      delete userSocketMap[userId]
   })
})

export { io, app, server }
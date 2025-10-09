
export const getMessageHandler = (socket, io, onlineUsers) => {
   const messageHandler = (text, to) => {
      const from = socket.handshake.auth.email;

      console.log(`Message from ${from} to ${to}: ${text}`);

      // Send back to sender (chat echo)
      io.to(socket.id).emit("message", text, from, to);

      // Send to receiver if online
      if (onlineUsers.has(to)) {
         for (const socketId of onlineUsers.get(to)) {
            io.to(socketId).emit("message", text, from, to);
         }
      }
   }
   return messageHandler
}
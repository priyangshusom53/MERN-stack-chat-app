

export const getMessageHandler = (socket, io, onlineUsers) => {
   const messageHandler = (message) => {
      const from = socket.handshake.auth.email;

      console.log(`Message from ${from} to ${message.receiverEmail}: ${message.content}`);

      // Send back to sender (chat echo)
      io.to(socket.id).emit("message", message);

      // Send to receiver if online
      if (onlineUsers.has(message.receiverEmail)) {
         for (const socketId of onlineUsers.get(message.receiverEmail)) {
            io.to(socketId).emit("message", message);
         }
      }
   }
   return messageHandler
}
// server/socket.js
const socketIo = require('socket.io');

const setupChat = (server) => {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('sendMessage', (message) => {
      io.emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

module.exports = setupChat;

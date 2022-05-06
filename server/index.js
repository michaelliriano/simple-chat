require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(express());
require('./db');
const {
  joinRoom,
  sendMessage,
  leave,
  disconnect,
  userStopTyping,
  userTyping,
} = require('./socket');

const PORT = process.env.PORT || 2000;

app.use(cors());

var server = app.listen(
  PORT,
  console.log(`Server is running on the port no: ${PORT} `),
);

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

const rooms = {
  // ['_room_name_goes_here_]: {
  //   users: [
  //     {
  //      id: 'random-socket-id',
  //      username: 'test_user',
  //     }
  //   ],
  //   typing: ['username'],
  //   messages: [
  //     {
  //       id: 'random-message-id',
  //       messageId: nanoid(10),
  //       message: 'hello world',
  //       date: new Date(),
  //     },
  //   ],
  // },
};

io.on('connection', (socket) => {
  socket.emit('connected', { id: socket.id });
  socket.on('join room', (payload) => joinRoom(socket, io, rooms, payload));
  socket.on('send message', (payload) => sendMessage(io, rooms, payload));
  socket.on('user typing', (payload) => userTyping(socket, io, rooms, payload));
  socket.on('user stop typing', (payload) =>
    userStopTyping(socket, io, rooms, payload),
  );
  socket.on('leave', (payload) => leave(socket, io, rooms, payload));
  socket.on('disconnect', () => disconnect(socket, io, rooms));
});

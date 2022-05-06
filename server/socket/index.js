const { nanoid } = require('nanoid');
const {
  roomExists,
  userExists,
  userIndex,
  removeUser,
  sendMessageToRoom,
  createRoom,
  addUserToRoom,
  findUser,
} = require('../util/socket');

// Creates room if it doesn't exist
// Joins users to that room once created
const joinRoom = (socket, io, rooms, payload) => {
  socket.userId = payload.id;
  socket.currRoom = payload.room; // persist socket id state after refresh

  const user = findUser(rooms, socket.currRoom, payload.username);
  if (!!user) {
    return socket.emit('error', {
      message:
        'Username already taken. If this is your account please use the other open window.',
    });
  }
  const doesRoomExist = roomExists(rooms, payload.room);
  socket.join(payload.room);
  if (doesRoomExist) {
    addUserToRoom(rooms, payload.room, payload);
  } else {
    createRoom(rooms, payload.room, payload);
  }
  io.to(payload.room).emit('user joined', rooms[payload.room]);
};

// Sends message to users in a room
const sendMessage = (io, rooms, payload) => {
  sendMessageToRoom(rooms, payload.room, payload);
  io.to(payload.room).emit('on message', rooms[payload.room].messages);
};

// leave app emitter
const leave = (socket, io, rooms, payload) => {
  socket.leave(payload.room);
  const index = userIndex(rooms, socket.currRoom, socket.userId);
  removeUser(rooms, socket.currRoom, index);
  io.to(payload.room).emit('user left', rooms[payload.room]);
};

// handle socket disconnect
const disconnect = (socket, io, rooms) => {
  const index = userIndex(rooms, socket.currRoom, socket.userId);
  if (socket.currRoom && index >= 0) {
    removeUser(rooms, socket.currRoom, index);
    io.to(socket.currRoom).emit('user left', rooms[socket.currRoom]);
  }
};

const userTyping = (socket, io, rooms, payload) => {
  if (rooms[socket.currRoom].typing.includes(payload.username)) return;
  rooms[socket.currRoom].typing.push(payload.username);
  io.to(socket.currRoom).emit('users typing', rooms[socket.currRoom].typing);
};

const userStopTyping = (socket, io, rooms, payload) => {
  const index = rooms[socket.currRoom]?.typing.indexOf(payload.username);
  rooms[socket.currRoom]?.typing.splice(index, 1);
  io.to(socket.currRoom).emit('users typing', rooms[socket.currRoom].typing);
};

module.exports = {
  joinRoom,
  sendMessage,
  leave,
  disconnect,
  userTyping,
  userStopTyping,
};

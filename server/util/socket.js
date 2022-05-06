const { nanoid } = require('nanoid');

const userIndex = (rooms, room, userId) => {
  return rooms[room]?.users.findIndex((u) => u.id === userId);
};

const findUser = (rooms, roomId, username) => {
  let isFound = false;
  Object.keys(rooms).forEach((room) => {
    if (rooms[room]?.users.find((u) => u.username === username)) {
      isFound = rooms[room]?.users.find((u) => u.username === username);
    }
  });
  return isFound;
};

const roomExists = (rooms, room) => Object.keys(rooms).includes(room);

const removeUser = (rooms, room, index) => {
  rooms[room]?.users.splice(index, 1);
};

const getUserData = (rooms, room, userId) => {
  return findUser(rooms, room, userId);
};

const addUserToRoom = (rooms, room, payload) => {
  rooms[room].users.push({
    id: payload.id,
    username: payload.username,
  });
};

const createRoom = (rooms, room, user) => {
  rooms[room] = {
    users: [],
    messages: [],
    typing: [],
  };
  if (Object.keys(user).length) {
    rooms[room].users.push(user);
  }
};

const sendMessageToRoom = (rooms, room, payload) => {
  rooms[room].messages.push({ ...payload, messageId: nanoid(10) });
};

module.exports = {
  roomExists,
  userIndex,
  removeUser,
  getUserData,
  addUserToRoom,
  createRoom,
  sendMessageToRoom,
  findUser,
};

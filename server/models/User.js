const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  socketId: {
    type: String,
    required: true,
  },
  rooms: {
    type: Array,
  },
  friends: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

const User = mongoose.model('User', schema);

module.exports = User;

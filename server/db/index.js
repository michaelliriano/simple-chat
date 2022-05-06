const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/chat_app_react').then(() => {
  console.log('MongoDB running');
});

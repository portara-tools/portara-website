const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

export const User = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

mongoose.model('User', UserSchema);

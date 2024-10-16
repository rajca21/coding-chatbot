import mongoose from 'mongoose';
import { ChatSchema } from './Chat.model.js';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  chats: [ChatSchema],
});

const User = mongoose.model('User', UserSchema);
export default User;

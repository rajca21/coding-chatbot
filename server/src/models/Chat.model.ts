import { randomUUID } from 'crypto';
import mongoose from 'mongoose';

export const ChatSchema = new mongoose.Schema({
  id: {
    type: String,
    default: randomUUID(),
  },
  role: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
});

const Chat = mongoose.model('Chat', ChatSchema);
export default Chat;

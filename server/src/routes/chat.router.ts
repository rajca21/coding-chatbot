import { Router } from 'express';
import * as chatController from '../controllers/chat.controller.js';
import { verifyToken } from '../utils/tokenManager.js';
import { chatCompletionValidator, validate } from '../utils/validators.js';

const chatRouter = Router();

// POST Endpoints
chatRouter.post(
  '/',
  validate(chatCompletionValidator),
  verifyToken,
  chatController.generateChatCompletion
);

// GET Endpoints
chatRouter.get('/', verifyToken, chatController.retrieveUserChats);

// DELETE Endpoints
chatRouter.delete('/', verifyToken, chatController.deleteUserChats);

export default chatRouter;

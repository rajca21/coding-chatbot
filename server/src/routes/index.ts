import { Router } from 'express';
import userRouter from './user.router.js';
import chatRouter from './chat.router.js';

const router = Router();

router.use('/users', userRouter);
router.use('/chats', chatRouter);

export default router;

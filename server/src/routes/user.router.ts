import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import {
  loginValidator,
  registerValidator,
  validate,
} from '../utils/validators.js';
import { verifyToken } from '../utils/tokenManager.js';

const userRouter = Router();

// POST Endpoints
userRouter.post(
  '/register',
  validate(registerValidator),
  userController.register
);
userRouter.post('/login', validate(loginValidator), userController.login);

// GET Endpoints
userRouter.get('/', userController.getAllUsers);
userRouter.get('/auth-status', verifyToken, userController.verifyUser);
userRouter.get('/logout', verifyToken, userController.logout);

export default userRouter;

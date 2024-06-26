// routes/authRoutes.ts

import express, { Router, Response, Request } from 'express';
import * as authController from '../controllers/userController';

const userRouter:Router = express.Router();

userRouter.get('/', (req: Request, res:Response) => {res.status(201).json({"message": "Connected"})})
userRouter.post('/signup', authController.signup);

userRouter.post('/login', authController.login);
userRouter.post('/logout', authController.logOut)
userRouter.delete('/delete', authController.deleteUser);

export default userRouter;

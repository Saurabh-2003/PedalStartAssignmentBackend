// routes/authRoutes.ts

import express, { Router } from 'express';
import * as authController from '../controllers/userController';

const userRouter:Router = express.Router();

userRouter.get('/', () => {console.log("Request here")})
userRouter.post('/signup', authController.signup);

userRouter.post('/login', authController.login);
userRouter.post('/logout', authController.logOut)
userRouter.delete('/delete', authController.deleteUser);

export default userRouter;

import { Router } from "express";

const authRouter = Router();

import { signup, signupDemo } from "./signup.js";
authRouter.post('/signup', signup);
authRouter.post('/signup/demo', signupDemo)

import { checkUser } from "./checkUser.js";
import { verifyAuthUser } from "../../middlewares/auth.middleware.ts";
authRouter.get('/check-user', checkUser)

import { login } from "./login.js";
authRouter.post('/login', login);

authRouter.get('/user', verifyAuthUser, async (req, res) => {
   const authUser = req.authUser
   if (authUser) {
      const user = {
         name: authUser.name,
         email: authUser.email,
         avatarUrl: authUser.avatarUrl,
         createdAt: authUser.createdAt
      }
      res.status(200).json({ message: 'user fetched successfully', data: user })
      return
   }
});

import { logout } from "./logout.js";
authRouter.post('/logout', logout);

export { authRouter };
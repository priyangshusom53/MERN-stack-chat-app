import { Router } from "express";

const authRouter = Router();

import { signup, signupDemo } from "./signup.js";
authRouter.post('/signup', signup);
authRouter.post('/signup/demo', signupDemo)

import { checkUser } from "./checkUser.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";
authRouter.get('/check-user', verifyUser, checkUser)

import { login } from "./login.js";
authRouter.post('/login', login);

import { logout } from "./logout.js";
authRouter.post('/logout', logout);

export { authRouter };
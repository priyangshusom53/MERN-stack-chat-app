import { Router } from "express";

const authRouter = Router();

import { signup, signupDemo } from "./signup.js";
authRouter.post('/signup', signup);
authRouter.post('/signup/demo', signupDemo)

import { login } from "./login.js";
authRouter.post('/login', login);

import { logout } from "./logout.js";
authRouter.post('/logout', logout);

export { authRouter };
import { Router } from "express";

const authRouter = Router();

import { signup } from "./signup.js";
authRouter.post('/signup', signup);

import { login } from "./login.js";
authRouter.post('/login', login);

import { logout } from "./logout.js";
authRouter.post('/logout', logout);

export { authRouter };
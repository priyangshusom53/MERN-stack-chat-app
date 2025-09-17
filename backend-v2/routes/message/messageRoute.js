import { Router } from "express";

export const messageRouter = Router();

import { sendMessage } from "./send.js";
messageRouter.post('/send-message', sendMessage);

import { getMessages } from "./getMessages.js";
messageRouter.get('/messages', getMessages);
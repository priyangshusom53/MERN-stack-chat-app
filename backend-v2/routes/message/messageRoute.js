import { Router } from "express";

export const messageRouter = Router();

import { sendMessage } from "./send.js";
messageRouter.post('/send-message', sendMessage);

import { getMessages } from "./getMessages.js";
messageRouter.post('/messages', getMessages);

import { getUser } from "./getUser.js";
messageRouter.get('/get-user/:id', getUser)

import { getContacts } from "./getContacts.js";
messageRouter.get('/contacts/:id', getContacts)
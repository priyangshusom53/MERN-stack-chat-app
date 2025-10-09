import { Router } from "express";
import { verifyAuthUser } from "../../middlewares/auth.middleware.ts";

export const messageRouter = Router();

messageRouter.use(verifyAuthUser)

import { postMessage } from "./sendMessage.ts";
//POST: /api/v1/contacts/:contactEmail/message
messageRouter.post('/:contactEmail/message', postMessage);

import { getMessages } from "./getMessages.ts";
//GET: /api/v1/contacts/:contactEmail/messages?limit=number
messageRouter.post('/:contactEmail/messages', getMessages);

//GET: /api/v1/contacts
import { getContacts } from "./getContacts.ts";
messageRouter.get('/', getContacts)

import { getUser } from "./getUser.js";
messageRouter.get('/get-user/:id', getUser)
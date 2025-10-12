import { Router } from "express";
import { verifyAuthUser } from "../../middlewares/auth.middleware.ts";

export const messageRouter = Router();

messageRouter.use(verifyAuthUser)

import { postMessage } from "./sendMessage.js";
//POST: /api/v1/contacts/:contactEmail/message
messageRouter.post('/:contactEmail/message', postMessage);

import { getMessages } from "./getMessages.js";
//GET: /api/v1/contacts/:contactEmail/messages?limit=number
messageRouter.get('/:contactEmail/messages', getMessages);

//GET: /api/v1/contacts
import { getContacts } from "./getContacts.js";
messageRouter.get('/', getContacts)

//GET: /api/v1/contacts/:contactEmail
import { getContact } from "./getContact.js";
messageRouter.get('/:contactEmail', getContact)

import { getUser } from "./getUser.js";
messageRouter.get('/get-user/:id', getUser)
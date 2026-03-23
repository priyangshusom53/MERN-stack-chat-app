import type { Router, Request, Response } from "express";
import type { CreateChatWebController } from "../features/chat/createChat.js";
import type { GetChatsWebController } from "../features/chat/getChats.js";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";

export function addCreateChatRoute(
   router:Router,
   subroute:string,
   controller:CreateChatWebController,
   auth:AuthMiddleware
){
   router.post(
      subroute,
      auth.handle.bind(auth),
      controller.createChat.bind(controller)
   )
}


export function addGetChatsRoute(
   router:Router,
   subroute:string,
   controller:GetChatsWebController,
   auth:AuthMiddleware
){
   router.get(
      subroute,
      auth.handle.bind(auth),
      controller.getChats.bind(controller)
   )
}
import type { Router, Request, Response } from "express";
import type { CreatePrivateChatWebController } from "../features/chat/createPrivateChat.js";
import type { GetChatsWebController } from "../features/chat/getChats.js";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";

export function addCreatePrivateChatRoute(
   router:Router,
   subroute:string,
   controller:CreatePrivateChatWebController<any, any>,
   auth:AuthMiddleware
){
   router.post(
      subroute,
      auth.handle.bind(auth),
      controller.createPrivateChat.bind(controller)
   )
}


export function addGetChatsRoute(
   router:Router,
   subroute:string,
   controller:GetChatsWebController<any,any>,
   auth:AuthMiddleware
){
   router.get(
      subroute,
      auth.handle.bind(auth),
      controller.getChats.bind(controller)
   )
}
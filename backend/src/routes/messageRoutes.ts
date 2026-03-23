import express from "express";
import type { AuthMiddleware } from "../middlewares/authMiddleware.js";
import type { GetMessagesWebController } from "../features/message/getMessages.js";



export function addGetMessagesRoute(
   router:express.Router,
   subroute:string,
   auth:AuthMiddleware,
   controller:GetMessagesWebController
){
   router.get(
      subroute,
      auth.handle.bind(auth),
      controller.getMessages.bind(controller)
   )
}
import type { Request, Response } from "express";
import type { AuthenticatedWebRequest } from "../../middlewares/authMiddleware.js";
import type { Action, RequestDS, ResponseDS } from "../action.js";

export interface SendMessageWebRequest extends AuthenticatedWebRequest{
   body:{
      message:string,
      image?:string
   }
}

export interface SendMessageWebResponse extends Response{}

export class SendMessageWebController{

   action:Action<SendMessageRequestDS, SendMessageResponseDS>

   constructor(action:Action<SendMessageRequestDS, SendMessageResponseDS>){
      this.action = action
   }

   async sendMessage(req:SendMessageWebRequest, res:SendMessageWebResponse){

      
   }

}

type SendMessageRequestDS = RequestDS & {

}

type SendMessageResponseDS = ResponseDS<{

},{

}>

export class SendMessageAction implements Action<SendMessageRequestDS, SendMessageResponseDS>{

   async execute(req: RequestDS):Promise<SendMessageResponseDS> {
       
   }
}
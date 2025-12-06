
import type { Action } from "../actionInterface.js";
import type { WebRequest, WebResponse } from "../webReqRes.js";

interface SendMessageWebRequest extends WebRequest {
   user: User
   contactEmail: string;
   message: {
      text: string,
      media?: string
   }
}
interface SendMessageWebResponse extends WebResponse { }

export class SendMessageWebController<WebRequestType extends SendMessageWebRequest, WebResponseType extends SendMessageWebResponse> {
   sendMessageAction: Action<SendMessageRequest, SendMessageResult>;

   constructor(sendMessageAction: Action<SendMessageRequest, SendMessageResult>) {
      this.sendMessageAction = sendMessageAction
   }

   async SendMessage(req: WebRequestType, res: WebResponseType) {
      const user = req.user
      const contactEmail = req.contactEmail
      const message = req.message

      const result = await this.sendMessageAction.Execute({ sender: user, receiverEmail: contactEmail, messageContent: message })

      if (!result.success) {
         return res.status(400).json({ error: result.statusMessage })
      }
      return res.status(201).json({ message: result.statusMessage, Message: result.Message })
   }
}



import { User } from "../../core/user.js";
import { Message } from "../../core/message.js";
import type { RequestDS, ResultDS } from "../actionInterface.js";

interface SendMessageRequest extends RequestDS {
   sender: User;
   receiverEmail: string;
   messageContent: {
      text: string,
      media?: string
   }
}
interface SendMessageResult extends ResultDS {
   Message?: Message;
}

import type { UserDataAccess } from "../../dataAccess/userDataAccess.js";
import type { MessageDataAccess } from "../../dataAccess/messageDataAccess.js";

class SendMessageAction implements Action<SendMessageRequest, SendMessageResult> {

   constructor(private messageDataAccess: MessageDataAccess, private userDataAccess: UserDataAccess) {
      this.messageDataAccess = messageDataAccess
      this.userDataAccess = userDataAccess
   }

   async Execute(req: SendMessageRequest): Promise<SendMessageResult> {
      const receiver = await this.userDataAccess.FindUserByEmail(req.receiverEmail)
      const receiverId = receiver ? receiver.id : '';

      const result = await this.messageDataAccess.AddMessageBetweenUsers(req.sender.id, receiverId)

      if (!result) {
         return { success: false, statusMessage: 'Failed to send message' }
      }
      return { success: true, statusMessage: 'Message sent successfully', Message: result }
   }
}
import type { RequestDS, ResultDS } from "../actionInterface.js";
import type { WebRequest, WebResponse } from "../webReqRes.js";


interface GetMessagesWebRequest extends WebRequest {
   user: User;
   contact: User;
   limit: number;
}

interface GetMessagesWebResponse extends WebResponse { }

export class GetMessagesWebController<WebRequestType extends GetMessagesWebRequest, WebResponseType extends GetMessagesWebResponse> {
   getMessagesAction: Action<GetMessagesRequest, GetMessagesResult>;

   constructor(getMessagesAction: Action<GetMessagesRequest, GetMessagesResult>) {
      this.getMessagesAction = getMessagesAction
   }

   async GetMessages(req: WebRequestType, res: WebResponseType) {
      const user = req.user
      const contact = req.contact
      const limit = req.limit

      const result = await this.getMessagesAction.Execute({ user, contact, limit })

      if (!result.success) {
         return res.status(400).json({ error: result.statusMessage })
      }
      return res.status(200).json({ message: result.statusMessage, messages: result.messages })
   }
}



interface GetMessagesRequest extends RequestDS {
   user: User;
   contact: User;
   limit: number;
}

interface GetMessagesResult extends ResultDS {
   messages?: Message[]
}

import type { Action } from "../actionInterface.js";
import type { User } from "../../core/user.js";
import type { Message } from "../../core/message.js";
import type { MessageDataAccess } from "../../dataAccess/messageDataAccess.js";
class GetMessagesAction implements Action<GetMessagesRequest, GetMessagesResult> {

   constructor(private messageDataAccess: MessageDataAccess) {
      this.messageDataAccess = messageDataAccess
   }

   async Execute(req: GetMessagesRequest): Promise<GetMessagesResult> {

      const messages = await this.messageDataAccess.FindMessagesBetweenUsers(req.user.id, req.contact.id, req.limit)

      if (!messages) {
         return { success: false, statusMessage: "Couldn't load messages" }
      }
      return { success: true, statusMessage: "Messages loaded successfully", messages: messages }
   }
}
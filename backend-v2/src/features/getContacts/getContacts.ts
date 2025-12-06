
import type { WebRequest, WebResponse } from "../webReqRes.js";

interface GetContactsWebRequest extends WebRequest {
   user: User;
}

interface GetContactsWebResponse extends WebResponse { }

export class GetContactsWebController<WebRequestType extends GetContactsWebRequest, WebResponseType extends GetContactsWebResponse> {

   getContactsAction: Action<GetContactsRequest, GetContactsResult>;

   constructor(getContactsAction: Action<GetContactsRequest, GetContactsResult>) {
      this.getContactsAction = getContactsAction
   }

   async GetContacts(req: WebRequestType, res: WebResponseType) {
      const result = await this.getContactsAction.Execute({ user: req.user })

      if (!result.success) {
         return res.status(400).json({ error: result.statusMessage })
      }

      return res.status(200).json({ message: result.statusMessage, contacts: result.contacts })
   }
}



import type { Action, RequestDS, ResultDS } from "../actionInterface.js";
import type { UserDataAccess } from "../../dataAccess/userDataAccess.js";
import type { User } from "../../core/user.js";
import { get } from "http";
interface GetContactsRequest extends RequestDS {
   user: User
}

interface GetContactsResult extends ResultDS {
   contacts?: contact[]
}

type contact = {
   name: string,
   profilePic?: string | null
}

class GetContactsAction implements Action<GetContactsRequest, GetContactsResult> {

   constructor(private userDataAccess: UserDataAccess) {
      this.userDataAccess = userDataAccess
   }

   async Execute(req: GetContactsRequest): Promise<GetContactsResult> {

      const result = await this.userDataAccess.GetContacts(req.user.id)

      if (!result) {
         return { success: false, statusMessage: "Couldn't load contacts" }
      }

      const contacts = result.map((user: User): contact => {
         return {
            name: user.name,
            profilePic: user.profilePic
         }
      })

      return { success: true, statusMessage: "Contacts loaded successfully", contacts }
   }
}

import type { WebRequest, WebResponse } from "../webReqRes.js";

interface GetContactDetailsWebRequest extends WebRequest {
   user: User
   contactEmail: string
}

interface GetContactDetailsWebResponse extends WebResponse { }

export class GetContactDetailsWebController<WebRequestType extends GetContactDetailsWebRequest, WebResponseType extends GetContactDetailsWebResponse> {

   getContactDetailsAction: Action<GetContactDetailsRequest, GetContactDetailsResult>;

   constructor(getContactDetailsAction: Action<GetContactDetailsRequest, GetContactDetailsResult>) {
      this.getContactDetailsAction = getContactDetailsAction
   }

   async GetContactDetails(req: WebRequestType, res: WebResponseType) {
      const user = req.user
      const contactEmail = req.contactEmail

      const result = await this.getContactDetailsAction.Execute({ user, contactEmail })

      if (!result.success) {
         return res.status(404).json({ error: result.statusMessage })
      }
      return res.status(200).json({ message: result.statusMessage, contact: result.contact })
   }
}



import type { Action, RequestDS, ResultDS } from "../actionInterface.js";
import type { UserDataAccess } from "../../dataAccess/userDataAccess.js";
import type { User } from "../../core/user.js";
interface GetContactDetailsRequest extends RequestDS {
   user: User
   contactEmail: string
}

interface GetContactDetailsResult extends ResultDS {
   contact?: User
}

class GetContactDetailsAction implements Action<GetContactDetailsRequest, GetContactDetailsResult> {

   constructor(private userDataAccess: UserDataAccess) {
      this.userDataAccess = userDataAccess
   }

   async Execute(req: GetContactDetailsRequest): Promise<GetContactDetailsResult> {
      const contact = await this.userDataAccess.FindUserByEmail(req.contactEmail)

      if (!contact) {
         return { success: false, statusMessage: "Couldn't get contact details" }
      }
      return { success: true, statusMessage: 'Contact details fetched successfully', contact }
   }
}
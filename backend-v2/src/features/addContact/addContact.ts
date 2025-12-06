
import type { WebRequest, WebResponse } from "../webReqRes.js";

interface AddContactWebRequest extends WebRequest {
   user: User;
   contactEmail: string;
}

interface AddContactWebResponse extends WebResponse { }

class AddContactWebController<WebRequestType extends AddContactWebRequest, WebResponseType extends AddContactWebResponse> {

   addContactAction: Action<AddContactRequest, AddContactResult>;

   constructor(addContactAction: Action<AddContactRequest, AddContactResult>) {
      this.addContactAction = addContactAction
   }

   async AddContact(req: WebRequestType, res: WebResponseType) {
      const userId = req.user.id as string;
      const contactEmail = req.contactEmail as string;

      const result = await this.addContactAction.Execute({ userId, contactEmail })

      if (!result.success) return res.status(400).json({ error: result.statusMessage });
      return res.status(201).json({ id: result.contactId, name: result.contactName, email: result.contactEmail, message: result.statusMessage });
   }
}



import type { Action } from "../actionInterface.js";
import type { UserDataAccess } from "../../dataAccess/userDataAccess.js";
import type { RequestDS, ResultDS } from "../actionInterface.js";
import type { User } from "../../core/user.js";

export interface AddContactRequest extends RequestDS {
   userId: string;
   contactEmail: string;
}

export interface AddContactResult extends ResultDS {
   contactId?: string;
   contactEmail?: string;
   contactName?: string;
}

export class AddContactAction implements Action<AddContactRequest, AddContactResult> {
   constructor(private userDataAccess: UserDataAccess) { }

   async Execute(req: AddContactRequest): Promise<AddContactResult> {

      if (!req.contactEmail || !req.userId) {
         return { success: false, statusMessage: "Missing userId or email" };
      }
      if (!/^\S+@\S+\.\S+$/.test(req.contactEmail)) {
         return { success: false, statusMessage: "Invalid email" };
      }

      const contact = await this.userDataAccess.FindUserByEmail(req.contactEmail);
      if (!contact) {
         return { success: false, statusMessage: "Contact does not exists" };
      }
      const user = await this.userDataAccess.FindUserById(req.userId)

      // user provided by middlewares for already logged in 
      // user
      if (user) {
         const contactAlreadyExist = user.contacts?.includes(contact.email)
         if (contactAlreadyExist) {
            return { success: false, statusMessage: 'Contact already exists' };
         }
         const result = await this.userDataAccess.AddContact(user.id, contact.email)
         return { success: true, statusMessage: 'Contact added successfully', contactEmail: contact.email, contactName: contact.name, contactId: contact.id }
      }
      return { success: false, statusMessage: 'Invalid user' }
   }
}

class AddContactPresenter { }
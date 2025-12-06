

// export const getUserDetailsHandler = (req:Request,res:Response)=>{
//    const email = req.params.email

//    const getUserDetailsAction = new GetUserDetailsAction()
//    const getUserDetailsController = new GetUserDetailsWebController() 
// }

import type { WebRequest, WebResponse } from "../webReqRes.js";

interface GetUserDetailsWebRequest extends WebRequest {
   email: string;
}

interface GetUserDetailsWebResponse extends WebResponse { }

export class GetUserDetailsWebController {

   getUserDetailsAction: Action<GetUserDetailsRequest, GetUserDetailsResult>;

   constructor(getUserDetailsAction: Action<GetUserDetailsRequest, GetUserDetailsResult>) {
      this.getUserDetailsAction = getUserDetailsAction
   }

   async GetUserDetails(req: GetUserDetailsWebRequest, res: GetUserDetailsWebResponse) {
      const email = req.email

      const result = await this.getUserDetailsAction.Execute({ email: email })

      if (!result.success) {
         return res.status(404).json({ error: result.statusMessage })
      }
      return res.status(200).json({ message: result.statusMessage, user: result.user })
   }
}



import type { Action, RequestDS, ResultDS } from "../actionInterface.js";
import type { UserDataAccess } from "../../dataAccess/userDataAccess.js";
import type { User } from "../../core/user.js";
interface GetUserDetailsRequest extends RequestDS {
   email: string;
}
interface GetUserDetailsResult extends ResultDS {
   user?: User;
}

export class GetUserDetailsAction implements Action<GetUserDetailsRequest, GetUserDetailsResult> {

   constructor(private userDataAccess: UserDataAccess) {
      this.userDataAccess = userDataAccess
   }

   async Execute(req: GetUserDetailsRequest): Promise<GetUserDetailsResult> {

      const user = await this.userDataAccess.FindUserByEmail(req.email);
      if (!user) return { success: false, statusMessage: "Couldn't get user details" }

      return { success: true, statusMessage: "User details fetched successfully", user: user }
   }
}
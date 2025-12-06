

import type { WebRequest, WebResponse } from "../webReqRes.js";

interface SignupWebRequest extends WebRequest {
   body: {
      name: string,
      email: string,
      password: string
   }
}

interface SignupWebResponse extends WebResponse { }

export class SignupWebController<WebRequestType extends SignupWebRequest, WebResponseType extends SignupWebResponse> {

   signupAction: Action<SignupRequest, SignupResult>;
   constructor(signupAction: Action<SignupRequest, SignupResult>) {
      this.signupAction = signupAction
   }

   async Signup(req: WebRequestType, res: WebResponseType) {
      const result = await this.signupAction.Execute({ name: req.body.name, email: req.body.email, password: req.body.password })

      if (!result.success) {
         return res.status(400).json({ error: result.statusMessage })
      }
   }

}



import type { Action, RequestDS, ResultDS } from "../actionInterface.js";
import type { UserDataAccess } from "../../dataAccess/userDataAccess.js";
import type { User } from "../../core/user.js";
interface SignupRequest extends RequestDS {
   email: string;
   name: string;
   password: string;
}

interface SignupResult extends ResultDS {
   user?: User;
}

export class SignupAction implements Action<SignupRequest, SignupResult> {

   constructor(private userDataAccess: UserDataAccess) {
      this.userDataAccess = userDataAccess
   }

   async Execute(req: SignupRequest): Promise<SignupResult> {
      const user = await this.userDataAccess.CreateUser({ name: req.name, email: req.email, password: req.password })

      if (!user) return { success: false, statusMessage: "User signup falied" }

      return { success: true, statusMessage: "user signedup successfully", user: user }
   }
}
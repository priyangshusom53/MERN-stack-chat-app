

import type { WebRequest, WebResponse } from "../webReqRes.js";

interface LoginWebRequest extends WebRequest {
   body: {
      email: string,
      password: string
   }
}

interface LoginWebResponse extends WebResponse { }


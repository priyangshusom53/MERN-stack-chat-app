
import type { User } from "../core/user.js";

export interface WebRequest { }
export interface WebResponse {
   status(code: number): this;
   json(obj: object): this;
   cookie(name: string, value: string, options: { [key: string]: any }): this;
}


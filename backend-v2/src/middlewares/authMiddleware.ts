// import { findUserById } from '../db/models/user.js';
// import * as jwt from '../utils/jwt.js';
// import { db } from '../index.js';

// types
import type { Request, Response, NextFunction } from "express"
import type { EncryptionService } from "../encryption/encryptionInterface.js"
import type { UserDataAccess } from "../dataAccess/userDataAccess.js"
import type { WebRequest } from '../features/webReqRes.js';

export class AuthMiddleware {

   constructor(
      private encryptionService: EncryptionService,
      private userDataAccess: UserDataAccess
   ){}

   async authenticate(req: Request, res: Response, next: NextFunction){

      const token = req.cookies.sessionId

      if(!token){
         return res.status(401).json({ error: "Unauthorized" })
      }

      const payload = this.encryptionService.Decrypt(token)

      if(!payload){
         return res.status(401).json({ error: "Invalid session" })
      }

      const user = await this.userDataAccess.FindUserById(payload.id)

      if(!user){
         return res.status(401).json({ error: "User not found" })
      }

      // attach authenticated user
      req.user = user

      next()
   }
}

// export function verifyAuthUser(req: WebRequest, res: Response, next: NextFunction){}
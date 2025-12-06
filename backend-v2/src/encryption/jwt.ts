import * as jwt from "jsonwebtoken"
import { type Secret, type SignOptions } from "jsonwebtoken";
import type { EncryptionService, Expiry } from "./encryptionInterface.js";

class JWTEncryption implements EncryptionService {
   Encrypt(data: object, expiresIn: Expiry): string | null {
      const JWT_SECRET = process.env.JWT_SECRET as Secret;
      if (!JWT_SECRET) {
         console.log("No JWT secret found in .env file");
         return null
      }

      const options: SignOptions = {
         expiresIn: `${expiresIn.time}${expiresIn.unit}`
      }
      let token = jwt.sign(data, JWT_SECRET, options)
      return token
   }
   Decrypt(token: string): object {

   }
}
import * as jwt from "jsonwebtoken"
import type { Secret, SignOptions } from "jsonwebtoken";
import type { EncryptionService, Expiry, PayloadType } from "./encryptionInterface.js";

class JWTEncryption implements EncryptionService {
   Encrypt(data: PayloadType, expiresIn: Expiry): string | null {
      const JWT_SECRET = process.env.JWT_SECRET as Secret;
      if (!JWT_SECRET) {
         console.log("No JWT secret found in .env file");
         return null
      }

      const options: SignOptions = {
         expiresIn: `${expiresIn.time}${expiresIn.unit}`
      }
      try {
         const token = jwt.sign(data, JWT_SECRET, options)
         return token
      } catch (err: any) {
         console.error(err.message)
         return null
      }
   }
   Decrypt(token: string): PayloadType | null {
      const JWT_SECRET = process.env.JWT_SECRET as Secret;
      if (!JWT_SECRET) {
         console.log("No JWT secret found in .env file");
         return null
      }

      try {
         const payLoad = jwt.verify(token, JWT_SECRET) as PayloadType
         return payLoad
      } catch (err: any) {
         console.error(err.message)
         return null
      }
   }
}
import jwt, { type SignOptions, type Secret } from "jsonwebtoken"
import type { EncryptionService,ExpiryTime } from "./encryptionService.js"

function convertExpiry(expiresIn:ExpiryTime):string{
   return `${expiresIn.time}${expiresIn.unit}`
}

export class JwtEncryptionService implements EncryptionService{

   async encrypt(payload:object, expiresIn:ExpiryTime):Promise<string | null>{

      const JWT_SECRET = process.env.JWT_SECRET as Secret

      if(!JWT_SECRET){
         console.error("No JWT secret found in .env file")
         return null
      }

      const options:SignOptions = {
         expiresIn: convertExpiry(expiresIn)
      }

      try{

         const token = jwt.sign(
            payload,
            JWT_SECRET,
            options
         )

         return token

      }catch(err:any){

         console.error(err.message)
         return null

      }
   }

   async decrypt(token:string):Promise<object | null>{

      const JWT_SECRET = process.env.JWT_SECRET as Secret

      if(!JWT_SECRET){
         console.error("No JWT secret found")
         return null
      }

      try{

         const decoded = jwt.verify(token, JWT_SECRET)

         if(typeof decoded === "object"){
            return decoded
         }

         return null

      }catch(err){
         return null
      }
   }

}
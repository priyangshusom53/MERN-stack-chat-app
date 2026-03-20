import jwt, {type Secret} from 'jsonwebtoken'
import ms from 'ms'
import { type ExpiryTime, type payload, type TokenService } from './tokenService.js'

function ExpiryTimeToJWTTime(time:ExpiryTime):ms.StringValue{
   const unit='ms'
   let amount:number=0
   switch(time.unit){
      case 'd':
         amount=time.time*24*60*60*100
         break
      case 'h':
         amount=time.time*60*60*100
         break
      case 'm':
         amount=time.time*60*1000
         break
      case 's':
         amount=time.time*1000
         break
   }
   return `${amount}${unit}`
}

import path from 'node:path';
import url from 'node:url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class JWTTokenService implements TokenService{
   
   secret:Secret
   constructor(secret:Secret){this.secret=secret}

   encode(payload:payload, expiresIn:ExpiryTime):string|null{
      
      try{
         const token = jwt.sign(payload, this.secret, 
            {
               algorithm:"HS256",
               expiresIn:ExpiryTimeToJWTTime(expiresIn)
            }
         )
         return token
      }catch(err){
         console.error(`Error in file: ${__filename} `+err)
      }
      return null
   }

   decode(token: string): payload | null {
       
      try{
         const decoded = jwt.verify(token,this.secret)
         if(typeof decoded==="object") return decoded
         return null
      }catch(err){
         console.error(`Error in file: ${__filename} `+err)
      }
      return null
   }
}


export type ExpiryUnit = "s" | "m" | "h" | "d"

export interface ExpiryTime {
   time: number
   unit: ExpiryUnit
}

export function ExpiryTimeToMS(time:ExpiryTime):number{
   switch(time.unit){
      case 'd':
         return time.time*24*60*60*1000
      case 'h':
         return time.time*60*60*1000
      case 'm':
         return time.time*60*1000
      case 's':
         return time.time*1000
      default:
         return 0
   }
}

export type payload = Record<string,string>

export interface TokenService{
   encode(payload:payload, expiresIn:ExpiryTime):string|null;
   decode(token:string):payload|null;
}

export interface EncryptionService{
   encrypt(payload:object, expiresIn:ExpiryTime):Promise<string | null>;
   decrypt(token:string):Promise<object | null>;
}

export type ExpiryUnit = "s" | "m" | "h" | "d"

export interface ExpiryTime {
   time: number
   unit: ExpiryUnit
}
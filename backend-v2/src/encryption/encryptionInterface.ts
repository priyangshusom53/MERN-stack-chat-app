export interface PayloadType {
   [key: string]: any;
}
export interface Expiry {
   time: number;
   unit: 'H' | 'h' | 'D' | 'd' | 'M' | 'm' | 'Y' | 'y';
}
export interface EncryptionService {
   Encrypt(data: PayloadType, expiresIn: Expiry): string | null;
   Decrypt(token: string): PayloadType | null;
}
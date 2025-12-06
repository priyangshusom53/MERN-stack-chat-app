
export interface Expiry {
   time: number;
   unit: 'H' | 'h' | 'D' | 'd' | 'M' | 'm' | 'Y' | 'y';
}
export interface EncryptionService {
   Encrypt(data: object, expiresIn: Expiry): string | null;
   Decrypt(token: string): object;
}
import type { User } from '../core/user.js'

export interface UserDataAccess {
   CreateUser(userDetails: { name: string, email: string, password: string }): Promise<User | null>;
   FindUserById(id: string): Promise<User | null>;
   FindUserByEmail(email: string): Promise<User | null>;
   AddContact(userId: string, contactEmail: string): Promise<User | null>;
   GetContacts(id: string): Promise<User[] | null>
   DeleteContact(contactEmail: string): object;
   UpdateUser(updatedData: object): Promise<User>;
}

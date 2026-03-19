
import type { User } from "../../core/user.js"

export interface UserDataAccess{
   getUserById(id:string):Promise<User|null>;
   getUsersByIds(ids:string[]):Promise<User[] |null>;
   getUserByEmail(email:string):Promise<User|null>;
   getUsersByEmails(emails:string[]):Promise<User[] |null>
   createUser(userData:User):Promise<User | null>;
   updateUser(updatedUserData:User):Promise<User | null>;
   deleteUser(id:string):Promise<boolean>;
}
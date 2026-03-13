
import type { User } from "../../core/user.js"

export interface UserDataAccess{
   getUserById(id:string):Promise<User|null>;
   getUserByEmail(email:string):Promise<User|null>;
   createUser(userData:{
      name:string,
      email:string,
      password:string,
      profilePicUrl?:string,
      about?:string
   }):Promise<User | null>;
   updateUser(user:User):Promise<User | null>;
   deleteUser(id:string):Promise<void>;
}
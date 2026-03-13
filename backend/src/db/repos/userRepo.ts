import type { UserDataAccess } from "../../features/dataAccess/userDataAccess.js";
import type { IDatabase } from "../db.js";
import { User } from "../../core/user.js";

export class UserRepo implements UserDataAccess{

   db:IDatabase
   tableName:string

   constructor(
      db:IDatabase,
      tableName:string
   ){
      this.db = db
      this.tableName = tableName
   }

   private toDomain(data:any):User{
      return new User(
         data._id.toString(),
         data.name,
         data.email,
         data.password,
         data.createdAt,
         data.profilePicUrl,
         data.about,
         data.chats
      )
   }

   async getUserById(id:string):Promise<User|null>{

      const result = await this.db.findOne(
         this.tableName,
         { _id:id }
      )

      if(!result) return null

      return this.toDomain(result)
   }

   async getUserByEmail(email:string):Promise<User|null>{

      const result = await this.db.findOne(
         this.tableName,
         { email }
      )

      if(!result) return null

      return this.toDomain(result)
   }

   async createUser(userData:{
      name:string,
      email:string,
      password:string,
      profilePicUrl?:string,
      about?:string
   }):Promise<User|null>{

      const data = {
         name:userData.name,
         email:userData.email,
         password:userData.password,
         profilePicUrl:userData.profilePicUrl,
         about:userData.about || ""
      }

      const result = await this.db.create(
         this.tableName,
         data
      )

      if(!result) return null

      return this.toDomain(result)
   }

   async updateUser(user:User):Promise<User|null>{

      await this.db.updateOne(
         this.tableName,
         { _id:user.id },
         {
            name:user.name,
            email:user.email,
            password:user.password,
            profilePicUrl:user.profilePicUrl,
            about:user.about,
            chats:user.chats
         }
      )

      return user
   }

   async deleteUser(id:string):Promise<void>{

      await this.db.deleteOne(
         this.tableName,
         { _id:id }
      )
   }
}


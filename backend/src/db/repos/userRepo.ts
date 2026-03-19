import type { UserDataAccess } from "../../features/dataAccess/userDataAccess.js";
import type { MongoNoSQLDB } from "../db.js";
import { User } from "../../core/user.js";
import mongoose from "mongoose";
import type { IUserSchema, UserModel, WithId } from "../schemas.js";

function FromUserToUserDoc(user:User){
   const doc:Partial<IUserSchema> = {
      name:user.name,
      email:user.email,
      password:user.password,
      profilePicUrl:user.profilePicUrl,
      about:user.about,
      chats:user.chats?.map(chatId=>{
         return new mongoose.Types.ObjectId(chatId)
      }) || null
   }
   return doc
}

function FromUserDocToUser(doc:WithId<IUserSchema>){
   const user = new User(
      doc._id.toString(),
      doc.name,
      doc.email,
      doc.password,
      doc.createdAt,
      doc.updatedAt,
      doc.profilePicUrl || undefined,
      doc.about || undefined,
      doc.chats?.map((chat)=>{
         return chat.toString()
      })
   )
   return user
}

export class UserRepo implements UserDataAccess{

   db:MongoNoSQLDB
   model: typeof UserModel

   constructor(
      db:MongoNoSQLDB,
      model:typeof UserModel
   ){
      this.db = db
      this.model = model
   }

   async getUserById(id:string):Promise<User|null>{
      const res = await this.db.findOne(this.model,{_id:id})
      if(!res) return null
      return FromUserDocToUser(res)
   }

   async getUsersByIds(ids:string[]):Promise<User[] |null>{
      const res = await this.db.find(this.model,
         {_id:{
               $in:[...ids]
         }})
      if(!res) return null
      const users = res.map((user)=>{
         return FromUserDocToUser(user)
      })
      return users
   }

   async getUserByEmail(email:string):Promise<User|null>{
      const res = await this.db.findOne(this.model,{email:email})
      if(!res) return null
      return FromUserDocToUser(res)
   }

   async getUsersByEmails(emails:string[]):Promise<User[]|null>{
      const res = await this.db.find(this.model,
         {email:{
               $in:[...emails]
         }})
      if(!res) return null
      const users = res.map((user)=>{
         return FromUserDocToUser(user)
      })
      return users
   }

   async createUser(userData:User):Promise<User | null>{
      const res = await this.db.create<IUserSchema>(this.model,FromUserToUserDoc(userData))
      if(!res) return null
      return FromUserDocToUser(res)
   }

   async updateUser(updatedUserData:User):Promise<User | null>{
      const res = await this.db.updateOne(this.model,{_id:updatedUserData.id}, FromUserToUserDoc(updatedUserData))
      if(!res) return null
      return FromUserDocToUser(res)
   }

   async deleteUser(id:string):Promise<boolean>{
      const res = await this.db.deleteOne(this.model,{_id:id})
      if(!res) return false
      return true
   }
}


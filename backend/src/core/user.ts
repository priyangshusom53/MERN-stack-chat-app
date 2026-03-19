import { Chat } from "./chat.js"

export class User{
   id:string
   name:string
   email:string
   password:string
   profilePicUrl:string | null
   about:string | null
   createdAt:Date
   updatedAt:Date
   chats:string[] | null // chat ids

   constructor(
      id:string,
      name:string,
      email:string,
      password:string,
      createdAt:Date,
      updatedAt:Date,
      profilePicUrl?:string,
      about?:string,
      chats?:string[]
   ){
      this.id = id
      this.name = name
      this.email = email
      this.password = password
      this.createdAt = createdAt
      this.updatedAt = updatedAt
      this.profilePicUrl = profilePicUrl || null
      this.about = about || ""
      this.chats = chats || null
   }
}
import { Message } from "./message.js"

export class Chat{
   id:string
   name:string
   isGroupChat:boolean
   participants:string[] // receiver id array
   icon:string | null
   createdBy:string | null
   createdAt: Date | null
   inviteToken:string | null
   lastMessage: Message | null

   constructor(
      id:string,
      name:string,
      isGroupChat:boolean,
      participants:string[],
      icon?:string,
      createdBy?:string,
      createdAt?:Date,
      inviteToken?:string,
      lastMessage?: Message
   ){
      this.id = id
      this.name = name
      this.isGroupChat = isGroupChat
      this.participants = participants
      this.icon = icon || null
      this.createdBy = createdBy || null
      this.createdAt = createdAt || null
      this.inviteToken = inviteToken || null
      this.lastMessage = lastMessage || null
   }
}
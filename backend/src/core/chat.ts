import { Message } from "./message.js"

export class Chat{
   id:string
   name:string
   isGroupChat:boolean
   participants:string[] // receiver id array
   groupIcon:string | null
   createdBy:string | null
   createdAt: Date | null
   inviteToken:string | null
   lastMessage: Message | null

   constructor(
      id:string,
      name:string,
      isGroupChat:boolean,
      participants:string[],
      groupIcon?:string,
      createdBy?:string,
      createdAt?:Date,
      inviteToken?:string,
      lastMessage?: Message
   ){
      this.id = id
      this.name = name
      this.isGroupChat = isGroupChat
      this.participants = participants
      this.groupIcon = groupIcon || null
      this.createdBy = createdBy || null
      this.createdAt = createdAt || null
      this.inviteToken = inviteToken || null
      this.lastMessage = lastMessage || null
   }
}
import type { Message } from "./message"

export interface Chat{
   id:string
   name:string
   isGroupChat:boolean
   participants:string[] // receiver id array
   icon:string | null
   createdBy:string | null
   createdAt: Date | null
   inviteToken:string | null
   lastMessage: Message | null
}
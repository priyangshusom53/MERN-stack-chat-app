
export interface Message{
   id: string
   chatId: string
   senderId: string
   text: string | null
   image: string | null
   sentAt: Date
   isDeleted:boolean
}
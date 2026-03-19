

export class Message{
   id: string
   chatId: string
   senderId: string
   text: string | null
   image: string | null
   sentAt: Date
   isDeleted:boolean
   
   constructor(
      id: string,
      chatId: string,
      senderId: string,
      sentAt: Date,
      text: string,
      image?: string,
      isDeleted?:boolean
   ){
      this.id = id
      this.senderId = senderId
      this.chatId = chatId
      this.text = text
      this.image = image || null
      this.sentAt = sentAt
      this.isDeleted = isDeleted || false
   }
}
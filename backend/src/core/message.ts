

export class Message{
   id: string
   chatId: string
   senderId: string
   text: string
   timestamp: Date

   constructor(
      id: string,
      chatId: string,
      senderId: string,
      text: string,
      timestamp: Date
   ){
      this.id = id
      this.senderId = senderId
      this.chatId = chatId
      this.text = text
      this.timestamp = timestamp
   }
}
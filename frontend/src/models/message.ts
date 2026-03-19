
export interface Message{
   id:string;
   chatId: string;
   isGroupChat:boolean;
   senderId: string;
   text: string;
   timestamp: Date;
}
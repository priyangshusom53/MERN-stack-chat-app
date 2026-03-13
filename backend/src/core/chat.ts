

export class Chat{
   id:string
   name:string
   isGroupChat:boolean
   participants:string[] // receiver id array

   constructor(
      id:string,
      name:string,
      isGroup:boolean,
      participants:string[],
   ){
      this.id = id
      this.name = name
      this.isGroupChat = isGroup
      this.participants = participants
   }
}
import type { Participant } from "./participants.js"


export class Room{
   id:string
   type:'group'|'private'
   participants:Set<string> // participant ids     

   constructor(id:string,type:'group'|'private', participantId:string){
      this.id = id
      this.participants = new Set()
      this.type = type
      this.participants.add(participantId)
   }

   join(participantId:string){
      if(this.type==='private' && this.participants.size==2 && !this.participants.has(participantId)){
         throw new Error("upto 2 participant can join private rooms, trying to join more than 2")
      }
      this.participants.add(participantId)
   }

   leave(participantId:string){
      this.participants.delete(participantId)
   }

   size(){
      return this.participants.size
   }
}

export class RoomManager{
   
   rooms:Map<string,Room> = new Map() // Room id -> Room map

   addRoom(room:Room){
      if(this.rooms.has(room.id)){
         console.log("Room Exists")
         console.log("id: ",room.id)
      }else{
         this.rooms.set(room.id, room)
         console.log("Room created")
         console.log("id: ",room.id)
      }
   }

   getRoom(roomId:string){
      return this.rooms.get(roomId)
   }

   deleteRoom(roomId:string){
      if(!this.rooms.has(roomId)){
         console.log("Room doesn't exist")
         console.log("id: ",roomId)
         return
      }

      const room = this.rooms.get(roomId)
      if(room?.size()==0){
         const res = this.rooms.delete(roomId)
         console.log("Room deleted")
         console.log("id: ",roomId)
      }else{
         console.log("Room not deleted")
         console.log("id: ",roomId)
      }
   }
}

export class RoomService{
   static join(room: Room, participant: Participant) {
      room.join(participant.id)
      participant.addRoom(room.id)
   }

   static leave(room: Room, participant: Participant) {
      room.leave(participant.id)
      participant.removeRoom(room.id)
   }
}


export class Participant{

   id:string
   joinedRooms:Set<string> // room ids

   constructor(id:string){
      this.id = id
      this.joinedRooms = new Set()
   }

   addRoom(roomId:string){
      this.joinedRooms.add(roomId)
   }

   removeRoom(roomId:string){
      this.joinedRooms.delete(roomId)
   }

   removeAllRooms(){
      this.joinedRooms.clear()
   }

   count(){
      return this.joinedRooms.size
   }
}


export class ParticipantManager{

   participants:Map<string, Participant> // participant id -> participant map

   constructor(){
      this.participants = new Map()
   }

   addParticipant(participant:Participant){
      if(this.participants.has(participant.id)){
         console.log("Participant exist")
         console.log("id: ",participant.id)
      }else{
         this.participants.set(participant.id, participant)
         console.log("Participant added")
         console.log("id: ",participant.id)
      }
   }

   removeParticipant(participantId:string){
      if(!this.participants.has(participantId)){
         console.log("Participant doesn't exist")
         console.log("id: ",participantId)
      }else{
         this.participants.delete(participantId)
         console.log("Removed participant")
         console.log("id: ",participantId)
      }
   }

   getParticipant(participantId:string){
      return this.participants.get(participantId)
   }
}
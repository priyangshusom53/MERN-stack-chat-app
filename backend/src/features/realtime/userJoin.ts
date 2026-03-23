import type { Chat } from "../../core/chat.js";
import type { User } from "../../core/user.js";
import type { Action, RequestDS, ResponseDS } from "../action.js";
import type { ChatDataAccess } from "../dataAccess/chatDataAccess.js";
import { Participant, type ParticipantManager } from "./participants.js";
import { Room, RoomService, type RoomManager } from "./rooms.js";


enum UserJoinErrorTypes{
   FailedToJoinUser="FAILED_TO_JOIN_USER_ERROR"
}

type UserJoinRequestDS = RequestDS & {
   // if a user joining the server means they are authenticated
   // so first auth middleware runs and fetches this User
   user:User
}

type UserJoinResponseDS = ResponseDS<{

},{
   errorType:UserJoinErrorTypes
}>

export class UserJoinAction implements Action<UserJoinRequestDS, UserJoinResponseDS>{

   chatDataAccess:ChatDataAccess
   participantManager:ParticipantManager
   joinRoomAction:JoinRoomAction

   constructor(
      chatDataAccess:ChatDataAccess,
      participantManager:ParticipantManager,
      joinRoomAction:JoinRoomAction
   ){
      this.chatDataAccess = chatDataAccess
      this.participantManager = participantManager
      this.joinRoomAction = joinRoomAction
   }

   async execute(req: UserJoinRequestDS):Promise<UserJoinResponseDS>{

      let participant:Participant|undefined|null = new Participant(req.user.id) 
      this.participantManager.addParticipant(participant)

      participant = this.participantManager.getParticipant(participant.id)

      if(!participant){
         return{
            success:false,
            errorType:UserJoinErrorTypes.FailedToJoinUser
         }
      }

      // Fetch Chats that belong to user
      const chatIds = req.user.chats
      if(!chatIds){
         // if user.chats is null means user doesn't have any contacts 
         return{
            success:true
         }
      }

      // Can skip fetching Chats because JoinRoomAction already fetches Chats
      let chats:Chat[] = []
      for(let i=0; i<chatIds.length; ++i){
         const chat = await this.chatDataAccess.getChatById(chatIds[i] as string)

         if(chat) chats.push(chat)
      }

      // Join user to each chat rooms after joining user 
      for(let i=0; i<chats.length; ++i){
         const requestDS:JoinRoomRequestDS = {
            userId:req.user.id,
            chatId:chats[i]!.id
         }
         const responseDS = await this.joinRoomAction.execute(requestDS)
      }

      return{
         success:true
      }
   }
}


enum JoinRoomErrorTypes{
   DatabaseError = "DATABASE_ERROR",
   RoomNotAvailable = "ROOM_NOT_AVAILABLE_ERROR",
   ParticipantNotFound = "PARTICIPANT_NOT_JOINED_ERROR"
}

type JoinRoomRequestDS = RequestDS & {
   // each chatId --> roomId
   chatId:string
   // userId --> participantId
   userId:string
}

type JoinRoomResponseDS = ResponseDS<{

},{
   errorType:JoinRoomErrorTypes
}>

export class JoinRoomAction implements Action<JoinRoomRequestDS, JoinRoomResponseDS>{

   chatDataAccess:ChatDataAccess
   roomManager:RoomManager
   participantManager:ParticipantManager

   constructor(
      chatDataAccess:ChatDataAccess,
      roomManager:RoomManager,
      participantManager:ParticipantManager
   ){
      this.chatDataAccess = chatDataAccess
      this.roomManager = roomManager
      this.participantManager = participantManager
   }

   async execute(req: JoinRoomRequestDS): Promise<JoinRoomResponseDS> {
       
      const chat = await this.chatDataAccess.getChatById(req.chatId)

      if(!chat){
         return {
            success:false,
            errorType:JoinRoomErrorTypes.DatabaseError
         }
      }

      const participant = this.participantManager.getParticipant(req.userId)

      if(!participant){
         return {
            success:false,
            errorType:JoinRoomErrorTypes.ParticipantNotFound
         }
      }

      let room:Room|null = null
      if(!this.roomManager.getRoom(req.chatId)){
         room = new Room(
            chat.id,
            chat.isGroupChat ? "group" : "private",
            participant.id
         )
         this.roomManager.addRoom(room)
         room = this.roomManager.getRoom(room.id)!
      }else{
         room = this.roomManager.getRoom(chat.id)!
      }
      RoomService.join(room, participant)

      return{
         success:true
      }
   }
}
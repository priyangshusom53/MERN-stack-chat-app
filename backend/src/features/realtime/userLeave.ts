import type { RequestDS, ResponseDS, Action } from "../action.js"
import type { ChatDataAccess } from "../dataAccess/chatDataAccess.js"
import { ParticipantManager } from "./participants.js"
import { RoomManager, RoomService } from "./rooms.js"

enum UserJoinErrorTypes{
   UserNotFound="USER_NOT_FOUND_ERROR",
   FailedToRemoveUser="FAILED_TO_REMOVE_USER_ERROR"
}

type UserLeaveRequestType = RequestDS & {
   userId:string
}

type UserLeaveResponseType = ResponseDS<{

},{
   errorType:UserJoinErrorTypes
}>

export class UserLeaveAction implements Action<UserLeaveRequestType, UserLeaveResponseType>{

   leaveRoomAction:LeaveRoomAction
   participantManager:ParticipantManager

   constructor(
      leaveRoomAction:LeaveRoomAction,
      participantManager:ParticipantManager
   ){
      this.leaveRoomAction = leaveRoomAction
      this.participantManager = participantManager
   }

   execute(req: UserLeaveRequestType):UserLeaveResponseType{

      const participant = this.participantManager.getParticipant(req.userId)

      if(!participant){
         return{
            success:false,
            errorType:UserJoinErrorTypes.UserNotFound
         }
      }

      const roomIds = Array.from(participant.joinedRooms)
      roomIds.forEach((roomId)=>{
         const requestDS:LeaveRoomRequestDS = {
            userId:req.userId,
            chatId:roomId
         }
         this.leaveRoomAction.execute(requestDS)
      })

      this.participantManager.removeParticipant(participant.id)

      return{
         success:true
      }
   }
}


enum LeaveRoomErroTypes{
   RoomNotAvailable = "ROOM_NOT_AVAILABLE_ERROR",
   ParticipantNotFound = "PARTICIPANT_NOT_FOUND_ERROR"
}

type LeaveRoomRequestDS = RequestDS & {
   chatId:string
   userId:string
}

type LeaveRoomResponseDS = ResponseDS<{

},{
   errorType:LeaveRoomErroTypes
}>

export class LeaveRoomAction implements Action<LeaveRoomRequestDS, LeaveRoomResponseDS>{

   roomManager:RoomManager
   participantManager:ParticipantManager

   constructor(
      roomManager:RoomManager,
      participantManager:ParticipantManager
   ){
      this.roomManager = roomManager
      this.participantManager = participantManager
   }

   execute(req: LeaveRoomRequestDS): LeaveRoomResponseDS {

      const participant = this.participantManager.getParticipant(req.userId)

      if(!participant){
         return {
            success:false,
            errorType:LeaveRoomErroTypes.ParticipantNotFound
         }
      }

      const room = this.roomManager.getRoom(req.chatId)

      if(!room){
         return{
            success:false,
            errorType:LeaveRoomErroTypes.RoomNotAvailable
         }
      }

      RoomService.leave(room, participant)
      this.roomManager.deleteRoom(room.id)

      return{
         success:true
      }
   }
}
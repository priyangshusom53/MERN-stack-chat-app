import { createSlice } from "@reduxjs/toolkit";

const currentChatsSlice = createSlice({
   name: 'currentChats',
   initialState: { list: [] },
   reducers: {
      setCurrentChats(state, action) {
         state.list = action.payload
      },
      addToCurrentChats(state, action) {
         state.list = [action.payload, ...state.list]
      },
      updateLatestChat(state, action) {
         const chats = state.list
         const latest = chats.find(chat => {
            return chat.email === action.payload.email
         })
         latest.lastMessage = action.payload.lastMessage
         const rest = chats.filter(chat => {
            return chat.email !== action.payload.email
         })
         state.list = [latest, ...rest]
      }
   }
})

export const { setCurrentChats, addToCurrentChats, updateLatestChat } = currentChatsSlice.actions;
export default currentChatsSlice.reducer;
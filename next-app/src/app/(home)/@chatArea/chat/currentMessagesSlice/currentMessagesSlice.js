import { createSlice } from "@reduxjs/toolkit";

const currentMessagesSlice = createSlice({
   name: 'currentMessages',
   initialState: { messages: [] },
   reducers: {
      setCurrentMessages(state, action) {
         state.messages = action.payload
      },
      addMessage(state, action) {
         state.messages.push(action.payload)
      },
   }
})

export const { setCurrentMessages, addMessage } = currentMessagesSlice.actions
export default currentMessagesSlice.reducer
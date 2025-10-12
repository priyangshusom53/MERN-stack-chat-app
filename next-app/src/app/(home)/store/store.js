import { configureStore } from "@reduxjs/toolkit";

import authUserReducer from '../authUserSlice/authUserSlice.js'
import contactUserReducer from '../@sidebar/@contacts/contactUserSlice/contactUserSlice.js'
import socketStatusReducer from '../socketStatusSlice/socketStatusSlice.js'
import currentMessageReducer from '../@chatArea/chat/currentMessagesSlice/currentMessagesSlice.js'
import contactsReducer from '../@sidebar/@contacts/contactsSlice/contactsSlice.js'
import currentChatsReducer from '../@sidebar/@contacts/currentChatsSlice/currentChatsSlice.js'

export const store = configureStore({
   reducer: {
      authUser: authUserReducer,
      contactUser: contactUserReducer,
      socketStatus: socketStatusReducer,
      currentMessages: currentMessageReducer,
      contacts: contactsReducer,
      currentChats: currentChatsReducer
   }
})
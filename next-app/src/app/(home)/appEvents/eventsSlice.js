import { createSlice } from "@reduxjs/toolkit";

const eventsSlice = createSlice({
   name: 'appEvents',
   initialState: { name: '', data: null },
   reducers: {
      publishEvent(state, action) {
         state.name = action.payload.name
         state.data = action.payload.data
      },
      consumeEvent(state) {
         state.name = ''
         state.data = null
      }
   }
})

export const { publishEvent, consumeEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
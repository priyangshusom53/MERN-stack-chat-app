import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const socketStatusSlice = createSlice({
   name: 'socketStatus',
   initialState: { status: 'not connected' },
   reducers: {
      setSocketStatus(state, action) {
         state.status = action.payload
      }
   }
})

export const { setSocketStatus } = socketStatusSlice.actions
export default socketStatusSlice.reducer
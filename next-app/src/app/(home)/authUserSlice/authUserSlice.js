import { createSlice } from "@reduxjs/toolkit";

const authUserSlice = createSlice({
   name: 'authUser',
   initialState: { email: '' },
   reducers: {
      setAuthUser(state, action) {
         state.email = action.payload
      },
   }
})

export const { setAuthUser } = authUserSlice.actions;
export default authUserSlice.reducer;
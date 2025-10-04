import { createSlice } from "@reduxjs/toolkit";

const contactUserSlice = createSlice({
   name: 'contactUser',
   initialState: { email: '' },
   reducers: {
      setContactUser(state, action) {
         state.email = action.payload
      },
   }
})

export const { setContactUser } = contactUserSlice.actions;
export default contactUserSlice.reducer;
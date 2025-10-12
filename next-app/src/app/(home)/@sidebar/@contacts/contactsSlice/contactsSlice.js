import { createSlice } from "@reduxjs/toolkit";

const contactsSlice = createSlice({
   name: 'contacts',
   initialState: { list: [] },
   reducers: {
      setContactList(state, action) {
         state.list = action.payload
      },
      addToContactList(state, action) {
         state.list.push(action.payload)
      }
   }
})

export const { setContactList, addToContactList } = contactsSlice.actions;
export default contactsSlice.reducer;
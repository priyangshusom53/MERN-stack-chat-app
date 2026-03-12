import { createSlice } from "@reduxjs/toolkit";

interface AuthState{
   user: {
      id:string,
      name:string,
      email:string
   } | null ;
   isLoading:boolean;
}

const initialState:AuthState = {
   user:null,
   isLoading:true
}

export const authUserSlice = createSlice({
   name:"authUser",
   initialState,
   reducers:{

   }
})

export default authUserSlice.reducer
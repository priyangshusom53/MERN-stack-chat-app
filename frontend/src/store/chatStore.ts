import type { Chat } from "../models/chat";
import {create} from 'zustand'
import { useAuthStore } from "./authStore.js";

export interface ChatStore{
   chats:Chat[];
   fetchChats:()=>Promise<void>;
   isChatsLoading:Boolean;
}

export const useChatStore = create<ChatStore>((set, get)=>({

   chats:[],
   isChatsLoading:true,
   async fetchChats(){

      set({isChatsLoading:true})
      try{
         const meId = useAuthStore.getState().user?.id
         const url="http://localhost:5001/chat"
         const res = await fetch(url,{
            method:"GET",
            headers:{
               "Content-Type":"application/json"
            },
            credentials:"include"
         })

         if(!res.ok){
            set({chats:[]})
            set({isChatsLoading:false})
            return
         }
         
         const body = await res.json()
         const chats = body.chats.map((chat)=>{
            return{
               id:chat.id,
               name:chat.participants.filter((id)=>(id!==meId))[0],
               isGroupChat:false,
               participants:chat.participants
            } as Chat
         })
         set({
            chats:chats,
            isChatsLoading:false
         })

         console.log(get().chats)
      }catch(err){
         console.error(err)
      }
   }
}))

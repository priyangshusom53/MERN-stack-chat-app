"use client"

import { Contact } from "@/components/ui/contact"
import { useAuth } from "@/context/authContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuthStore } from "@/state/authStore"

const ChatSidebar = ()=>{

   return(
      <div className="flex flex-col items-center w-1/3 min-w-64 h-[100%] py-4 bg-blue-800 p-4 overflow-y-auto gap-4">
         <Contact contactName={"Contact name"} lastMessage={"Last message"} />
         <Contact contactName={"Another contact"} lastMessage={"Another message"} />
         <Contact contactName={"Yet another contact"} lastMessage={"Yet another message"} />
         <Contact contactName={"One more contact"} lastMessage={"One more message"} />
         <Contact contactName={"Final contact"} lastMessage={"Final message"} />
         <Contact contactName={"Last but not least"} lastMessage={"Last message"} />
         <Contact contactName={"Unnamed contact"} lastMessage={"Unnamed message"} />
         <Contact contactName={"Another unnamed contact"} lastMessage={"Another unnamed message"} />
         <Contact contactName={"Yet another unnamed contact"} lastMessage={"Yet another unnamed message"} />
         <Contact contactName={"One more unnamed contact"} lastMessage={"One more unnamed message"} />
      </div>
   )
}


export const ChatPage = ()=>{
   
   const router = useRouter()

   const { user, isLoading, checkUser } = useAuthStore()

   useEffect(()=>{
      checkUser()
   }, [])

   useEffect(()=>{
      if(!isLoading && user===null){
         router.replace("/login")
      }
   },[isLoading, user])

   return(
      <>
         <div className="chat-page-container flex flex-col h-screen w-screen">
               {/* Chat sidebar */}
               <ChatSidebar />
               {/* Chat messages */}
         </div>
      </>
   )
}


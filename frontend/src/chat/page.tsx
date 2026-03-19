import { Sidebar } from "./sidebar.js"
import { MessageWindow } from "./messages.js"
import { useAuthStore } from "../store/authStore.js"
import { useEffect } from "react"
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { useChatStore } from "../store/chatStore.js"
import { ChatPreview } from "./chat.js"

export const ChatPage = () => {

   const { user, isLoading } = useAuthStore()
   const navigate = useNavigate()

  useEffect(()=>{ 
      console.log(user)
      console.log(isLoading)
      if (!isLoading && !user) {
         navigate("/login")
      }
  },[user, isLoading])
   
  const dchats = [
    {
      id: "1",
      name: "Alice",
      time: new Date(),
      lastMessage: "Hello"
    },
    {
      id: "2",
      name: "Bob",
      time: new Date(),
      lastMessage: "Hey"
    }
  ]

  const { isChatsLoading, chats, fetchChats} = useChatStore()
  useEffect(()=>{
      fetchChats()
  },[fetchChats])

  let chatPreviws:ChatPreview[] = dchats
  if(!isChatsLoading && chats){
      chatPreviws = chats.map((chat)=>{
         return{
            id:chat.id,
            name:chat.name,
            time:new Date,
         } as ChatPreview
      })
  }

  return (
    <div className="flex h-svh w-svw bg-black">

      {/* Sidebar */}
      <Sidebar chats={chatPreviws} />

      {/* Chat area */}
      <div className="flex flex-col flex-1">

        <Outlet />

      </div>

    </div>
  )
}
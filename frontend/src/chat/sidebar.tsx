import { Input } from "@chakra-ui/react"
import { useState } from "react"
import { ChatItem } from "./chat";
import { NavLink } from "react-router-dom";

export function SidebarHeader({
  inputValue,
  setInputValue
}: {
  inputValue: string
  setInputValue: (v: string) => void
}){

   return(
      <>
         <div className="flex items-center justify-center p-2 w-full h-4">
         <Input 
            placeholder="Search Contacts" 
            value={inputValue}
            onChange={(e)=>{setInputValue(e.target.value)}}
         />
         </div>
      </>
   )
}


import type { ChatPreview } from "./chat";
export function SidebarBody(
   { chats }:
   { chats:ChatPreview[] }
){

   const sortedChats = [...chats].sort(
      (a, b) => b.time.getTime() - a.time.getTime()
   )

   return(
      <>
         <div className="flex flex-col h-full w-full p-2 gap-2">
            {sortedChats.map((chat) => (
               <NavLink key={chat.id} to={`/chat/${chat.id}/messages`}>
                  <ChatItem
                     avatar={chat.avatarUrl || ""}
                     name={chat.name}
                     lastMessage={chat.lastMessage || ""}
                     time={chat.time.toLocaleTimeString()}
                  />
               </NavLink>
            ))}
         </div>
      </>
   )
}

import { Menu, Button, Portal } from "@chakra-ui/react"

export function AddChat({ onClose }:{ onClose:()=>void }){

   const [chatEmail, setChatEmail] = useState("")
   const [loading, setLoading] = useState(false)

   async function createChat(){

      if(!chatEmail.trim()) return

      setLoading(true)

      try{

         const res = await fetch(
            "http://localhost:5001/chat/private",
            {
               method:"POST",
               credentials:"include",
               headers:{
                  "Content-Type":"application/json"
               },
               body:JSON.stringify({
                  email:chatEmail
               })
            }
         )

         const data = await res.json()

         if(data.success){
            window.location.href =
               `/chat/${data.chat.id}/messages`
         }else{
            alert(data.error)
         }

      }catch(err){
         console.error(err)
      }

      setLoading(false)
      setChatEmail("")
      onClose()
   }

   return(
      <Box
         className="text-white"
         position="absolute"
         bottom="60px"
         left="10px"
         bg="black"
         p="3"
         borderRadius="md"
         shadow="lg"
         display="flex"
         gap="2"
      >

         <Input
            placeholder="Enter email"
            value={chatEmail}
            onChange={(e)=>setChatEmail(e.target.value)}
            onKeyDown={(e)=>{
               if(e.key === "Enter"){
                  createChat()
               }
            }}
         />

         <Button
            onClick={createChat}
            loading={loading}
         >
            Add
         </Button>

      </Box>
   )
}

export function SidebarFooter(){

   const [showAddChat, setShowAddChat] = useState(false)

   return(
      <Box
         className="footer-container flex"
         w="full"
         alignSelf="end"
      >

         <Menu.Root>

            <Menu.Trigger asChild>
               <Button
                  variant="outline"
                  size="sm"
                  w="full"
               >
                  Options
               </Button>
            </Menu.Trigger>

            <Portal>

               <Menu.Positioner>
                  <Menu.Content>

                     <Menu.Item
                        value="add-chat"
                        onClick={() => setShowAddChat(true)}
                     >
                        Add Chat
                     </Menu.Item>

                     <Menu.Item value="logout">
                        Logout
                     </Menu.Item>

                  </Menu.Content>
               </Menu.Positioner>

            </Portal>

         </Menu.Root>

         {showAddChat && (
            <AddChat
               onClose={() => setShowAddChat(false)}
            />
         )}

      </Box>
   )
}

import { Container, Box } from "@chakra-ui/react"
export function Sidebar({ chats }: { chats: ChatPreview[] }){

   const [inputValue, setInputValue] = useState("")

   const filteredChats = chats.filter((chat) =>
      chat.name.toLowerCase().includes(inputValue.toLowerCase())
   )

   return(
      <>
      <Box className="sidebar-container bg-blue-800 flex flex-col w-1/3 min-w-64 h-screen overflow-y-auto"
         px={"2"}
         py={"8"}
         pb={"2"}
         gapY={"6"}
      >
         <SidebarHeader
            inputValue={inputValue}
            setInputValue={setInputValue}
         />
         <SidebarBody chats={filteredChats} />
         <SidebarFooter/>
      </Box>
      </>
   )
}
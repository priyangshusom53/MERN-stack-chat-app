
export function MessageBubble({
   message,
   isOwn,
   senderName,
   isGroupChat
}: {
  senderName: string
  message: {
    text: string
    time: Date
  }
  isOwn: boolean
  isGroupChat: boolean
}) {

  return (
    <Box className={`flex w-full ${isOwn ? "justify-end" : "justify-start"}`}>
      <Box
        className={`
          px-3 py-2 rounded-lg text-sm
          ${isOwn ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}
        `}
        maxW={"[70%]"}
        px={"3"}
        py={"2"}
      >
         {
            isGroupChat && !isOwn && (
               <Box className="align-left text-xs font-bold mb-1">
                  {senderName}
               </Box>
            )
         }
         <Box className="flex w-auto">
            {message.text}
         </Box>

        {/* <div className="text-[10px] opacity-70 text-right">
          {message.time.toLocaleTimeString()}
        </div> */}
      </Box>
    </Box>
  )
}

export function MessageArea({
  messages,
  currentUserId
}: {
  messages:Message[]
  currentUserId: string
}) {

  return (
    <div className="flex flex-col gap-2 overflow-y-auto p-3 flex-1">

      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          message={{text:msg.text, time:msg.timestamp}}
          isOwn={msg.senderId === currentUserId}
          senderName={msg.senderName}
          isGroupChat={msg.isGroupChat}
        />
      ))}

    </div>
  )
}

import { Box, Input } from "@chakra-ui/react"
import { useState } from "react"

export function MessageInput({
  onSend
}: {
  onSend: (text: string) => void
}) {

  const [text, setText] = useState("")

  function handleSend() {
    if (!text.trim()) return

    onSend(text)
    setText("")
  }

  return (
    <div className="flex gap-2 p-2 border-t">

      <Input
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSend()
        }}
      />
      <Box className="flex items-center hover:bg-blue-500 active:bg-blue-600 rounded"
         p={"2"}
      >
         <button
         onClick={handleSend}
         className="px-4 py-2 bg-blue-500 text-white rounded"
         >
         Send
         </button>
      </Box>

    </div>
  )
}

import { Container } from "@chakra-ui/react"
import { Message } from "../models/message"
export function MessageWindow() {

   const messages = [
    {
      id: "1",
      senderId: "1",
      text: "Hello",
      time: new Date(),
      isGroupChat:false,
      senderName:"BOB"
    },
    {
      id: "2",
      senderId: "2",
      text: "Hi there",
      time: new Date(),
      isGroupChat:false,
      senderName:"BOB"
    }
  ]

  async function onSend(){}

  return (
   <Box className="flex flex-2 flex-col h-full w-full"
      py={"2"}
      px={"2"}
   >

      {/* Message list */}
      <MessageArea
        messages={messages}
        currentUserId={"1"}
      />

      {/* Message input */}
      <MessageInput onSend={onSend} />

    </Box>
  )
}
'use client';


import { cn } from "@/lib/utils.js"
import { displayStyles } from "@/app/_components/styles.js"
import ChatBubble from '@/app/_components/chatbubble.js'

import { setCurrentMessages, addMessage } from "./currentMessagesSlice/currentMessagesSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useClientContext } from "../../client.js";

export const MessageManager = ({ messages, getMessagesAction }) => {

   const dispatch = useDispatch()
   const [isLoading, setIsLoading] = useState(false)
   const { socket } = useClientContext()
   const { socketStatus } = useClientContext()

   const authUser = useSelector((state) => state.authUser.email)
   const contactUser = useSelector((state) => state.contactUser.email)

   // this effect runs when socketStatus changes to 'connected' 
   // to register the message event handler
   useEffect(() => {

      dispatch(setCurrentMessages(messages))

      if (socketStatus === 'connected') {
         socket.on('message', (text, from, to) => {
            console.log(text)
            let type = 'received'
            if (from === authUser) type = 'sent'
            const message = { content: text, type, timestamp: new Date(Date.now()).toString() }
            dispatch(addMessage(message))
         })
      }
   }, [socketStatus])


   // this effect runs when 'contactUser' state changes to fetch 
   // the message of this selected 'contactUser'

   // Update: now this effect runs when parent server component 
   // sends new 'messages' data and it sets them in redux store, 
   // this does not use 'getMessagesAction' to fetch new messages
   useEffect(() => {
      const fetchMessages = async () => {
         try {
            setIsLoading(true)
            const res = await getMessagesAction(contactUser)
            if (res.status === 'success') {
               dispatch(setCurrentMessages(res.data))
            }
         } catch (err) {
            console.error('Error in fetching messages: ', err.message)
         } finally {
            setIsLoading(false)
         }
      }
      if (contactUser !== '') {
         dispatch(setCurrentMessages(messages))
      }
   }, [messages])

   const currentMessages = useSelector((state) => state.currentMessages.messages)

   const messagesEndRef = useRef(null);
   useEffect(() => {
      // Scroll to bottom whenever messages change
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
   }, [currentMessages]);

   return (
      isLoading ?
         (<>
            <div className="flex-1 w-full">

            </div>
         </>) :
         (<div className={cn(`flex-1 w-full px-4 ${displayStyles.flex_col_center} justify-start overflow-auto scrollbar-style  items-center`)}>
            <div className={cn(`place-self-end mt-auto py-4 pb-0 ${displayStyles.flex_col_center} w-full justify-end max-w-[40rem] mx-auto gap-[length:var(--size-h4)] `)}>
               {currentMessages?.map((message, idx) => {
                  // console.log(message.type)
                  return <ChatBubble type={message.type} message={message.content} key={idx} />
               })}
               <div ref={messagesEndRef} />
            </div>
         </div>)
   )
}
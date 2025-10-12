'use client';


import { cn } from "@/lib/utils.js"
import { displayStyles } from "@/app/_components/styles.js"
import ChatBubble from '@/app/_components/chatbubble.js'

import { setCurrentMessages, addMessage } from "./currentMessagesSlice/currentMessagesSlice.js";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useClientContext } from "../../client.js";
import { setContactUser } from "../../@sidebar/@contacts/contactUserSlice/contactUserSlice.js";

import { appEvents, publishEvent } from "../../appEvents/events.js";

export const MessageManager = ({ messages, contactUserEmail, getMessagesAction }) => {

   const dispatch = useDispatch()
   const [isLoading, setIsLoading] = useState(false)
   const { socket } = useClientContext()
   const { socketStatus } = useClientContext()

   const authUser = useSelector((state) => state.authUser.email)
   const contactUser = useSelector((state) => state.contactUser.email)

   const currentChats = useSelector((state) => state.currentChats.list)

   // this effect runs when socketStatus changes to 'connected' 
   // to register the message event handler
   useEffect(() => {

      dispatch(setContactUser(contactUserEmail))
      dispatch(setCurrentMessages(messages))

      if (socketStatus === 'connected') {
         console.warn('message event received by MessageManager')
         socket.on('message', (message) => {
            let type = 'received'
            if (message.senderEmail === authUser) type = 'sent'
            const _message = {
               _id: message._id,
               content: message.content,
               type,
               timestamp: message.timestamp
            }
            console.log(message)
            console.log(currentChats)
            // check if message sender or receiver exist in currentChats, if not publish 'addContact' event
            const chatExist = currentChats.some((current) => {
               if (_message.type === 'sent')
                  return current.email === message.receiverEmail
               if (_message.type === 'received')
                  return current.email === message.senderEmail
            })
            console.log('chatExist: ', chatExist)
            if (!chatExist) {
               publishEvent('contactManager', {
                  name: appEvents.addChat, detail: {
                     contact: (_message.type === 'sent') ? message.receiverEmail : message.senderEmail
                  }
               })
               console.warn('addChatEvent')
            } else {
               publishEvent('contactManager', { name: appEvents.updateChat, detail: { contact: (_message.type === 'sent') ? message.receiverEmail : message.senderEmail } })
               console.warn('updateChatEvent')
            }
            // add this message to currentMessages only when sender or receiver is contactUser
            console.log(contactUser)
            if (contactUser === message.senderEmail || contactUser === message.receiverEmail) {
               console.log('message added to currentMessages')
               dispatch(addMessage(_message))
            }

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
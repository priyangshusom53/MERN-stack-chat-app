import { isUserValidAction } from "../../../server/validateUser.js"

import { cn } from "@/lib/utils.js"
import { displayStyles } from "@/app/_components/styles.js"
import ChatBubble from '@/app/_components/chatbubble.js'

import { MessageManager } from "./messageManager.js"

export default async function ChatMessages({ searchParams }) {

   let messages = null
   try {
      const thisUser = await isUserValidAction()
      if (thisUser !== false) {
         const { user: contactUser } = await searchParams
         if (contactUser !== null) {
            const res = await fetch("http://localhost:8000/message/messages", {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ senderEmail: thisUser.user.email, receiverEmail: contactUser }),
               cache: 'no-store'
            })
            if (res.ok) {
               const data = await res.json()
               messages = data.data
            }
         }
      }
   } catch (err) {
      console.error('Error in @chatArea/chat: ', err.message)
   }

   // server action to fetch messages from client
   const getMessagesAction = async (contactUser) => {
      'use server';
      let messages = null
      try {
         const authUser = await isUserValidAction()
         if (authUser !== false) {
            if (contactUser !== null) {
               const res = await fetch("http://localhost:8000/message/messages", {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ senderEmail: authUser.user.email, receiverEmail: contactUser }),
                  cache: 'no-store'
               })
               if (res.ok) {
                  const data = await res.json()
                  messages = data.data
                  return { status: 'success', data: messages }
               }
            }
         }
      } catch (err) {
         console.error('Error in @chatArea/chat: ', err.message)
         return { status: 'failed' }
      }
   }

   return (
      <>
         <MessageManager messages={messages} getMessagesAction={getMessagesAction} />
      </>
   )

}
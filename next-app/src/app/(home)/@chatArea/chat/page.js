import { isUserValidAction } from "../../../server/validateUser.js"

import { cn } from "@/lib/utils.js"
import { displayStyles } from "@/app/_components/styles.js"
import ChatBubble from '@/app/_components/chatbubble.js'

import { MessageManager } from "./messageManager.js"
import { cookies } from "next/headers.js"

export default async function ChatMessages({ searchParams }) {

   let messages = null
   let contactUser = null
   try {
      const thisUser = await isUserValidAction()
      const cookieStore = await cookies()
      const cookieHeader = cookieStore.toString()
      if (thisUser !== false) {
         const { user } = await searchParams
         contactUser = user
         console.log('@chatArea/chat page running')
         console.log(contactUser)
         if (contactUser !== null) {
            const res = await fetch(`http://localhost:8000/api/v1/contacts/${contactUser}/messages`, {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json',
                  'Cookie': cookieHeader
               },
               cache: 'no-store'
            })
            if (res.ok) {
               const body = await res.json()
               messages = body.data
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
         const cookieStore = await cookies()
         const cookieHeader = cookieStore.toString()
         if (authUser !== false) {
            if (contactUser !== null) {
               const res = await fetch(`http://localhost:8000/api/v1/contacts/${contactUser}/messages`, {
                  method: 'GET',
                  headers: {
                     'Content-Type': 'application/json',
                     'Cookie': cookieHeader
                  },
                  cache: 'no-store'
               })
               if (res.ok) {
                  const body = await res.json()
                  messages = body.data
                  return { status: 'success', data: messages }
               }
            }
         }
      } catch (err) {
         console.error('Error in @chatArea/chat: ', err.message)
         return { status: 'failed', data: null }
      }
   }

   return (
      <>
         <MessageManager messages={messages} contactUserEmail={contactUser} getMessagesAction={getMessagesAction} />
      </>
   )

}
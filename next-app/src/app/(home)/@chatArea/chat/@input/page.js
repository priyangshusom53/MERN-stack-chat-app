import { InputSection } from "@/app/_components/chatinput.js"

import { cn } from "@/lib/utils"
import { displayStyles } from "@/app/_components/styles.js"


// check user status and fetch user
import { isUserValidAction } from "@/app/server/validateUser.js"
import { cookies } from "next/headers"

export default async function Input({ searchParams }) {

   const authUser = await isUserValidAction()
   const { user: contactUserEmail } = await searchParams

   async function onSendAction(text) {
      'use server';

      let contactEmail = null
      const message = text
      console.log(`----onSend Action----`)

      try {
         const cookieStore = await cookies()
         const cookieHeader = cookieStore.toString()
         //const sessionId = cookieStore.get('sessionId')
         if (cookieHeader) {
            // fetch contact data
            const { user: contactUserEmail } = await searchParams
            if (contactUserEmail) {
               contactEmail = contactUserEmail
            }
            if (contactEmail) {
               console.log(`onSend Action: sending message:'${message}' to backend`)
               const res = await fetch(`http://localhost:8000/api/v1/contacts/${contactEmail}/message`, {
                  method: 'POST',
                  headers: {
                     'Content-Type': 'application/json',
                     'Cookie': cookieHeader
                  },
                  body: JSON.stringify({
                     text: message
                  }),
                  cache: 'no-store'
               })
               const body = await res.json()
               if (res.ok) {
                  return body
               }
               return body
            }
         }
      } catch (err) {
         console.error('Error in @input/page.js in onSend Action: ', err.message)
      }

   }

   return (
      <div className="w-full sticky bottom-0 left-0 px-4  flex justify-center items-center">

         <div className={cn(`flex-1 mt-auto ${displayStyles.flex_row_center} items-stretch h-[48px] max-w-[40rem] mx-auto `)}>
            <InputSection onSend={onSendAction} />
         </div>
      </div>
   )
}
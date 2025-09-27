import { InputSection } from "@/app/_components/chatarea.js"

import { cn } from "@/lib/utils"
import { displayStyles } from "@/app/_components/styles.js"


// check user status and fetch user
import { isUserValidAction } from "@/app/server/validateUser.js"

export default async function Input({ searchParams }) {

   const thisUser = await isUserValidAction()

   async function onSendAction(text) {
      'use server';

      let contactName = null
      let contactEmail = null

      console.log(`----onSend Action----`)
      try {
         if (thisUser !== false) {
            // fetch contact data
            const { user: contactUserEmail } = await searchParams
            if (contactUserEmail !== null) {
               const res = await fetch(`http://localhost:8000/message/get-user/${contactUserEmail}`, {
                  method: 'GET',
                  headers: { 'Content-Type': 'application/json' },
                  cache: 'no-store'
               })
               if (res.ok) {
                  const data = await res.json()
                  contactName = data.name
                  contactEmail = data.email
               }
            }
            if (contactEmail && contactName) {
               console.log(`onSend Action: sending message:'${text}' to backend`)
               const res = await fetch('http://localhost:8000/message/send-message', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ senderEmail: thisUser.user.email, receiverEmail: contactEmail, messageContent: text }),
                  cache: 'no-store'
               })
               const data = await res.json()
            }
         }
      } catch (err) {
         console.log('Error in @input/page.js in onSend Action: ', err.message)
      }

   }

   return (
      <div className="w-full sticky bottom-0 left-0 px-4  flex justify-center items-center">

         <div className={cn(`flex-1 mt-auto ${displayStyles.flex_row_center} items-stretch max-w-[40rem] mx-auto `)}>
            <InputSection onSend={onSendAction} />
         </div>
      </div>
   )
}
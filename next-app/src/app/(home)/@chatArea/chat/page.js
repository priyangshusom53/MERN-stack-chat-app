import { isUserValidAction } from "../../../server/validateUser.js"

import { cn } from "@/lib/utils.js"
import { displayStyles } from "@/app/_components/styles.js"
import ChatBubble from '@/app/_components/chatbubble.js'

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
      console.log(err.message)
   }
   return (
      <div className={cn(`flex-1 w-full px-4 ${displayStyles.flex_col_center} justify-start overflow-auto scrollbar-style  items-center`)}>
         <div className={cn(`place-self-end mt-auto py-4 ${displayStyles.flex_col_center} w-full justify-end max-w-[40rem] mx-auto gap-[length:var(--size-h4)] `)}>
            {messages?.map((message, idx) => {
               return <ChatBubble type={message.type} message={message.content} key={idx} />
            })}
         </div>
      </div>
   )

}
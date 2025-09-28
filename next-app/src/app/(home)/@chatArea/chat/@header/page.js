import { isUserValidAction } from "@/app/server/validateUser.js"


import { ContactHeader } from "@/app/_components/chatarea.js"

import { cn } from "@/lib/utils"
import { interaction_color, displayStyles } from "@/app/_components/styles.js"


// placeholder
import contactImage from '@/../public/contact-avatar.svg'

export default async function Header({ searchParams }) {
   let contactName = null
   let contactEmail = null

   const thisUser = await isUserValidAction()
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
      }
   } catch (err) {
      console.log(err.message)
   }

   return (
      <div className={`w-[100%] h-[48px] sticky top-0 left-0 pl-[24px] flex flex-row justify-start items-center ${interaction_color(false, true)} border-b-[0.5px]`}>
         <ContactHeader
            contactImage={contactImage}
            contactName={contactName}
            contactId={contactEmail}
         />
      </div>
   )
}
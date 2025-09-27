import { isUserValidAction } from "../../../server/validateUser.js"


import { cn } from "@/lib/utils"
import { interaction_color, displayStyles } from "@/app/_components/styles.js"
import { ContactHeader, InputSection } from "@/app/_components/chatarea.js"

// placeholder
import contactImage from '@/../public/contact-avatar.svg'

export default async function ChatSectionLayout({ header, children, input }) {



   return (
      <div className="relative w-full h-full flex flex-col justify-center items-center">
         {/* Chat header */}
         {header}
         {/* Messages */}
         {children}
         {/* input section */}
         {input}
      </div>
   )
}
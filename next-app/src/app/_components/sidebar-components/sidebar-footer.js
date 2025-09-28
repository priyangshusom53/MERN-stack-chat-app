import Image from "next/image";
import { Collapsible } from "./sidebar"
import { cn } from "@/lib/utils"

export function SidebarFooter({ icononly, children, className }) {
   return (<>
      <div className={cn(`sidebar-footer sticky inset-y-full left-0 shrink-0 w-full flex flex-row justify-start items-center`, className)}>
         <Collapsible
            icononly={icononly}
         >
            {children}
         </Collapsible>
      </div>
   </>)

}
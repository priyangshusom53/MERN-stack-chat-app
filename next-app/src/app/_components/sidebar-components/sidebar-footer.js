import Image from "next/image";
import { Collapsible } from "./sidebar"
import { cn } from "@/lib/utils"

export function SidebarFooter({ icononly, children, className }) {
   return (<>
      <div className={cn(`sticky bottom-0 left-0 flex flex-row items-center`, className)}>
         <Collapsible
            icononly={icononly}
         >
            {children}
         </Collapsible>
      </div>
   </>)

}
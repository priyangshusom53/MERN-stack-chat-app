import { SidebarTrigger } from "@/components/ui/sidebar"
import { Collapsible } from "./sidebar"
import { cn } from "@/lib/utils"

export function SidebarHeader({ icononly, className, children }) {
   return (<>
      <div className={cn(`sticky top-0 left-0 flex flex-row justify-start items-center w-full`, className)}>
         <Collapsible
            icononly={icononly}
         >
            {children}
         </Collapsible>
      </div>
   </>)
}
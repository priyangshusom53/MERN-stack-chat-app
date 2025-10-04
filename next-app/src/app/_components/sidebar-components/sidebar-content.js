import ContactCard from '../contactcard.js'
import contactImg from '@/../public/contact-avatar.svg'
import { cn } from '@/lib/utils.js'

export function SideBarContent({
   className,
   children,
}) {
   return (<>
      <div className={cn('sidebar-content w-full h-full shrink grow-0 flex-1 overflow-auto scrollbar-style flex flex-col justify-start items-center group-data-[state=collapsed]:[display:none]', className)}>
         {children}
      </div>
   </>)
}


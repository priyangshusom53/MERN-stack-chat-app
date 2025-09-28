import ContactCard from '../contactcard.js'
import contactImg from '@/../public/contact-avatar.svg'
import { cn } from '@/lib/utils.js'

export function SideBarContent({
   className,
   children,
}) {
   return (<>
      <div className={cn('sidebar-content w-full flex-1 scrollbar-style flex flex-col overflow-auto group-data-[state=collapsed]:[display:none]', className)}>
         {children}
      </div>
   </>)
}


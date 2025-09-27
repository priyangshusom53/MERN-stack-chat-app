import { SidebarHeader } from "../../_components/sidebar-components/sidebar-header.js"
import { SidebarMenu } from '../../_components/sidebar-components/sidebar-menu.js'
import { SidebarTrigger } from "../../_components/sidebar-components/sidebar.js"
import { SquarePen } from "lucide-react"

export default function Sidebar() {
   return (
      <>
         <SidebarHeader className={'mr-auto justify-center'}
            icononly={<SidebarTrigger className={`w-8 h-8 aspect-square rounded-xs hover:bg-gray-200 flex justify-center items-center group`} />}
         />
         <SidebarMenu
            icononly={
               <div className='w-8 h-8 aspect-square flex justify-center items-center rounded-xs'><SquarePen className='w-[length:calc(2*16*0.8)] h-[length:calc(2*16*0.8)] shrink-0' /></div>}
         >
            <div className='leading-4'>Edit Icon</div>
         </SidebarMenu>
      </>
   )
}
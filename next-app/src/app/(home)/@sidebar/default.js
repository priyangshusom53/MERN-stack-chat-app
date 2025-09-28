import { SidebarHeader } from "../../_components/sidebar-components/sidebar-header.js"
import { SidebarMenu } from '../../_components/sidebar-components/sidebar-menu.js'
import { SidebarTrigger } from "../../_components/sidebar-components/sidebar.js"
import { SquarePen } from "lucide-react"


//styles
import { textStyles } from "@/app/_components/styles.js"
export default function Sidebar() {
   return (
      <>
         <SidebarHeader className={''}
            icononly={<SidebarTrigger className={`aspect-square rounded-[8px] flex justify-center items-center group`} />}
         />
         <SidebarMenu
            icononly={
               <div className='size-[30px] aspect-square flex justify-center items-center rounded-[8px]'>
                  <SquarePen className='size-[20px] shrink-0' />
               </div>}
            className={`${textStyles.text_secondary} text-foreground h-[30px] rounded-[8px]`}
         >
            <div className={`${textStyles.text_secondary}`}>Add Contact</div>
         </SidebarMenu>
      </>
   )
}
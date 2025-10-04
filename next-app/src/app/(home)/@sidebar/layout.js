import { Sidebar } from '@/app/_components/sidebar-components/sidebar.js'
import { SideBarContent } from '@/app/_components/sidebar-components/sidebar-content.js'
import { SidebarFooter } from '../../_components/sidebar-components/sidebar-footer.js'
import { SidebarMenu } from '@/app/_components/sidebar-components/sidebar-menu.js'
import Image from "next/image";


import { bg_fg_color, displayStyles, interaction_color, Styles } from '../../_components/styles.js'

// placeholder
import contactImage from '@/../public/contact-avatar.svg'
export default function SidebarLayout({
   children,
   contacts
}) {

   const styles = new Styles()

   return (
      <div className='w-auto h-full flex flex-col justify-between items-center border-r-[0.5px] '>
         <Sidebar position={'vertical'} expandedWidth={'240px'} className={' h-full w-full px-[9px] pt-[6px] pb-[16px] justify-start'}>
            {children}
            <SideBarContent className={'relative w-[100%]'}>
               {contacts}
            </SideBarContent>
            <SidebarFooter
               icononly={
                  <div className={`w-full h-[30px] ${displayStyles.flex_row_start_center} ${bg_fg_color()} ${interaction_color(false, true)} rounded-[8px]`}>
                     <div className={`w-[30px] h-[30px] ${displayStyles.flex_row_center} bg-transparent rounded-[8px]`}>
                        <Image
                           src={contactImage}
                           alt='avatar'
                           height={0}
                           width={0}
                           className='h-[24px] w-[24px] ' />
                     </div>
                  </div>
               }>

            </SidebarFooter>
         </Sidebar>

      </div>
   )
}
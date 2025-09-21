import { Sidebar } from '@/app/_components/sidebar-components/sidebar.js'
import { SideBarContent } from '@/app/_components/sidebar-components/sidebar-content.js'
import { SidebarFooter } from '../_components/sidebar-components/sidebar-footer.js'


import { Styles } from '../_components/styles.js'
export default function SidebarLayout({
   contacts,
   children
}) {

   const styles = new Styles()

   return (
      <div className='w-auto h-full flex flex-col justify-between items-center gap-[calc(0.014652*0.92*100vh)]
         border-r-[0.5px] '>
         <Sidebar position={'vertical'} expandedWidth={'16rem'} className={'h-full justify-bwtween grow'}>
            {children}
            <SideBarContent className={'relative w-[100%] shrink'}>
               {contacts}
            </SideBarContent>
            <SidebarFooter>

            </SidebarFooter>
         </Sidebar>

      </div>
   )
}
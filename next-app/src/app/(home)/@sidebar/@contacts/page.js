import { SidebarGroup, SidebarGroupContent } from '@/app/_components/sidebar-components/sidebar-group.js'
import { SidebarLabel } from '@/app/_components/sidebar-components/sidebar-label.js'
import { Input } from '@/components/ui/input.jsx'


import { ContactManager } from './contactManager.js'
import { Styles } from '@/app/_components/styles.js'
export default function Contacts() {
   const styles = new Styles()

   return (
      <>
         <SidebarGroup className={'relative '}>
            <SidebarLabel>
               <div className="h-[length:var(--size-h4)] md:h-(length:--size-h3) ">
                  <h1 className="text-(length:--size-h4) md:text-(length:--size-h3) leading-(length:--size-h4)  md:leading-(length:--size-h3) text-[#a3a3a3] ">Chats</h1>
                  {
                     // here font actual height = 1.5 * font height
                     // Image is a replaced element
                     // 'object-contain' is used for replaced element
                     // to take same size of it's parent 
                  }
               </div>
            </SidebarLabel>
            <SidebarLabel>
               <div className="w-full ">
                  <div className=" flex justify-center items-center">
                     <Input type="search" placeholder="Search" className={"rounded-xs h-(length:--size-h3) text-[length:calc(var(--size-h3)*0.4)] md:h-(length:--size-h2) md:text-[length:calc(var(--size-h2)*0.4)] "} />
                  </div>
               </div>
            </SidebarLabel>
            <ContactManager />
         </SidebarGroup>
      </>
   )
}


// export async function getServerSideProps(context) {

// }
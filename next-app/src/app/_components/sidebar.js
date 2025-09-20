
import { PanelLeftIcon } from "lucide-react"

import ContactCard from './contactcard.js'
import { Separator } from "@/components/ui/separator"
import contactImg from '@/../public/contact-avatar.svg'

import { Sidebar, SidebarTrigger } from './sidebar-components/sidebar.js'
import { SidebarHeader } from './sidebar-components/sidebar-header.js'
import { SidebarFooter } from './sidebar-components/sidebar-footer.js'
import { SideBarContent } from './sidebar-components/sidebar-content.js'
import { SidebarGroup, SidebarGroupContent } from './sidebar-components/sidebar-group.js'
import { SidebarMenu } from "./sidebar-components/sidebar-menu.js"
import { SidebarLabel } from "./sidebar-components/sidebar-label.js"
import { Input } from "@/components/ui/input.jsx"


import { SquarePen } from 'lucide-react'
export default function SideBar() {
   return (
      <>
         <div className='w-auto h-full flex flex-col justify-between items-center gap-[calc(0.014652*0.92*100vh)]
         border-r-[0.5px] '>
            {/* sidebar button */}
            <Sidebar location={'vertical'} expandedWidth={'16rem'} className={'h-full justify-bwtween grow'}>
               <SidebarHeader className={'mr-auto justify-center'}
                  icononly={<SidebarTrigger className={`w-8 h-8 aspect-square rounded-xs hover:bg-gray-200 flex justify-center items-center group`} />}
               />
               <SidebarMenu
                  icononly={
                     <div className='w-8 h-8 aspect-square flex justify-center items-center rounded-xs'><SquarePen className='w-[length:calc(2*16*0.8)] h-[length:calc(2*16*0.8)] shrink-0' /></div>}
               >
                  <div className='leading-4'>Edit Icon</div>
               </SidebarMenu>
               <SideBarContent className={'relative w-[100%] shrink'}>
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
                  <SidebarGroup className={'relative '}>

                     <SidebarGroupContent className={''}>
                        <ContactCard
                           styles={{}}
                           imageSrc={contactImg}
                           username={"TAnanlnala"}
                           lastMessage={"llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2 llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2t"}
                        />

                     </SidebarGroupContent>
                     <Separator />
                     <SidebarGroupContent className={''}>
                        <ContactCard
                           styles={{}}
                           imageSrc={contactImg}
                           username={"TAnanlnala"}
                           lastMessage={"llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2 llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2t"}
                        />

                     </SidebarGroupContent>
                     <Separator />
                     <SidebarGroupContent className={''}>
                        <ContactCard
                           styles={{}}
                           imageSrc={contactImg}
                           username={"TAnanlnala"}
                           lastMessage={"llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2 llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2t"}
                        />

                     </SidebarGroupContent>
                     <Separator />
                     <SidebarGroupContent className={''}>
                        <ContactCard
                           styles={{}}
                           imageSrc={contactImg}
                           username={"TAnanlnala"}
                           lastMessage={"llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2 llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2t"}
                        />

                     </SidebarGroupContent>
                     <Separator />
                     <SidebarGroupContent className={''}>
                        <ContactCard
                           styles={{}}
                           imageSrc={contactImg}
                           username={"TAnanlnala"}
                           lastMessage={"llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2 llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2t"}
                        />

                     </SidebarGroupContent>
                     <Separator />
                     <SidebarGroupContent className={''}>
                        <ContactCard
                           styles={{}}
                           imageSrc={contactImg}
                           username={"TAnanlnala"}
                           lastMessage={"llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2 llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2t"}
                        />

                     </SidebarGroupContent>
                     <Separator />
                     <SidebarGroupContent className={''}>
                        <ContactCard
                           styles={{}}
                           imageSrc={contactImg}
                           username={"TAnanlnala"}
                           lastMessage={"llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2 llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2t"}
                        />

                     </SidebarGroupContent>
                  </SidebarGroup>
               </SideBarContent>
               {/* <SidebarFooter
                  
               >
                  
               </SidebarFooter> */}
            </Sidebar>
            {/* <div className='w-full flex flex-col justify-end items-center'>
               <div className='w-2/4  aspect-square bg-gray-200  p-0 m-0 '></div>
               <div className='w-2/4  aspect-square bg-gray-200  p-0 m-0 '></div>
               <div className='w-2/4  aspect-square bg-gray-200  p-0 m-0 '></div>
               <div className='w-2/4  aspect-square bg-gray-200  p-0 m-0 '></div>
            </div> */}

         </div>

      </>);
}
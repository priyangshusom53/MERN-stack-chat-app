import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
   Sidebar,
   SidebarHeader,
   SidebarContent,
   SidebarGroup,
   SidebarGroupContent,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarFooter,
   SidebarRail,
} from "@/components/ui/sidebar"

import SidebarHeaderContent from "@/app/_components/sidebar-components/sidebar-header.js"

import SidebarFooterComponent from "@/app/_components/sidebar-components/sidebar-footer.js"
import contactImage from '@/../public/contact-avatar.svg'

import SideBarChatContent from '@/app/_components/sidebar-components/sidebar-content.js'

// Menu items.
const items = [
   {
      title: "Home",
      url: "#",
      icon: Home,
   },
   {
      title: "Inbox",
      url: "#",
      icon: Inbox,
   },
   {
      title: "Calendar",
      url: "#",
      icon: Calendar,
   },
   {
      title: "Search",
      url: "#",
      icon: Search,
   },
   {
      title: "Settings",
      url: "#",
      icon: Settings,
   },
]

export function AppSidebar() {
   return (
      <Sidebar>
         <SidebarHeader>
            <SidebarHeaderContent />
         </SidebarHeader>
         <SidebarContent className={'scrollbar-style'}>
            <SidebarGroup className={'px-0'}>
               <SidebarGroupLabel ><div className="h-[length:var(--size-h4)] md:h-(length:--size-h3) ">
                  <h1 className="text-(length:--size-h4) md:text-(length:--size-h3) leading-(length:--size-h4)  md:leading-(length:--size-h3) text-[#a3a3a3] ">Chats</h1>
                  {
                     // here font actual height = 1.5 * font height
                     // Image is a replaced element
                     // 'object-contain' is used for replaced element
                     // to take same size of it's parent 
                  }
               </div></SidebarGroupLabel>
               <SidebarGroupContent className={""}>
                  <SideBarChatContent />
               </SidebarGroupContent>
            </SidebarGroup>
         </SidebarContent>
         <SidebarFooter>
            <SidebarFooterComponent
               contactImage={contactImage}
               contactName={"KalntlanTrlk"}
               contactId={"@Langlnekkn"}
            />
         </SidebarFooter>
         <SidebarRail />
      </Sidebar>
   )
}
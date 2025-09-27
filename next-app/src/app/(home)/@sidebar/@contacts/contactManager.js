'use client';

import { SidebarGroup, SidebarGroupContent } from '@/app/_components/sidebar-components/sidebar-group.js'
import { SidebarLabel } from '@/app/_components/sidebar-components/sidebar-label.js'

import ContactCard from '@/app/_components/contactcard.js'
import { Separator } from '@/components/ui/separator.jsx'

// Placeholder
import contactImg from '@/../public/contact-avatar.svg'


//
import { useRouter } from 'next/navigation';

export const ContactManager = ({ contacts }) => {
   const router = useRouter()

   return (
      <>
         {contacts?.map((contact, idx) => {
            return (
               <SidebarGroupContent className={''} key={idx} onClick={() => { router.push(`/chat?user=${contact.email}`); }}>
                  <ContactCard
                     styles={{}}
                     imageSrc={contactImg}
                     username={contact.name}
                     lastMessage={contact.lastMessage}
                  />

               </SidebarGroupContent>
            )
         })}
      </>
   )
}
'use client';

import { SidebarGroup, SidebarGroupContent } from '@/app/_components/sidebar-components/sidebar-group.js'
import { SidebarLabel } from '@/app/_components/sidebar-components/sidebar-label.js'

import ContactCard from '@/app/_components/contactcard.js'
import { Separator } from '@/components/ui/separator.jsx'

// Placeholder
import contactImg from '@/../public/contact-avatar.svg'


// client side navigation
import { useRouter } from 'next/navigation';

import { useDispatch, useSelector } from 'react-redux';
import { setContactUser } from './contactUserSlice/contactUserSlice.js';
import { useEffect } from 'react';

export const ContactManager = ({ contacts, selectedContact }) => {
   const router = useRouter()

   // dispatch for contactUser redux state
   const dispatch = useDispatch()

   const selected = useSelector((state) => state.contactUser.email)
   useEffect(() => {
      if (selectedContact !== null)
         dispatch(setContactUser(selectedContact))
   }, [])

   return (
      <>
         {contacts?.map((contact, idx) => {

            return (
               <SidebarGroupContent className={''} key={idx} onClick={() => {
                  dispatch(setContactUser(contact.email))
                  router.push(`/chat?user=${contact.email}`);
               }}>
                  <ContactCard
                     styles={{}}
                     imageSrc={contactImg}
                     username={contact.name}
                     lastMessage={contact.lastMessage}
                     data-state={(selected === contact.email) ? 'selected' : ''}
                     className={'data-[state=selected]:bg-accent data-[state=selected]:text-accent-foreground'}
                  />

               </SidebarGroupContent>
            )
         })}
      </>
   )
}
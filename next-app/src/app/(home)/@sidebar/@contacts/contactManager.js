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
import { setContactList } from './contactsSlice/contactsSlice.js';
import { setCurrentChats, addToCurrentChats, updateLatestChat } from './currentChatsSlice/currentChatsSlice.js';
import { consumeEvent } from '../../appEvents/eventsSlice.js'
import { appEvents } from '../../appEvents/events.js';

import { useEffect } from 'react';

export const ContactManager = ({ contacts, getContactAction }) => {
   const router = useRouter()

   // dispatch for contactUser redux state
   const dispatch = useDispatch()

   // selected contact
   const selected = useSelector((state) => state.contactUser.email)

   // set contactList and currentChats state
   useEffect(() => {
      dispatch(setContactList(contacts))
      const chats = contacts?.filter((c) => {
         return !c.chatDeleted && c.currentMessageCount >= 1
      })
      dispatch(setCurrentChats(chats))
   }, [])

   // Manage and update chat list according to message 
   // timestamp
   const contactList = useSelector(state => state.contacts.list)
   const currentChats = useSelector(state => state.currentChats.list)
   useEffect(() => {
      const contactManager = document.getElementById('contactManager')

      async function addChatHandler(e) {
         console.log('addChat event handler')
         try {
            const newChat = await getContactAction(e.detail.contact)
            dispatch(addToCurrentChats(newChat))
         } catch (err) {
            console.error(err.message)
         }

      }
      contactManager.addEventListener(appEvents.addChat, addChatHandler)

      async function updateChatHandler(e) {
         console.log('updateChat event handler')
         try {
            const newChat = await getContactAction(e.detail.contact)
            dispatch(updateLatestChat({ email: newChat.email, lastMessage: newChat.lastMessage }))
         } catch (err) {
            console.error(err.message)
         }

      }
      contactManager.addEventListener(appEvents.updateChat, updateChatHandler)

   }, [])

   return (
      <>
         <div id='contactManager' className='contact-manager w-full h-full flex-1 gap-[4px] flex flex-col '>
            {currentChats?.map((chat, idx) => {

               return (
                  <SidebarGroupContent className={''} key={idx} onClick={() => {
                     dispatch(setContactUser(chat.email))
                     router.push(`/chat?user=${chat.email}`);
                  }}>
                     <ContactCard
                        styles={{}}
                        imageSrc={contactImg}
                        username={chat.name}
                        lastMessage={chat.lastMessage.content}
                        data-state={(selected === chat.email) ? 'selected' : ''}
                        className={'data-[state=selected]:bg-accent data-[state=selected]:text-accent-foreground'}
                     />

                  </SidebarGroupContent>
               )
            })}
         </div>

      </>
   )
}

// check user status and retrieve user
import { isUserValidAction } from '@/app/server/validateUser.js'

import { SidebarGroup, SidebarGroupContent } from '@/app/_components/sidebar-components/sidebar-group.js'
import { SidebarLabel } from '@/app/_components/sidebar-components/sidebar-label.js'
import { Input } from '@/components/ui/input.jsx'


import { ContactManager } from './contactManager.js'
import { Styles, textStyles } from '@/app/_components/styles.js'
import { cookies } from 'next/headers.js'
export default async function Contacts() {
   let contacts = null
   const res = await isUserValidAction()
   if (res !== false) {

      try {
         const cookieStore = await cookies()
         const cookieHeader = cookieStore.toString()

         const getContactsRes = await fetch(`http://localhost:8000/api/v1/contacts`, {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
               'Cookie': cookieHeader
            },
            cache: 'no-store'
         })
         if (getContactsRes.ok) {
            const body = await getContactsRes.json()
            const data = body.data
            contacts = data.map((contact) => {
               return {
                  name: contact.contactDetails.name,
                  email: contact.contactDetails.email,
                  avatarUrl: contact.contactDetails.avatarUrl,
                  chatDeleted: contact.chatDeleted,
                  currentMessageCount: contact.currentMessageCount,
                  lastMessage: (!contact.lastMessage) ? null : {
                     type: contact.lastMessage.type,
                     _id: contact.lastMessage._id,
                     content: contact.lastMessage.content,
                     timeStamp: contact.lastMessage.timeStamp
                  }
               }
            })
         }
      } catch (err) {
         console.log(`Error in @Contacts: ${err.message}`)
      }
   }

   const getContactAction = async (contactEmail) => {
      'use server';

      console.warn('getContactAction')
      try {
         const cookieStore = await cookies()
         const cookieHeader = cookieStore.toString()

         const res = await fetch(`http://localhost:8000/api/v1/contacts/${contactEmail}`, {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
               'Cookie': cookieHeader
            },
            cache: 'no-store'
         })
         if (res.ok) {
            const body = await res.json()
            const contact = body.data
            const _contact = {
               name: contact.contactDetails.name,
               email: contact.contactDetails.email,
               avatarUrl: contact.contactDetails.avatarUrl,
               chatDeleted: contact.chatDeleted,
               currentMessageCount: contact.currentMessageCount,
               lastMessage: (!contact.lastMessage) ? null : {
                  type: contact.lastMessage.type,
                  _id: contact.lastMessage._id,
                  content: contact.lastMessage.content,
                  timeStamp: contact.lastMessage.timeStamp
               }
            }
            console.log(_contact)
            return _contact
         }
      } catch (err) {
         console.error(`Error in getContact action: ${err.message}`)
         return null
      }
   }

   const styles = new Styles()
   return (
      <>
         <SidebarGroup className={'relative gap-[4px]'}>
            <SidebarLabel>
               <div className="h-[30px] px-[6px] flex flex-col justify-center items-center">
                  <h2 className={`${textStyles.text_header}`}>Chats</h2>
                  {
                     // here font actual height = 1.5 * font height
                     // Image is a replaced element
                     // 'object-contain' is used for replaced element
                     // to take same size of it's parent 
                  }
               </div>
            </SidebarLabel>
            <SidebarLabel>
               <div className="w-full flex justify-center items-center">
                  <input type="search" placeholder="Search" className={`${textStyles.text_secondary} w-full h-[30px] px-[6px] rounded-[8px] border outline-none`} />
               </div>
            </SidebarLabel>
            {/* contact list */}
            <ContactManager contacts={contacts} getContactAction={getContactAction} />
         </SidebarGroup>
      </>
   )
}


// export async function getServerSideProps(context) {

// }
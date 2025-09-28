
// check user status and retrieve user
import { isUserValidAction } from '@/app/server/validateUser.js'

import { SidebarGroup, SidebarGroupContent } from '@/app/_components/sidebar-components/sidebar-group.js'
import { SidebarLabel } from '@/app/_components/sidebar-components/sidebar-label.js'
import { Input } from '@/components/ui/input.jsx'


import { ContactManager } from './contactManager.js'
import { Styles, textStyles } from '@/app/_components/styles.js'
export default async function Contacts() {
   let contacts = null
   const res = await isUserValidAction()
   if (res !== false) {
      const user = res.user
      try {
         const getContactsRes = await fetch(`http://localhost:8000/message/contacts/${user.email}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store'
         })
         if (getContactsRes.ok) {
            const getContactsResJson = await getContactsRes.json()
            const data = getContactsResJson.data
            contacts = data.map((contact) => {
               return { name: contact.name, email: contact.email, lastMessage: 'sample last message' }
            })
         }
      } catch (err) {
         console.log(`Error in @Contacts: ${err.message}`)
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
            <ContactManager contacts={contacts} />
         </SidebarGroup>
      </>
   )
}


// export async function getServerSideProps(context) {

// }
import { SidebarGroup, SidebarGroupContent } from '@/app/_components/sidebar-components/sidebar-group.js'
import { SidebarLabel } from '@/app/_components/sidebar-components/sidebar-label.js'
import { Input } from '@/components/ui/input.jsx'
import ContactCard from '@/app/_components/contactcard.js'
import { Separator } from '@/components/ui/separator.jsx'

// Placeholder
import contactImg from '@/../public/contact-avatar.svg'


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
      </>
   )
}
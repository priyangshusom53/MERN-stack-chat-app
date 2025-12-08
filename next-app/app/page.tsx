import React from 'react';
import { ContactCard } from './components/contacts';
import { ColorModeButton } from "@/src/components/ui/color-mode"
interface HomeProps {
   sidebar: React.ReactNode;
   messages: React.ReactNode;
}

export default function Home({ sidebar, messages }: HomeProps): React.ReactNode {
   return (<>
      <ColorModeButton />
      <div className='flex flex-col gap-2'>
         <ContactCard email='example@gmail.com' />
         <ContactCard name='Shane Nelson' email='example@gmail.com' lastMessage='this is a message' />
         <ContactCard name='Brook Lesnar' email='example@gmail.com' lastMessage='this is a message' />
         <ContactCard name='John Lennon' email='example@gmail.com' lastMessage='this is a message' />
      </div>

   </>)
}
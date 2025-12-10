
'use client';

import React, { ReactElement } from 'react';
import { ContactCard } from './components/contacts';
import { ColorModeButton } from "@/src/components/ui/color-mode"
import { useRef } from 'react';
import { Sidebar } from './components/sidebar/sidebar'

import { Button, CloseButton, Drawer, Portal, VStack } from "@chakra-ui/react"
import { Icon } from "@chakra-ui/react"
import { PanelLeft } from 'lucide-react';
interface HomeProps {
   sidebar: React.ReactNode;
   messages: React.ReactNode;
}

const contacts = [
   <ContactCard email='example@gmail.com' />,
   <ContactCard name='Shane Nelson' email='example@gmail.com' lastMessage='this is a message' />,
   <ContactCard name='Brook Lesnar' email='example@gmail.com' lastMessage='this is a message' />,
   <ContactCard name='John Lennon' email='example@gmail.com' lastMessage='this is a message' />
]

export default function Home({ sidebar, messages }: HomeProps): React.ReactNode {

   const sidebarContainerRef = useRef<HTMLDivElement>(null)

   return (<>
      <div className='flex justify-center'>
         <Sidebar.Trigger asChild>
            <Button width={'48px'} height={'48px'}>
               <Icon>
                  <PanelLeft />
               </Icon>
            </Button>
         </Sidebar.Trigger>
      </div>

   </>)
}
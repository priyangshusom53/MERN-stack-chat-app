'use client';

import { Trigger } from "./sidebarTrigger";

type SidebarComponent = {
   Trigger: typeof Trigger;
};

const Sidebar = {
   Trigger: Trigger,
} as SidebarComponent;

export { Sidebar }

import { Button, CloseButton, Drawer, Portal, VStack } from "@chakra-ui/react"
import { Icon } from "@chakra-ui/react"
import React, { Attributes, HTMLAttributes, MouseEventHandler, ReactElement, ReactHTMLElement, useState } from "react"


import { PanelLeftOpen, PanelLeftClose } from 'lucide-react';

interface SidebarProps {
   containerRef: React.RefObject<HTMLElement | null>;
   contacts?: React.ReactNode[];
}

export const Sidebarx = ({ containerRef, contacts }: SidebarProps) => {



   return (
      <div>

      </div>
   )
}
"use client"

import React, { useState } from 'react';
import { PanelLeft } from 'lucide-react';

type triggerType = React.ReactElement<{ onClick: React.MouseEventHandler<HTMLElement> }, React.FunctionComponent>

interface TriggerProps {
   asChild?: boolean;
   children?: triggerType;
}

export const Trigger = ({ asChild, children }: TriggerProps) => {

   const [open, setOpen] = useState<boolean>(false)

   const handleOnClick: React.MouseEventHandler<HTMLElement> = () => { setOpen(!open) }

   if (asChild && children && React.isValidElement<triggerType>(children)) {

      const triggerElement = React.cloneElement<{ onClick: React.MouseEventHandler<HTMLElement> }>(children, {
         onClick: handleOnClick
      })

      return triggerElement
   }

   return (
      <button onClick={handleOnClick}>
         <PanelLeft />
      </button>
   )
}
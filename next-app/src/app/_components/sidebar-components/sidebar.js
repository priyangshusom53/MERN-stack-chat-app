"use client";

import { cn } from "@/lib/utils";
import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { displayStyles } from "../styles.js";

const SidebarContext = createContext(null);

export const useSidebar = () => {
   const contextValue = useContext(SidebarContext)
   return contextValue
}

export const SidebarContextProvider = ({ children }) => {

   // default is expanded
   const [isOpen, setIsOpen] = useState(true);

   const open = isOpen
   const setOpen = (value) => {
      setIsOpen(value)
   }
   const toggleSidebar = () => {
      setIsOpen(value => !value)
   }

   const state = open ? "expanded" : "collapsed"
   const contextValue = {
      open,
      setOpen,
      state,
      toggleSidebar,
   }

   return (
      <SidebarContext.Provider value={contextValue}>
         {children}
      </SidebarContext.Provider>
   )
}

export const Sidebar = ({ children, width, expandedWidth, height, position, className }) => {

   const { open, state } = useSidebar();
   const isVertical = (position === 'vertical') ? true : false

   return (
      <div data-state={state} className={cn(` ${(isVertical) ? `h-[${height ?? '100%'}] w-full ${open ? `w-[${expandedWidth}]` : 'w-auto'}` : `w-[${width ?? '100%'}] h-auto`} shrink-0 ${displayStyles.flex_col_center} h-full group peer`)}
         style={{
            width: `${open ? expandedWidth ?? 'auto' : 'auto'}`,

            top: 0,
            left: 0,
            background: 'white',
            transform: `${open ? "translate-x-0" : "-translate-x-full"}`,
            zIndex: 10
         }}>
         <div className={cn(`sidebar w-full h-full ${displayStyles.flex_col_start_center} relative`, className)}>
            {children}
         </div>
      </div>
   )
}

export const Collapsible = ({ icononly, children, className, ...props }) => {
   const { open } = useSidebar()

   return (
      <div className={cn(`collapsible w-full flex flex-row ${open ? 'place-self-start justify-start' : 'justify-center'} items-center`, className)} {...props}>
         {icononly ?? <></>}
         {(open) ? children ?? <></> : <></>}
      </div>
   )
}

import { PanelRight } from 'lucide-react';
import { interaction_color, iconSizes } from "../styles.js";
export const SidebarTrigger = ({ className, triggerIcon }) => {
   const { toggleSidebar } = useSidebar()

   return (
      <div className={cn(`trigger-button  select-none ${interaction_color()} ${iconSizes.primary_background} rounded-[8px]`, className)} onClick={toggleSidebar}>
         {(triggerIcon) ? { triggerIcon } : <PanelRight className={`trigger-icon ${iconSizes.icon_secondary} aspect-square active:text-accent-foreground text-foreground group-hover:text-accent-foreground`} />}
      </div>
   )
}


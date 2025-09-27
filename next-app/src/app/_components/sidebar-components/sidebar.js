"use client";

import { cn } from "@/lib/utils";
import { createContext, useContext } from "react";
import { useState } from "react";
import { displayStyles } from "../styles.js";

const SidebarContext = createContext(null);

export const useSidebar = () => {
   const contextValue = useContext(SidebarContext)
   return contextValue
}

export const SidebarContextProvider = ({ children }) => {

   const [isOpen, setIsOpen] = useState(false);

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
      <div data-state={state} className={`sidebar ${(isVertical) ? `h-[${height ?? '100%'}] w-auto ${open ? `w-[${expandedWidth}]` : 'w-auto'}` : `w-[${width ?? '100%'}] h-auto`} shrink-0 ${displayStyles.flex_row_center} group peer`}
         style={{
            width: `${open ? expandedWidth ?? 'auto' : 'auto'}`
         }}>
         <div className={cn(`w-full h-full ${displayStyles.flex_col_start_center} relative`, className)}>
            {children}
         </div>
      </div>
   )
}

export const Collapsible = ({ icononly, children, className }) => {
   const { open } = useSidebar()

   return (
      <div className={cn(`w-full p-2 flex flex-row ${open ? 'justify-start' : 'justify-center'} items-center`, className)}>
         {icononly ?? <></>}
         {(open) ? children ?? <></> : <></>}
      </div>
   )
}

import { PanelRight } from 'lucide-react';
import { interaction_color } from "../styles.js";
export const SidebarTrigger = ({ className, triggerIcon }) => {
   const { toggleSidebar } = useSidebar()

   return (
      <div className={cn(`trigger-button select-none ${interaction_color()} `, className)} onClick={toggleSidebar}>
         {(triggerIcon) ? { triggerIcon } : <PanelRight className={`trigger-icon h-[80%] w-[80%] aspect-square active:text-accent-foreground text-foreground group-hover:text-accent-foreground`} />}
      </div>
   )
}


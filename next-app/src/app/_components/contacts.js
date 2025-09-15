"use client";
import { Input } from "@/components/ui/input"
import ContactCard from "./contactcard";

import { useRef, useState, useLayoutEffect } from "react"

import contactImg from '../../../public/contact-avatar.svg'
export default function ContactsArea() {

   const headerRef = useRef(null);
   const [headerHeight, setHeaderHeight] = useState(0);

   useLayoutEffect(() => {
      if (headerRef.current) {
         setHeaderHeight(headerRef.current.offsetHeight);
      }

      // update on resize
      const handleResize = () => {
         if (headerRef.current) {
            setHeaderHeight(headerRef.current.offsetHeight);
         }
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
   }, []);

   return (
      <>
         <div className="w-full h-full text-(length:--font-size-2xl)  relative flex flex-col justify-between ">
            {/* Header contains feature buttons search bar */}
            <div className="sticky inset-x-0 mt-[length:calc(0.6*var(--size-h4))] md:mt-[length:calc(0.6*var(--size-h3))] mb-[length:calc(0.6*var(--size-h4))] md:mb-[length:calc(0.6*var(--size-h3))]">
               <Header
                  searchbox={<div className="relative ">
                     <div className="px-1 flex justify-center items-center">
                        <Input type="search" placeholder="Search" className={"rounded-xs h-(length:--size-h3) text-[length:calc(var(--size-h3)*0.4)] md:h-(length:--size-h2) md:text-[length:calc(var(--size-h2)*0.4)] "} />
                     </div>
                  </div>}
               />
            </div>
            {/* contact cards */}
            <div className={`w-full sticky bottom-0 flex-1  flex flex-col overflow-auto scrollbar-style`} style={{
               top: headerHeight,
            }}>
               <ContactCard
                  styles={{}}
                  imageSrc={contactImg}
                  username={"TAnanlnala"}
                  lastMessage={"llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2 llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2t"}
               />
               <ContactCard
                  styles={{}}
                  imageSrc={contactImg}
                  username={"alnanlnala"}
                  lastMessage={"llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2 llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2"}
               />
               <ContactCard
                  styles={{}}
                  imageSrc={contactImg}
                  username={"alnanlnala"}
                  lastMessage={"llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2 llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2"}
               />
               <ContactCard
                  styles={{}}
                  imageSrc={contactImg}
                  username={"alnanlnala"}
                  lastMessage={"llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2 llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2"}
               />
               <ContactCard
                  styles={{}}
                  imageSrc={contactImg}
                  username={"alnanlnala"}
                  lastMessage={"llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2 llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2"}
               />
               <ContactCard
                  styles={{}}
                  imageSrc={contactImg}
                  username={"alnanlnala"}
                  lastMessage={"llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2 llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2"}
               />
               <ContactCard
                  styles={{}}
                  imageSrc={contactImg}
                  username={"alnanlnala"}
                  lastMessage={"llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2 llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2"}
               />
               <ContactCard
                  styles={{}}
                  imageSrc={contactImg}
                  username={"alnanlnala"}
                  lastMessage={"llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2 llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2"}
               />
               <ContactCard
                  styles={{}}
                  imageSrc={contactImg}
                  username={"alnanlnala"}
                  lastMessage={"llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2 llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2"}
               />
               <ContactCard
                  styles={{}}
                  imageSrc={contactImg}
                  username={"alnanlnala"}
                  lastMessage={"llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2 llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2"}
               />
               <ContactCard
                  styles={{}}
                  imageSrc={contactImg}
                  username={"alnanlnala"}
                  lastMessage={"llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2 llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2"}
               />
               <ContactCard
                  styles={{}}
                  imageSrc={contactImg}
                  username={"alnanlnala"}
                  lastMessage={"llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2 llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2"}
               />
               <ContactCard
                  styles={{}}
                  imageSrc={contactImg}
                  username={"alnanlnala"}
                  lastMessage={"llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2 llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2"}
               />
               <ContactCard
                  styles={{}}
                  imageSrc={contactImg}
                  username={"alnanlnala"}
                  lastMessage={"llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2 llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2"}
               />
               <ContactCard
                  styles={{}}
                  imageSrc={contactImg}
                  username={"alnanlnala"}
                  lastMessage={"llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2 llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2llannlknl3n 2l 2 2ln62l6nl 36m2'[6k2[k[';k2k6'2"}
               />

            </div>

         </div>
      </>
   )
}



import Image from "next/image";
import { SquarePen } from 'lucide-react';
import editLogo from '../../../public/edit-logo.svg'

//Tailwind 4 = 1rem, 1rem = 16px
//         1 = 0.25rem
//
function Header({ searchbox }) {
   return (
      <>
         <div className="
         max-md:h-auto
         xs:
         sm:
          w-full flex flex-col gap-y-[length:var(--size-0\.75rem)]">
            {/*
            * length: is css data type used in 
            * h-[length:var(--size-6rem)] to hint value is used
            * as length 
             */}
            <div className="flex flex-row justify-between  items-center px-1">
               {
                  /*
                  /* Figma font size are in css pixel
                  /* figma 1pt = 1px in css 
                  /* it represents font height
                  /* figma 16pt = 16px css or 1rem
                  /* fonts in css include line height(space above and below the text)
                  /* total height of font = 1.1-1.2*font height
                  */
               }

               <div className="h-[length:var(--size-h4)] md:h-(length:--size-h3) ">
                  <h1 className="text-(length:--size-h4) md:text-(length:--size-h3) leading-(length:--size-h4)  md:leading-(length:--size-h3) text-[#a3a3a3] ">Chats</h1>
                  {
                     // here font actual height = 1.5 * font height
                     // Image is a replaced element
                     // 'object-contain' is used for replaced element
                     // to take same size of it's parent 
                  }
               </div>
               <div className="h-[length:var(--size-h4)] md:h-(length:--size-h3) aspect-square flex flex-col justify-end items-center">
                  <SquarePen className="h-[88%] w-[88%]
                     aspect-square" style={{ color: "#a3a3a3" }} />
               </div>

            </div>
            <div>{searchbox ? searchbox : <></>}</div>
         </div>
      </>)
}
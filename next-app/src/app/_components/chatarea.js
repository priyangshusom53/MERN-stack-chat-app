import ChatBubble from "./chatbubble"

import contactImage from '../../../public/contact-avatar.svg'
export default function ChatArea() {
   return (
      <>
         <div className="relative w-full h-full flex flex-col justify-center items-center">
            {/* contact header */}
            <div className="w-[100%] sticky top-0 left-0 px-2 md:px-8  flex flex-row justify-start items-center">
               <ContactHeader
                  contactImage={contactImage}
                  contactName={"TAnanlnala"}
                  contactId={"@TAnanlnala"}
               />
            </div>
            {/* chat area */}
            <div className="w-full flex-1 px-2 md:px-8 flex flex-col overflow-auto scrollbar-style justify-end-safe items-stretch gap-[length:var(--size-h4)]">
               <ChatBubble
                  message={"text-[length:calc(0.8*var(--size-h6))] md:text-[length:var(--size-h5)] leading-[length:calc(2*0.8*var(--size-h6))]  md:leading-[length:calc(2*var(--size-h5))] break-all line-clamp-none text-wrap tracking-tight"}
                  type={"sent"}
               />
               <ChatBubble
                  message={"text-[length:calc(0.8*var(--size-h6))] md:text-[length:var(--size-h5)] leading-[length:calc(2*0.8*var(--size-h6))]  md:leading-[length:calc(2*var(--size-h5))] break-all line-clamp-none text-wrap tracking-tight"}
                  type={"received"}
               />
               <ChatBubble
                  message={"text-[length:calc(0.8*var(--size-h6))] md:text-[length:var(--size-h5)] leading-[length:calc(2*0.8*var(--size-h6))]  md:leading-[length:calc(2*var(--size-h5))] break-all line-clamp-none text-wrap tracking-tight"}
                  type={"sent"}
               />
               <ChatBubble
                  message={"text-[length:calc(0.8*var(--size-h6))] md:text-[length:var(--size-h5)] leading-[length:calc(2*0.8*var(--size-h6))]  md:leading-[length:calc(2*var(--size-h5))] break-all line-clamp-none text-wrap tracking-tight"}
                  type={"sent"}
               />
               <ChatBubble
                  message={"text-[length:calc(0.8*var(--size-h6))] md:text-[length:var(--size-h5)] leading-[length:calc(2*0.8*var(--size-h6))]  md:leading-[length:calc(2*var(--size-h5))] break-all line-clamp-none text-wrap tracking-tight"}
                  type={"received"}
               />
               <ChatBubble
                  message={"text-[length:calc(0.8*var(--size-h6))] md:text-[length:var(--size-h5)] leading-[length:calc(2*0.8*var(--size-h6))]  md:leading-[length:calc(2*var(--size-h5))] break-all line-clamp-none text-wrap tracking-tight"}
                  type={"received"}
               />
               <ChatBubble
                  message={"text-[length:calc(0.8*var(--size-h6))] md:text-[length:var(--size-h5)] leading-[length:calc(2*0.8*var(--size-h6))]  md:leading-[length:calc(2*var(--size-h5))] break-all line-clamp-none text-wrap tracking-tight"}
                  type={"sent"}
               />
               <ChatBubble
                  message={"text-[length:calc(0.8*var(--size-h6))] md:text-[length:var(--size-h5)] leading-[length:calc(2*0.8*var(--size-h6))]  md:leading-[length:calc(2*var(--size-h5))] break-all line-clamp-none text-wrap tracking-tight"}
                  type={"sent"}
               />
               <ChatBubble
                  message={"text-[length:calc(0.8*var(--size-h6))] md:text-[length:var(--size-h5)] leading-[length:calc(2*0.8*var(--size-h6))]  md:leading-[length:calc(2*var(--size-h5))] break-all line-clamp-none text-wrap tracking-tight"}
                  type={"received"}
               />
            </div>
            {/* input section */}
            <div className="w-[100%] sticky bottom-0 left-0 px-2 md:px-8 flex justify-center items-center">
               <InputSection />
            </div>
         </div>
      </>
   )
}


import Image from "next/image";
function ContactHeader({ contactImage, contactName, contactId }) {
   return (<>
      <div className="w-full mt-[length:calc(0.6*var(--size-h4))] md:mt-[length:calc(0.6*var(--size-h3))] mb-[length:calc(0.6*var(--size-h4))] md:mb-[length:calc(0.6*var(--size-h3))] flex flex-row justify-start items-center mr-auto">
         <div className="w-full flex flex-row justify-start items-center gap-x-[length:calc(0.2*var(--size-h6))] md:gap-x-[length:calc(0.6*var(--size-h6))]">
            <div className="h-[100%] aspect-square flex flex-col justify-center items-center shrink-0">
               <div className="w-full h-full rounded-full overflow-hidden flex justify-center items-center">
                  <Image
                     src={contactImage}
                     alt={`${contactName}'s avatar`}
                     width={0}
                     height={0}
                     className="object-cover h-full w-full"
                  />
               </div>
            </div>
            <div className="flex flex-col justify-center items-start">
               <div className="text-(length:--size-h5) md:text-(length:--size-h4) leading-none "><span>{contactName}</span></div>
               <div className="text-(length:--size-h6) md:text-(length:--size-h5) leading-[length:calc(1.2*var(--size-h6))] md:leading-[length:calc(1.2*var(--size-h5))]"><span>{contactId}</span></div>
            </div>

         </div>
      </div>
   </>)
}


import { Input } from "@/components/ui/input";
import { SendHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button"
function InputSection() {
   return (<>
      <div className="w-full mt-[length:calc(0.6*var(--size-h4))] md:mt-[length:calc(0.6*var(--size-h3))] mb-[length:calc(0.6*var(--size-h4))] md:mb-[length:calc(0.6*var(--size-h3))] flex justify-start items-start ">
         <div className="relative w-[100%] h-[length:calc(2*var(--size-h6))] md:h-[length:calc(2*var(--size-h5))] flex justify-center items-center">
            <Input className="w-full h-full text-(length:--size-h6) md:text-(length:--size-h5) flex justify-center items-center rounded-xs " placeholder="Type your message..." />
            <div className="absolute right-2 top-[10%] bottom-[10%] h-[80%] aspect-square rounded-full flex flex-row justify-center items-center">
               <Button variant={'outline'} size={"icon"} className="w-full h-full box-border aspect-square rounded-full flex justify-center items-center dark">
                  <div className="w-[80%] h-[80%] flex justify-center items-center"><SendHorizontal className="w-[100%] max-h-[100%] text-white" /></div>
               </Button>
            </div>
         </div>
      </div>
   </>)
}
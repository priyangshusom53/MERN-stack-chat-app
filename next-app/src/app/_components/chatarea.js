'use client';
import ChatBubble from "./chatbubble"

const _ = null
import contactImage from '../../../public/contact-avatar.svg'
export default function ChatArea({ messages }) {
   return (
      <>
         <div className="relative w-full h-full flex flex-col justify-center items-center">
            {/* contact header */}
            <div className={`w-[100%] sticky top-0 left-0 px-2 md:px-8  flex flex-row justify-start items-center ${interaction_color(_, true)} border-b-[0.5px]`}>
               <ContactHeader
                  contactImage={contactImage}
                  contactName={"TAnanlnala"}
                  contactId={"@TAnanlnala"}
               />
            </div>
            <div className={cn(`flex-1 w-full px-4 ${displayStyles.flex_col_center} justify-start overflow-auto scrollbar-style  items-center`)}>
               <div className={cn(`place-self-end mt-auto py-4 ${displayStyles.flex_col_center} justify-end max-w-[40rem] mx-auto gap-[length:var(--size-h4)] items-stretch `)}>
                  {/* chat area */}

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
            </div>

            {/* input section */}
            <div className="w-full sticky bottom-0 left-0 px-4  flex justify-center items-center">
               <div className={cn(`flex-1 mt-auto ${displayStyles.flex_row_center} items-stretch max-w-[40rem] mx-auto `)}>
                  <InputSection />
               </div>
            </div>
         </div>


      </>
   )
}


import { cn } from "@/lib/utils";
import { displayStyles, textStyles, h_lvl_2_3, bg_fg_color, interaction_color, Styles } from "./styles";

const txt_level_2 = cn(textStyles.text_h5, "md:text-[length:var(--size-h4)] md:leading-[length:calc(1.3*var(--size-h4))]")
const txt_level_3 = cn(textStyles.text_h6, "md:text-[length:var(--size-h5)] md:leading-[length:calc(1.4*var(--size-h5))]")
import Image from "next/image";
export function ContactHeader({ contactImage, contactName, contactId }) {
   const styles = new Styles()
      .m('0.5rem', '0.5rem', 0, 0)
      .build()
   return (<>
      <div className={cn(`w-full h-auto my-auto flex flex-row justify-start items-center mr-auto ${bg_fg_color()} `)}
      >
         <div className="w-full h-auto flex flex-row justify-start items-center gap-x-[8px]">
            <div className="h-full mb-auto rounded-full overflow-hidden shrink-0 flex flex-col justify-start items-start">
               <Image
                  src={contactImage}
                  alt={`${contactName}'s avatar`}
                  width={0}
                  height={0}
                  className="object-cover h-[24px] w-[24px]"
               />
            </div>
            <div className="h-auto flex flex-col justify-center items-start">
               <div className={'w-full h-auto flex flex-col justify-start items-start'}>
                  <div className={cn(displayStyles.flex_col_start_center, textStyles.text_primary, 'overflow-hidden')}>
                     <span className="">
                        {contactName}
                     </span>
                  </div>
               </div>
               <div className={`${textStyles.text_secondary} ${displayStyles.flex_col_start_center}`}>
                  <span>
                     {contactId}
                  </span>
               </div>
            </div>

         </div>
      </div>
   </>)
}


import { Input } from "@/components/ui/input";
import { SendHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button"

import { useState } from "react";
export function InputSection({ onSend }) {
   const [text, setText] = useState("");
   const [isSending, setIsSending] = useState(false)

   async function handleSend() {
      if (!text.trim()) return

      setIsSending(true);
      try {
         await onSend(text); // call server action or API
         setText(""); // clear input on success
      } catch (err) {
         console.error("Failed to send message", err);
      } finally {
         setIsSending(false); // re-enable button
      }
   }

   return (<>
      <div className="w-full mt-[length:calc(0.6*var(--size-h4))] md:mt-[length:calc(0.6*var(--size-h3))] mb-[length:calc(0.6*var(--size-h4))] md:mb-[length:calc(0.6*var(--size-h3))] flex justify-start items-start ">
         <div className="relative w-[100%] h-[length:calc(2*var(--size-h6))] md:h-[length:calc(2*var(--size-h5))] flex justify-center items-center">
            <Input className="w-full h-full text-(length:--size-h6) md:text-(length:--size-h5) flex justify-center items-center rounded-xs "
               placeholder="Type your message..."
               value={text}
               onChange={(e) => { setText(e.target.value) }} />
            <div className="absolute right-2 top-[10%] bottom-[10%] h-[80%] aspect-square rounded-full flex flex-row justify-center items-center">
               <Button variant={'outline'} size={"icon"} className="w-full h-full box-border aspect-square rounded-full flex justify-center items-center dark"
                  onClick={handleSend}
                  disabled={text.trim() === '' || isSending ? true : false}>
                  <div className="w-[80%] h-[80%] flex justify-center items-center"><SendHorizontal className="w-[100%] max-h-[100%] text-white" /></div>
               </Button>
            </div>
         </div>
      </div>
   </>)
}
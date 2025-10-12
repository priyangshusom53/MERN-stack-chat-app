'use client';


import { Input } from "@/components/ui/input";
import { SendHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button"

// styles
import { cn } from "@/lib/utils.js";
import { textStyles } from "./styles.js";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useClientContext } from "../(home)/client.js";
export function InputSection({ onSend }) {

   const clientContext = useClientContext()
   const socket = clientContext.socket
   const socketStatus = clientContext.socketStatus

   // block input if socket is not connected
   const [blockSending, setBlockSending] = useState(false)
   useEffect(() => {
      if (socketStatus !== 'connected') {
         setBlockSending((prev) => {
            if (prev === false) return true
            if (prev === true) return prev
         })
      } else {
         setBlockSending((prev) => {
            if (prev === false) return prev
            if (prev === true) return false
         })
      }
   }, [socketStatus])

   const [text, setText] = useState("");
   const [isSending, setIsSending] = useState(false)

   // get sender and receiver from redux state
   const from = useSelector((state) => state.authUser.email)
   const to = useSelector((state) => state.contactUser.email)

   async function handleSend() {
      if (!text.trim()) return

      setIsSending(true);
      try {
         const res = await onSend(text); // call server action or API
         const message = res.data
         if (message) socket.emit('message', message)
         console.log(message)
         setText(""); // clear input on success
      } catch (err) {
         console.error("Failed to send message", err);
      } finally {
         setIsSending(false); // re-enable button
      }
   }

   return (<>
      <div className="w-full h-full flex justify-center items-center ">
         <div className="relative w-[100%] h-[30px] my-auto  flex justify-center items-center">
            <input className={cn("w-full h-full px-[8px] border flex justify-center items-center rounded-[8px]", textStyles.text_secondary, 'text-foreground', 'focus:outline active:outline')}
               placeholder="Type your message..."
               value={text}
               onChange={(e) => { setText(e.target.value) }}
            />
            <div className="absolute right-2 top-[10%] bottom-[10%] h-[80%] aspect-square rounded-full flex flex-row justify-center items-center">
               <Button variant={'outline'} size={"icon"} className="w-full h-full box-border aspect-square rounded-full flex justify-center items-center dark"
                  onClick={handleSend}
                  disabled={text.trim() === '' || isSending || blockSending ? true : false}>
                  <div className="w-[80%] h-[80%] flex justify-center items-center">
                     <SendHorizontal className="w-[100%] max-h-[100%] text-white" />
                  </div>
               </Button>
            </div>
         </div>
      </div>
   </>)
}
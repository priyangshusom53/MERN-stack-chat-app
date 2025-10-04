import { cn } from "@/lib/utils";
import { textStyles, bg_fg_color, interaction_color } from "./styles";

// status icon
import { CircleCheckBig } from 'lucide-react';

export default function ChatBubble({ message, type, status }) {
   return (
      <>
         <div className={cn(`max-w-[70%] md:max-w-[60%] ${bg_fg_color()} p-2 rounded-lg`, `${(type === 'sent') ? `rounded-br-xs ml-auto place-self-end flex flex-row ${bg_fg_color('bg-foreground text-background')}` : `flex flex-row justify-start items-start rounded-bl-xs mr-auto place-self-start ${interaction_color()}`} border`)}>
            <div className={cn(`flex-1 ${textStyles.text_secondary} ${type === 'sent' ? 'text-background' : 'text-foreground'} break-all line-clamp-none text-wrap wrap-anywhere tracking-tight `)}>
               <span>
                  {message}
               </span>
            </div>
            {/* status icon */}
            {(type === 'sent' && status === 'successful') ? (<div className="w-[12px] h-[12px] place-self-end flex flex-col shrink-0 ">
               <CircleCheckBig width={0} height={0} className="w-full h-full aspect-square " />
            </div>) : (<></>)}
         </div>
      </>
   )
}
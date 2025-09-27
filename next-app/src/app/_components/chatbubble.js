import { cn } from "@/lib/utils";
import { textStyles, bg_fg_color, interaction_color } from "./styles";

const txt_level_2 = cn(textStyles.text_h5, "md:text-[length:var(--size-h4)] md:leading-[length:calc(1.3*var(--size-h4))]")
const txt_level_3 = cn(textStyles.text_h6, "md:text-[length:var(--size-h5)] md:leading-[length:calc(1.4*var(--size-h5))]")

export default function ChatBubble({ message, type }) {
   return (
      <>
         <div className={cn(`max-w-[70%] md:max-w-[60%] ${bg_fg_color()} px-2 md:px-4 py-2 rounded-lg`, `${(type === 'sent') ? `rounded-br-xs ml-auto place-self-end ${bg_fg_color('bg-foreground text-background')}` : `rounded-bl-xs mr-auto place-self-start ${interaction_color()}`} border`)}>
            <div className={cn(`${txt_level_3} break-all line-clamp-none text-wrap wrap-anywhere tracking-tight `)}>
               <span>
                  {message}
               </span>
            </div>
         </div>
      </>
   )
}
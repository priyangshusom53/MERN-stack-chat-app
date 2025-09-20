
// components/ContactCard.jsx
import Image from "next/image";

const maxFontSize = {
   "h": "--size-h4",
   "md:": "--size-h3"
}
import { cn } from "@/lib/utils";
import { textStyles, bg_fg_color, interaction_color, displayStyles } from "./styles";

const txt_level_2 = cn(textStyles.text_h5, "md:text-[length:var(--size-h4)] md:leading-[length:calc(1.3*var(--size-h4))]")
const txt_level_3 = cn(textStyles.text_h6, "md:text-[length:var(--size-h5)] md:leading-[length:calc(1.4*var(--size-h5))]")

export default function ContactCard({ imageSrc, status, username, lastMessage, className }) {
   return (
      <div
         className={`@container w-full box-border ${bg_fg_color()} ${interaction_color()} flex flex-row justify-start items-stretch ${textStyles.text_color}`}
      >
         {/* status */}
         <div className="w-[0%] md:w-[0%]  bg-green-300"></div>
         {/* content */}
         <div className="flex-1 px-2 md:px-6 mt-[length:calc(0.6*var(--size-h4))] md:mt-[length:calc(0.6*var(--size-h3))] flex flex-row items-start gap-x-[length:calc(0.2*var(--size-h6))] md:gap-x-[length:calc(0.6*var(--size-h6))]">
            {/* Avatar */}
            <div className="h-full w-auto flex-shrink-0 flex flex-col justify-start items-center mt-[2px] md:mt-[1px]">
               <div className="h-[50%] md:h-[50%] aspect-square flex-shrink-0 flex flex-col justify-start items-center">
                  <div className="w-[100%] aspect-square rounded-full overflow-hidden flex-shrink-0 flex felx-col justify-center items-baseline">
                     <Image
                        src={imageSrc}
                        alt={`${username}'s avatar`}
                        width={0}
                        height={0}
                        className="object-cover h-[100%] w-[100%] "
                     />
                  </div>
               </div>
            </div>

            {/* Text content */}
            <div className="flex-1 w-full h-full">
               <div className=" h-auto flex flex-col justify-start overflow-hidden ">
                  <div className="h-auto w-[100%]">
                     <div
                        className={cn(` h-[length:calc(1*var(--size-h5))]  md:h-[length:calc(1*var(--size-h4))] ${textStyles.text_h5} leading-none  break-all tracking-tight line-clamp-1 text-wrap wrap-anywhere overflow-hidden text-clip text-ellipsis ${displayStyles.flex_row_start_center}`)}
                        style={{}}
                     >
                        <span className="">
                           {username}
                        </span>
                     </div>
                  </div>
                  <div className={`max-h-full max-w-full 
               ${textStyles.text_h6} break-all line-clamp-1 text-wrap tracking-tight truncate wrap-anywhere`}>
                     <span className="">{lastMessage}</span>
                  </div>
                  <div className="min-h-[length:calc(0.6*var(--size-h4))] md:min-h-[length:calc(0.6*var(--size-h3))] grow shrink-0 w-full"></div>

               </div>
            </div>
         </div>

      </div>
   );
}

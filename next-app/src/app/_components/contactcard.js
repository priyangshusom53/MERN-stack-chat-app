'use client';

// components/ContactCard.jsx
import Image from "next/image";

import { cn } from "@/lib/utils";
import { textStyles, iconSizes, bg_fg_color, interaction_color, displayStyles } from "./styles";


export default function ContactCard({ imageSrc, status, username, lastMessage, className, ...props }) {
   return (
      <div
         className={cn(`@container w-full h-[48px] rounded-[8px] ${bg_fg_color()} ${interaction_color()} flex flex-row justify-start items-stretch ${textStyles.text_color}`, className)} {...props}
      >
         {/* status
         <div className="w-[0%] md:w-[0%]  bg-green-300"></div> */}
         {/* content */}
         <div className={`w-full ${displayStyles.flex_row_start_center} mx-[6px] my-auto`}>
            <div className={cn(`w-full ${displayStyles.flex_row_start_center} items-start gap-x-[8px]`)}>
               {/* Avatar */}
               <div className={cn(displayStyles.flex_col_center, 'flex-shrink-0 w-auto rounded-full aspect-square mb-auto mr-auto')}>
                  <Image
                     src={imageSrc}
                     alt={`${username}'s avatar`}
                     width={0}
                     height={0}
                     className={`object-cover ${iconSizes.icon_primary} `}
                  />
               </div>

               {/* Text content */}
               <div className={`flex-1 ${displayStyles.flex_col_start_center}`}>
                  {/* username */}
                  <div className=" w-[100%] h-auto flex flex-col justify-start items-start">
                     <div
                        className={cn(`${textStyles.text_primary} break-all line-clamp-1 text-wrap wrap-anywhere overflow-hidden text-clip text-ellipsis ${displayStyles.flex_col_start_center}`)}
                        style={{}}
                     >
                        <span className="">
                           {username}
                        </span>
                     </div>
                  </div>
                  {/* last message */}
                  <div className="flex-1 w-full flex flex-col justify-start items-start">
                     <div className={` ${textStyles.text_secondary} break-all line-clamp-1 text-wrap truncate wrap-anywhere`}>
                        <span className="align-top">
                           {lastMessage}
                        </span>
                     </div>
                  </div>
               </div>
            </div>
         </div>

      </div>
   );
}


// components/ContactCard.jsx
import Image from "next/image";

const maxFontSize = {
   "h": "--size-h4",
   "md:": "--size-h3"
}


export default function ContactCard({ imageSrc, status, username, lastMessage, styles }) {
   return (
      <div
         className={`@container w-${styles?.height ? `[${styles.height}px]` : 'full'}  box-border border border-l-0  bg-gray-200 flex flex-row items-center`}
      >
         {/* status */}
         <div className="h-full w-[1%] md:w-[1%] bg-green-300"></div>
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
                        className={` h-[length:calc(1*var(--size-h5))]  md:h-[length:calc(1*var(--size-h4))] text-[length:var(--size-h5)] md:text-[length:var(--size-h4)] leading-[length:var(--size-h5)]  md:leading-[length:var(--size-h4)] leading-none font-semibold break-all tracking-tight line-clamp-1 text-wrap overflow-hidden text-clip text-ellipsis `}
                        style={{}}
                     >
                        <span className="align-top">
                           {username}
                        </span>
                     </div>
                  </div>
                  <div className="max-h-full max-w-full 
               text-[length:calc(0.8*var(--size-h6))] md:text-[length:var(--size-h5)] leading-[length:calc(2*0.8*var(--size-h6))]  md:leading-[length:calc(2*var(--size-h5))] break-all line-clamp-1 text-wrap tracking-tight truncate ">
                     <span className="">{lastMessage}</span>
                  </div>
                  <div className="min-h-[length:calc(0.6*var(--size-h4))] md:min-h-[length:calc(0.6*var(--size-h3))] grow shrink-0 w-full"></div>

               </div>
            </div>
         </div>

      </div>
   );
}

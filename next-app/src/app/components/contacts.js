import { Input } from "@/components/ui/input"


export default function ContactsArea() {
   return (
      <>
         <div className="w-full h-full text-(length:--font-size-2xl) 
         border-r-[calc(0.00104167*100vw)]  
         md:border-r-[calc(0.00104167*0.5*100vw)] relative">
            <Header
               searchbox={<div className="relative h-[3rem]">
                  <div className="absolute inset-x-1 inset-y-2">
                     <Input type="search" placeholder="Search" className={"rounded-xs h-8"} />
                  </div>
               </div>}
            />
         </div>
      </>
   )
}


import Image from "next/image";
import editLogo from '../../../public/edit-logo.svg'

//Tailwind 4 = 1rem, 1rem = 16px
//         1 = 0.25rem
//
function Header({ searchbox }) {
   return (
      <>
         <div className="absolute inset-x-0 h-[calc(clamp(1rem,2vw,2rem)+3rem)] w-full flex flex-col">
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
               <h1 className="text-[clamp(1rem,2vw,2rem)] text-foreground">Chats</h1>
               {
                  // here font actual height = 1.5 * font height
                  // Image is a replaced element
                  // 'object-contain' is used for replaced element
                  // to take same size of it's parent 
               }
               <div className="h-[calc(1.5*clamp(1rem,2vw,2rem))] aspect-square flex justify-center items-center">
                  <Image
                     src={editLogo}
                     alt="Edit Logo"
                     width={0}
                     height={0}
                     className="h-[calc(1*clamp(1rem,2vw,2rem))]
                     aspect-square 
                     object-contain"
                  />
               </div>

            </div>
            <div>{searchbox ? searchbox : <></>}</div>
         </div>
      </>)
}
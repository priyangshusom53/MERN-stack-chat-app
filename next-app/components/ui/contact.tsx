"use client"

import { HStack, Skeleton, SkeletonCircle, Stack } from "@chakra-ui/react"
import { Avatar } from "@chakra-ui/react"
import react from "react"

export const Contact = ({ contactName, lastMessage })=>{

   const [isLoading, setIsLoading] = react.useState(true)

   return(
      <>
         <div className="flex flex-col bg-black hover:bg-gray-800 gap-2 border border-white w-[98%] h-auto rounded-0">
            <p className="text-sm text-white font-medium ">{contactName}</p>
            <p className="text-xs text-gray-400">{lastMessage}</p>
         </div>
      </>
   )
}
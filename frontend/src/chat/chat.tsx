import { Avatar, Box, Button, Card, Flex } from "@chakra-ui/react"

export interface ChatPreview {
  id: string
  name: string
  time: Date
  lastMessage?: string
  avatarUrl?: string
}

export function ChatItem(
   { avatar, name, lastMessage, time }:
   {
      avatar:string,
      name:string,
      lastMessage:string,
      time:string
   }
) {
  return (
      <Box className="chat-item bg-gray-100 hover:bg-gray-400 flex flex-row w-full h-auto">
         <Box 
            className="avatar-container flex flex-col items-center justify-center px-auto w-1/4 aspect-square"

         >
            <Avatar.Root>
               <Avatar.Fallback name={name} />
               {/* <Avatar.Image src="https://bit.ly/sage-adebayo" /> */}
            </Avatar.Root>
         </Box>
         <Box className="contact-details flex flex-col itemas-center w-3/4"
            gapX={"2"}
            py={"auto"}
            h={"full"}
            my={"auto"}
         >
            <Box className="contact-name flex-1 text-sm font-bold text-black h-auto"
               p={"0"}
            >
               {name}
            </Box>
            <Box className="last-message flex-1 text-xs text-gray-500">   
               {lastMessage}  
            </Box>
         </Box>
      </Box>
  );
}
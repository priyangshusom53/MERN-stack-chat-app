import { Avatar, Box, Button, Card, Flex } from "@chakra-ui/react"


export default function ChatItem(
   { avatar, name, lastMessage, time }:
   {
      avatar:string,
      name:string,
      lastMessage:string,
      time:string
   }
) {
  return (
      <div className="chat-item flex flex-row w-full h-64">
         <div className="avatar-container flex w-1/4 aspect-square">
            <Avatar.Root>
               <Avatar.Fallback name={name} />
               {/* <Avatar.Image src="https://bit.ly/sage-adebayo" /> */}
            </Avatar.Root>
         </div>
         <div className="contact-details flex flex-col w-3/4 h-full gap-2">
            <div className="contact-name text-lg font-bold text-white">
               {name}
            </div>
            <div className="last-message text-sm text-gray-500">   
               {lastMessage}  
            </div>
         </div>
      </div>
  );
}
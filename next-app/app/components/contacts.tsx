
import { Avatar, HStack, VStack, Card } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"

const colorPalette = ["red", "blue", "green", "yellow", "purple", "orange"]

const pickPalette = (name?: string) => {
   if (name) {
      const index = name.charCodeAt(0) % colorPalette.length
      return colorPalette[index]
   }
   return "white"
}

interface ContactProps {
   name?: string;
   email?: string;
   imgLink?: string;
   lastMessage?: string;
}

export const ContactCard = ({ name, email, imgLink, lastMessage }: ContactProps) => {
   return (
      <Card.Root width="full" height="64px" backgroundColor="#FFFFFF" paddingX="1rem" variant="outline" key={email}>
         <HStack height="full" justifyContent="center" alignItems="center" rowGap="8px">
            <Avatar.Root height="36px" width="36px" colorPalette={pickPalette(name)}>
               <Avatar.Fallback name={name} />
               <Avatar.Image src={imgLink ? imgLink : (!name || name === "" ? "https://bit.ly/broken-link" : undefined)} />
            </Avatar.Root>
            <Card.Body height="full" padding={"0px"} justifyContent="center">
               <VStack padding="auto" alignItems="start">
                  <Card.Title>
                     <Text color="black" fontSize="14px" lineHeight="1">{name}</Text>
                  </Card.Title>
                  <Card.Description color="#626262" fontSize="12px" lineHeight="1.33">
                     {lastMessage}
                  </Card.Description>
               </VStack>
            </Card.Body>
         </HStack>
      </Card.Root>
   )
}
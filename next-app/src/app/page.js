import SideBar from "./_components/sidebar";
import ContactsArea from "./_components/contacts";
import ChatArea from "./_components/chatarea";

import HomePageContainer from "./_components/homepagecontainer";


export default function HomePage() {
   return (
      <>
         <div className="w-full h-full box-border p-0 m-0 border-0 flex justify-center items-center  bg-background text-foreground">
            <HomePageContainer
               sidebar={<SideBar />}
               contacts={<ContactsArea />}
               chatArea={<ChatArea />}
               className={"h-full w-full"}
            />
         </div>
      </>
   );
}
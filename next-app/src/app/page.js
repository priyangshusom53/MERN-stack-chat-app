import SideBar from "./components/sidebar";
import ContactsArea from "./components/contacts";
import ChatArea from "./components/chatarea";

import HomePageContainer from "./components/homepagecontainer";


export default function HomePage() {
   return (
      <>
         <div className="w-screen h-screen box-border p-0 m-0 border-0 flex justify-center items-center  bg-background text-foreground">
            <HomePageContainer
               sidebar={<SideBar />}
               contacts={<ContactsArea />}
               chatArea={<ChatArea />}
            />
         </div>
      </>
   );
}
import {
   ResizableHandle,
   ResizablePanel,
   ResizablePanelGroup,
} from "@/components/ui/resizable"



export default function HomePageContainer({ sidebar, contacts, chatArea, className }) {
   return (
      <>
         <div className={`w-[100vw] h-[100vh] shrink m-0 box-border flex flex-row ${className} `}>
            <div className="h-full shrink-0 flex flex-col justify-center items-center">{sidebar ? sidebar : <></>}</div>
            <div className="flex-1 shrink w-full h-full ">{chatArea ? chatArea : <></>}</div>
         </div>
      </>
   );
}
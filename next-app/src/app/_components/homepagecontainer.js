import {
   ResizableHandle,
   ResizablePanel,
   ResizablePanelGroup,
} from "@/components/ui/resizable"

export default function HomePageContainer({ sidebar, contacts, chatArea, className }) {
   return (
      <>
         <div className={` shrink m-0 box-border flex flex-row ${className} `}>
            <div className="h-full flex flex-col justify-center items-center">{sidebar ? sidebar : <></>}</div>
            <ResizablePanelGroup direction="horizontal" className={"w-full h-full shrink"}>
               {/* Contact section */}
               <ResizablePanel defaultSize={30} minSize={30} maxSize={50} className={"flex-1 shrink"}>
                  <div className="w-full h-full">{contacts ? contacts : <></>}</div>
               </ResizablePanel>
               {/* seperator handle */}
               <ResizableHandle />
               {/* Chat section */}
               <ResizablePanel defaultSize={70} minSize={50} maxSize={70} className={"flex-1 shrink"}><div className="w-full h-full">{chatArea ? chatArea : <></>}</div></ResizablePanel>
            </ResizablePanelGroup>

         </div>
      </>
   );
}
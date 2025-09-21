import {
   ResizableHandle,
   ResizablePanel,
   ResizablePanelGroup,
} from "@/components/ui/resizable"

import { cn } from "@/lib/utils.js";

export default function HomePageContainer({ children, className }) {
   return (
      <>
         <div className={cn(`w-[100vw] h-[100vh] shrink m-0 box-border flex flex-row`, className)}>
            {children}
         </div>
      </>
   );
}
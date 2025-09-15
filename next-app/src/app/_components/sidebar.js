import styles from './sidebar.module.css'
import { SidebarTrigger } from "@/components/ui/sidebar"
import { PanelLeftIcon } from "lucide-react"
export default function SideBar() {
   return (
      <>
         <div className='w-auto h-full flex flex-col justify-between items-center gap-[calc(0.014652*0.92*100vh)]
         border-r-1 
         md:border-r-1'>
            {/* sidebar button */}
            <div className=' h-[length:var(--size-h4)] md:h-[length:var(--size-h3)] flex flex-col justify-start items-center px-1 md:px-3 mt-[length:calc(0.6*var(--size-h4))] md:mt-[length:calc(0.6*var(--size-h3))] mb-[length:calc(0.6*var(--size-h4))] md:mb-[length:calc(0.6*var(--size-h3))]'>
               <div className=' h-full mx-auto aspect-square flex flex-row justify-center items-center '>
                  <div className='size[100%] aspect-square flex justify-center items-center'>
                     <SidebarTrigger className={`inline-block box-border size-[100%] aspect-square flex-1 flex flex-col justify-center items-center rounded-xs`} />
                  </div>
               </div>
            </div>
            <div className='w-full flex flex-col justify-end items-center'>
               <div className='w-2/4  aspect-square bg-gray-200  p-0 m-0 '></div>
               <div className='w-2/4  aspect-square bg-gray-200  p-0 m-0 '></div>
               <div className='w-2/4  aspect-square bg-gray-200  p-0 m-0 '></div>
               <div className='w-2/4  aspect-square bg-gray-200  p-0 m-0 '></div>
            </div>

         </div>

      </>);
}
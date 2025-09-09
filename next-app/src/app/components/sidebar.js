import styles from './sidebar.module.css'

export default function SideBar() {
   return (
      <>
         <div className='w-full h-full flex flex-col justify-end items-center gap-4
         border-r-[calc(0.00104167*100vw)] 
         md:border-r-[calc(0.00104167*100vw*0.5)]'>
            <div className='w-3/4  aspect-square bg-gray-200  p-0 m-0 '></div>
            <div className='w-3/4  aspect-square bg-gray-200  p-0 m-0 '></div>
            <div className='w-3/4  aspect-square bg-gray-200  p-0 m-0 '></div>
            <div className='w-3/4  aspect-square bg-gray-200  p-0 m-0 '></div>
         </div>

      </>);
}
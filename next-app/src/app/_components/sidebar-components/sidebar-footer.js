

export default function SidebarFooter({ components }) {
   return (<>
      <div className="box-border px-2 md:px-6 sticky bottom-0 left-0 w-full flex flex-col justify-center items-center overflow-hidden">
         {components ? components : <></>}
      </div>
   </>)
}


export default function HomePageContainer({ sidebar, contacts, chatArea }) {
   return (
      <>
         <div className="w-92/100 h-92/100 m-0 box-border 
         border-[calc(0.00104167*100vw*2)]
         md:border-[calc(0.00104167*100vw)]  flex flex-row ">
            <div className="w-4/100">{sidebar ? sidebar : <></>}</div>
            <div className="flex-1">{contacts ? contacts : <></>}</div>
            <div className="flex-2">{chatArea ? chatArea : <></>}</div>
         </div>
      </>
   );
}
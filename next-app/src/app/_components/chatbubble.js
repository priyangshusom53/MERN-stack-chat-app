

export default function ChatBubble({ message, type }) {
   return (
      <>
         <div className={`max-w-[70%] md:max-w-[60%] bg-gray-300 px-2 md:px-4 py-2 rounded-lg ${(type === 'sent') ? 'rounded-br-xs ml-auto' : 'rounded-bl-xs'} `}>
            <div className="text-[length:calc(0.8*var(--size-h6))] md:text-[length:var(--size-h5)] leading-[length:calc(1.2*0.8*var(--size-h6))]  md:leading-[length:calc(2*var(--size-h5))] break-all line-clamp-none text-wrap tracking-tight ">
               <span>
                  {message}
               </span>
            </div>
         </div>
      </>
   )
}
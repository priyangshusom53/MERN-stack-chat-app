

export function MessageBlob(
   {message, isOwnMessage, timestamp}:
   {
      message:string, 
      isOwnMessage:boolean,
      timestamp?:Date
   }
){
   return (
      <div className="message-blob-container">
         <p>{message}</p>
      </div>
   )
}
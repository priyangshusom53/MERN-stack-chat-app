
export interface User{
   id:string;
   name:string;
   email:string;
   chats:string[];
   about?:string;
   avatarUrl?:string;
   createdAt?:string;
   updatedAt?:string;
}
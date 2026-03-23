
export interface User{
   id:string;
   name:string;
   email:string;
   profilePicUrl:string|null;
   about:string | null;
   createdAt:Date;
   updatedAt:Date;
}
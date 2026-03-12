
import type { DocumentDatabase, UserDocType } from "./dbInterface.js";
import type { UserDataAccess } from "../../dataAccess/userDataAccess.js";
import { User } from "../../core/user.js";
import type { IDataBase } from "../db.js";

export class UserRepo implements UserDataAccess {
   db: IDataBase;
   tableName: string;
   // constructor(db: DocumentDatabase) { this.db = db }
   constructor(db: IDataBase, tableName: string) { 
      this.db = db
      this.tableName = tableName
   }

   async CreateUser(userDetails: { name: string; email: string; password: string; }): Promise<User | null> {
      const res = await this.db.create(this.tableName, { email: userDetails.email, name: userDetails.name, password: userDetails.password })

      if (!res) return null
      const user = new User(res._id.toString(), res.name, res.email, res.password, res.createdAt, res.profilePic ?? undefined, res.contacts ?? undefined)

      return user
   }

   async FindUserById(id: string): Promise<User | null> {
      const res = await this.db.findOne(this.tableName, { _id: id })

      if (!res) return null


      
      const user = new User(res._id.toString(), res.name, res.email, res.password, res.createdAt, res.profilePic ?? undefined, res.contacts ?? undefined);

      return user
   }

   async FindUserByEmail(email: string): Promise<User | null> {
      const res = await this.db.findOne(this.tableName, { email: email })

      if (!res) return null


      const user = new User(res._id.toString(), res.name, res.email, res.password, res.createdAt, res.profilePic ?? undefined, res.contacts ?? undefined);

      return user
   }
}
   // async AddContact(userId: string, contactEmail: string): Promise<User | null> {
   //    const res = await this.db.Query('User', { _id: userId }) as UserDocType[];

   //    const contacts = await this.db.Query('User', { email: contactEmail }) as UserDocType[];

   //    if (res[0] && contacts[0]) {
   //       if (res.length === 1 && contacts.length === 1) {
   //          const user = res[0]
   //          const contact = contacts[0]
   //          const updatedContacts = user.contacts?.push(contact.id)
   //          const updatedUser = await this.db.Update('User', userId, { contacts: updatedContacts })

   //          return new User(user.id, user.name, user.email, user.password, user.createdAt, user.profilePic ?? undefined, user.contacts ?? undefined, user.blockedContacts ?? undefined, user.about ?? undefined, user.age ?? undefined, user.gender ?? undefined);
   //       }
   //    }

   //    return null
   // }
   // async GetContacts(id: string): Promise<User[] | null> {

   // }
   // async DeleteContact(contactEmail: string): object {

   // }
   // async UpdateUser(updatedData: object): Promise<User> {

   // }

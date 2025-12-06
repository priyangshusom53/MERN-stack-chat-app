import mongoose from "mongoose";
import type { UserDocument } from "../_models/user.js";

interface BaseDocType extends Object {
   id: string;
}

export interface UserDocType extends BaseDocType {
   name: string;
   email: string;
   password: string;
   profilePic?: string | null;
   contacts?: string[];
   blockedContacts?: string[];
   about?: string | null;
   age?: number | null;
   gender?: "male" | "female" | "other" | string | null;
   createdAt: Date;
   updatedAt?: Date;
}

export interface DocumentDatabase {
   Query(collection: string, query: object): Promise<object[] | null>;

   Save(collection: string, partialDoc: object): Promise<object | null>;

   Update(collection: string, id: string, updates: object): Promise<object | object[] | null> | object | null;
}



export class MongoDatabase implements DocumentDatabase {

   User: mongoose.Model<UserDocument>;

   constructor(userModel: mongoose.Model<UserDocument>) {
      this.User = userModel
   }

   async Query(collection: string, filter: object): Promise<object[] | null> {
      if (collection === 'User') {
         const docs = await this.User.find(filter)
         if (!docs) return null

         const out = docs.map((doc) => {
            return {
               id: doc.id,
               name: doc.name,
               email: doc.email,
               password: doc.password,
               profilePic: doc.profilePic,
               contacts: doc.stringContacts,
               blockedContacts: doc.blockedContacts,
               about: doc.about,
               age: doc.age,
               gender: doc.gender,
               createdAt: doc.createdAt,
               updatedAt: doc.updatedAt
            }
         })
         return out
      }
      if (collection === 'Message') {
         return null
      }
      return null

   }
   async Save(collection: string, partialDoc: object): Promise<object | null> {
      if (collection === 'User') {
         const doc = new this.User(partialDoc)

         const savedDoc = await doc.save()

         if (!savedDoc) return null
         const out = {
            id: savedDoc.id,
            name: savedDoc.name,
            email: savedDoc.email,
            password: savedDoc.password,
            profilePic: savedDoc.profilePic,
            contacts: savedDoc.stringContacts,
            blockedContacts: savedDoc.blockedContacts,
            about: savedDoc.about,
            age: savedDoc.age,
            gender: savedDoc.gender,
            createdAt: savedDoc.createdAt,
            updatedAt: savedDoc.updatedAt
         }
         return out
      }
      return null
   }
   async Update(collection: string, id: string, updates: object): Promise<object | object[] | null> {
      if (collection === 'User') {
         const doc = await this.User.findOne({ _id: id })

         if (!doc) return null

         for (let key of Object.keys(updates)) {
            if (key in doc) {
               doc[key as keyof UserDocument] = updates[key as keyof object]
            }
         }
         const updatedDoc = await doc.save()
         return updatedDoc
      }
      return null
   }
}
import mongoose, { Model, Schema, Connection, Document } from "mongoose";

import { messageSchema } from "./message.js";

// types
import { type DataBase } from "../db.js";
import { type IMessage } from './message.js'

export interface IUser extends Document {
   _id: mongoose.Types.ObjectId;
   email: string;
   password: string;
   name: string;
   avatarUrl?: string;
   contacts: {
      contact: mongoose.Types.ObjectId;
      chatDeleted: boolean;
      messageCount: number;
      currentMessageCount: number;
      lastMessage: mongoose.Types.ObjectId | null;
   }[];
   createdAt: Date;
}


export const userSchema = new Schema<IUser>({
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   name: { type: String, required: true },
   avatarUrl: { type: String },
   contacts: [{
      contact: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      chatDeleted: Boolean,
      messageCount: Number,
      currentMessageCount: Number,
      lastMessage: mongoose.Schema.Types.ObjectId,
   }],
   createdAt: { type: Date, default: Date.now, immutable: true },
})


export const userCollection = "Users";
let User: Model<IUser> | null = null;
export const setModel = (db: DataBase) => {
   User = db.createCollection('User', userSchema, 'Users')
}
export const getModel = (db: DataBase) => {
   return db.createCollection<IUser>('User', userSchema, 'Users')
}


export type UserData = {
   email: string
   password: string
   name: string
   avatarUrl?: string
}

export const addUser = async (db: DataBase, userData: UserData) => {
   if (db.isConnected) {
      // Check if user with the same email already exists
      if (await findUserByEmail(db, userData.email) !== null) {
         throw new Error("User with this email already exists");
      }
      // Create a new user instance
      if (User) {
         const user = new User({
            email: userData.email,
            password: userData.password,
            name: userData.name,
            avatarUrl: userData.avatarUrl || "",
            contacts: [],
            createdAt: Date.now()
         });
         try {
            const savedUser = await user.save();
            console.log("User saved:", savedUser);
            return savedUser;
         } catch (err: any) {
            throw new Error(`Error saving user: ${err.message}`);
         }
      }
      throw new Error('User Collection does not exist')
   }
   else {
      throw new Error("DB not connected");
   }
}

export const findUserById = async (db: DataBase, Id: mongoose.Types.ObjectId): Promise<IUser | null> => {
   if (db.isConnected) {
      try {
         if (User) {
            const user = await User.findById(Id);
            return user;
         }
         throw new Error(`User Collection does not exist`);
      } catch (err: any) {
         throw new Error(`Error finding user by ID: ${err.message}`)
      }
   }
   else {
      throw new Error("DB not connected");
   }
}

export const findUserByEmail = async (db: DataBase, email: string): Promise<IUser | null> => {
   if (db.isConnected) {
      try {
         if (User) {
            const user = await User.findOne({ email: email });
            return user;
         }
         throw new Error(`User Collection does not exist`);
      } catch (err: any) {
         throw new Error(`Error finding user by email: ${err.message}`);
      }
   }
   else {
      throw new Error("DB not connected");
   }
}

export const userExists = async (db: DataBase, email: string) => {
   if (db.isConnected) {
      try {
         if (User) {
            const user = await User.findOne({ email: email });
            return user !== null;
         }
         throw new Error(`User Collection does not exist`)
      } catch (err: any) {
         throw new Error(`Error checking if user exists: ${err.message}`);
      }
   }
   else {
      throw new Error("DB not connected");
   }
}

export const validateUserCredentials = async (db: DataBase, email: string, password: string) => {
   if (db.isConnected) {
      try {
         if (User) {
            const user = await User.findOne({ email: email, password: password });
            return user !== null;
         }
         throw new Error(`User Collection does not exist`)
      } catch (err: any) {
         throw new Error(`Error validating user credentials: ${err.message}`);
      }
   }
   else {
      throw new Error("DB not connected");
   }
}

export const addContact = async (db: DataBase, userId: mongoose.Types.ObjectId, contactId: mongoose.Types.ObjectId): Promise<IUser> => {
   if (db.isConnected) {
      try {
         if (User) {
            const user = await User.findById(userId);
            if (user === null) throw new Error(`user with userID: ${userId} does not exist`)

            const contacts = user.contacts
            if (contacts.some((c) => { return c.contact.equals(contactId) })) {
               throw new Error("Contact already added")
            } else {
               const contact = await User.findById(contactId);
               if (!contact) {
                  throw new Error("Contact not found");
               }
               user.contacts.push(
                  {
                     contact: contact._id,
                     chatDeleted: false,
                     messageCount: 0,
                     currentMessageCount: 0,
                     lastMessage: null
                  });
               await user.save();
               return user;
            }
         }
         throw new Error(`User Collection does not exist`)
      } catch (err: any) {
         throw new Error(`Error adding contact ${err.message}`);
      }
   }
   else {
      throw new Error("DB not connected");
   }
}


export const getContacts = async (db: DataBase, userId: mongoose.Types.ObjectId) => {
   if (db.isConnected) {
      try {
         if (User) {
            const user = await User.aggregate([
               // 1️⃣ Match the specific user
               {
                  $match: { _id: userId }
               },

               // 2️⃣ Lookup the contact users
               {
                  $lookup: {
                     from: "users",
                     let: { contactsList: "$contacts" },
                     pipeline: [
                        {
                           $match: {
                              $expr: {
                                 $in: [
                                    "$_id",
                                    { $map: { input: "$$contactsList", as: "c", in: "$$c.contact" } }
                                 ]
                              }
                           }
                        },
                        {
                           $project: { name: 1, email: 1, avatarUrl: 1 }
                        }
                     ],
                     as: "contactUsers"
                  }
               },

               // 3️⃣ Lookup the last messages
               {
                  $lookup: {
                     from: "messages",
                     let: { contactsList: "$contacts" },
                     pipeline: [
                        {
                           $match: {
                              $expr: { $in: ["$_id", { $map: { input: "$$contactsList", as: "c", in: "$$c.lastMessage" } }] }
                           }
                        }
                     ],
                     as: "contactMessages"
                  }
               },

               // 4️⃣ Rebuild the contacts array with populated data
               {
                  $addFields: {
                     contacts: {
                        $map: {
                           input: "$contacts",
                           as: "c",
                           in: {
                              contact: {
                                 $first: {
                                    $filter: {
                                       input: "$contactUsers",
                                       as: "cu",
                                       cond: { $eq: ["$$cu._id", "$$c.contact"] }
                                    }
                                 }
                              },
                              chatDeleted: "$$c.chatDeleted",
                              messageCount: "$$c.messageCount",
                              currentMessageCount: "$$c.currentMessageCount",
                              lastMessage: {
                                 $first: {
                                    $filter: {
                                       input: "$contactMessages",
                                       as: "cm",
                                       cond: { $eq: ["$$cm._id", "$$c.lastMessage"] }
                                    }
                                 }
                              }
                           }
                        }
                     }
                  }
               },

               // 5️⃣ Optionally remove sensitive fields (like password)
               {
                  $project: {
                     password: 0
                  }
               }
            ]);
            if (!user?.length) {
               throw new Error(`User with id: ${userId} does not exist`)
            }
            if (!user[0].contacts.length) return []
            // seperate empty contacts
            const emptyContacts = user[0].contacts.filter((contact: any) => {
               return contact.isDeleted || (!contact.lastMessage)
            })
            // take only conatcts with messages and sort them in 
            // descending order of lastmessage:timestamp
            const contacts = user[0].contacts.filter((c: any) => c.lastMessage?.timestamp && (!c.isDeleted))
               .sort((a: any, b: any) => {
                  return (new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime());
               })
            // add empty contacts at the end of 'contacts' array 
            emptyContacts.forEach((emptyContact: any) => {
               contacts.push(emptyContact)
            })
            return contacts;
         }
         throw new Error(`User Collection does not exist`)
      } catch (err: any) {
         throw new Error(`Error getting contacts ${err.message}`);
      }
   }
   else {
      throw new Error("DB not connected");
   }
}

export const getUser = async (db: DataBase, userId: mongoose.Types.ObjectId): Promise<IUser | null> => {
   if (db.isConnected) {
      try {
         if (User) {
            const user = await User.findById(userId);
            return user;
         }
         throw new Error(`User Collection does not exist`)
      } catch (err: any) {
         throw new Error(`Error getting user: ${err.message}`);
      }
   }
   else {
      throw new Error("DB not connected");
   }
}

export const getUserByEmail = async (db: DataBase, email: string) => {
   if (db.isConnected) {
      try {
         if (User) {
            const user = await User.findOne({ email: email });
            return user;
         }
         throw new Error(`User Collection does not exist`)
      } catch (err: any) {
         throw new Error(`Error getting user by email: ${err.message}`);
      }
   }
   else {
      throw new Error("DB not connected");
   }
}

export const deleteUser = async (db: DataBase, userId: mongoose.Types.ObjectId) => {
   if (db.isConnected) {
      try {
         if (User) {
            await User.findByIdAndDelete(userId);
            return true;
         }
         throw new Error(`User Collection does not exist`)
      } catch (err: any) {
         throw new Error(`Error deleting user: ${err.message}`);
      }
   }
   else {
      throw new Error("DB not connected");
   }
}

// export const updateUser = async (db, userId, updateData) => {
//    if (db.isConnected) {
//       try {
//          const user = await User.findById(userId);
//          if (!user) {
//             return new Error("User not found");
//          }
//          Object.keys(updateData).forEach(key => {
//             user[key] = updateData[key];
//          });
//          await user.save();
//          return user;
//       } catch (err) {
//          console.log("Error updating user:", err.message);
//          return new Error("Error updating user");
//       }
//    }
//    else {
//       return new Error("DB not connected");
//    }
// }
import mongoose from "mongoose";
import { UserModel as User, UserSchema } from "../db/_models/user.js";
import { type IUser, userSchema } from "../db/models/user.js"

async function migrate() {
   await mongoose.connect("mongoURI");

   const connection = mongoose.connection.useDb("chat-app")
   const userModel = connection.model<IUser>("User", userSchema, "Users")
   const users = await userModel.find({}); // lean so we don't get full Mongoose docs

   console.log(`Found ${users.length} users to migrate`);

   for (const u of users) {
      const update: any = {};

      // avatarUrl -> profilePic (only if profilePic is not already set)
      if ((u as any).avatarUrl) {
         update.profilePic = (u as any).avatarUrl;
      }

      // contacts: [{ contact, ... }] -> [ObjectId]
      if (Array.isArray(u.contacts) && u.contacts.length && typeof u.contacts[0] === "object") {
         update.contacts = (u.contacts as any[])
            .map((c) => c?.contact)
            .filter(Boolean)
      }

      // ensure blockedContacts exists
      if (!Array.isArray((u as any).blockedContacts)) {
         update.blockedContacts = [];
      }

      // optionally remove old fields
      const unset: any = {};
      if ((u as any).avatarUrl) unset.avatarUrl = 1;
      // also optionally: unset chat-related fields if you no longer use them
      // unset["contacts.$[].chatDeleted"] = 1; // can't use like this in updateOne; better to just overwrite contacts
      console.log(update)
      console.log(unset)
      if (Object.keys(update).length || Object.keys(unset).length) {
         const newUserModel = connection.model("User", UserSchema, "Users")
         await newUserModel.updateOne(
            { _id: u._id },
            {
               ...(Object.keys(update).length ? { $set: update } : {}),
               ...(Object.keys(unset).length ? { $unset: unset } : {}),
            }
         );
      }
   }

   console.log("Migration done");
   await mongoose.disconnect();
}

migrate().catch((err) => {
   console.error(err);
   process.exit(1);
});


import mongoose, { Schema, Document, Model } from "mongoose";

export interface UserDocument extends Document {
   // MongoDB ObjectId is accessible as _id; keep id getter if you want string id
   _id: mongoose.Types.ObjectId;
   name: string;
   email: string;
   password: string; // hashed
   profilePic?: string | null;
   contacts?: mongoose.Types.ObjectId[];   // refs to users
   stringContacts?: string[];
   blockedContacts?: mongoose.Types.ObjectId[];
   about?: string | null;
   age?: number | null;
   gender?: "male" | "female" | "other" | string | null;
   createdAt: Date;
   updatedAt?: Date;
}

export const UserSchema = new Schema<UserDocument>(
   {
      name: { type: String, required: true, trim: true, maxlength: 100 },
      email: { type: String, required: true, unique: true, lowercase: true, trim: true },
      password: { type: String, required: true }, // hashed
      profilePic: { type: String, default: null },
      contacts: [{ type: Schema.Types.ObjectId, ref: "User" }],        // small lists OK
      blockedContacts: [{ type: Schema.Types.ObjectId, ref: "User" }],
      about: { type: String, default: null, maxlength: 1000 },
      age: { type: Number, default: null, min: 0 },
      gender: { type: String, enum: ["male", "female", "other", null], default: null },
   },
   { timestamps: true } // creates createdAt and updatedAt
);

// Virtual to expose id as string
UserSchema.virtual("id").get(function () {
   return this._id.toHexString();
});

UserSchema.virtual("stringContacts").get(function () {
   const stringContacts = this.contacts?.map((contact: mongoose.Types.ObjectId) => {
      return contact.toHexString();
   })
   return stringContacts;
})

UserSchema.set("toJSON", { virtuals: true });
UserSchema.set("toObject", { virtuals: true });

export const UserModel: Model<UserDocument> = mongoose.model<UserDocument>("User", UserSchema, "Users");

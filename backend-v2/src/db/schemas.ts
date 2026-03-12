import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name:            { type: String, required: true, trim: true, maxlength: 100 },

  email:           { type: String, required: true, unique: true, lowercase: true, trim: true },

  password:        { type: String, required: true},

  profilePic:      { type: String, default: null },

  contacts:        [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

//   blockedContacts: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

//   about:           { type: String, default: null, maxlength: 500 },

//   age:             { type: Number, default: null, min: 0 },

//   gender:          { type: String, default: null },

  createdAt:       { type: Date, default: Date.now },
});

export {UserSchema}
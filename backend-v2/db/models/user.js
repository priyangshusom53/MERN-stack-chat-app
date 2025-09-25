import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   name: { type: String, required: true },
   avatarUrl: { type: String },
   contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
   createdAt: { type: Date, default: Date.now, immutable: true },

})

export const userCollection = "Users";
let User = null;
export const setModel = (db) => {
   User = db.createCollection('User', userSchema, 'Users')
}


export const addUser = async (db, userData) => {
   if (db.isConnected) {
      if (userData?.email === null) return new Error("Email is required");
      if (userData?.password === null) return new Error("Password is required");
      if (userData?.name === null) return new Error("Name is required");

      // Check if user with the same email already exists
      if (await findUserByEmail(db, userData.email) !== null) {
         return new Error("User with this email already exists");
      }
      // Create a new user instance
      const user = new User({
         email: userData.email,
         password: userData.password,
         name: userData.name,
         avatarUrl: userData?.avatarUrl || "",
         contacts: [],
         createdAt: Date.now()
      });

      try {
         const savedUser = await user.save();
         console.log("User saved:", savedUser);
         return savedUser;
      } catch (err) {
         console.log("Error saving user:", err.message);
         return new Error("Error saving user");
      }
   }
   else {
      return new Error("DB not connected");
   }

}

export const findUserById = async (db, Id) => {
   if (db.isConnected) {

      try {
         const user = await User.findById(Id);
         return user;
      } catch (err) {
         console.log("Error finding user by ID:", err.message);
         return new Error("Error finding user by ID");
      }
   }
   else {
      return new Error("DB not connected");
   }
}

export const findUserByEmail = async (db, email) => {
   if (db.isConnected) {
      try {
         const user = await User.findOne({ email: email });
         return user;
      } catch (err) {
         console.log("Error finding user by email:", err.message);
         return new Error("Error finding user by email");
      }
   }
   else {
      return new Error("DB not connected");
   }
}

export const userExists = async (db, email) => {
   if (db.isConnected) {
      try {
         const user = await User.findOne({ email: email });
         return user !== null;
      } catch (err) {
         console.log("Error checking if user exists:", err.message);
         return new Error("Error checking if user exists");
      }
   }
   else {
      return new Error("DB not connected");
   }
}

export const validateUserCredentials = async (db, email, password) => {
   if (db.isConnected) {
      try {
         const user = await User.findOne({ email: email, password: password });
         return user !== null;
      } catch (err) {
         console.log("Error validating user credentials:", err.message);
         return new Error("Error validating user credentials");
      }
   }
   else {
      return new Error("DB not connected");
   }
}

export const addContact = async (db, userId, contactId) => {
   if (db.isConnected) {
      try {

         const contact = await User.findById(contactId);
         if (!contact) {
            return new Error("Contact not found");
         }
         const user = await User.findById(userId);
         user.contacts.push(contact._id);
         await user.save();
         return user;
      } catch (err) {
         console.log("Error adding contact:", err.message);
         return new Error("Error adding contact");
      }
   }
   else {
      return new Error("DB not connected");
   }
}

export const getContacts = async (db, userId) => {
   if (db.isConnected) {
      try {
         const user = await User.findById(userId).populate('contacts');
         return user.contacts;
      } catch (err) {
         console.log("Error getting contacts:", err.message);
         return new Error("Error getting contacts");
      }
   }
   else {
      return new Error("DB not connected");
   }
}

export const getUser = async (db, userId) => {
   if (db.isConnected) {
      try {
         const user = await User.findById(userId);
         return user;
      } catch (err) {
         console.log("Error getting user:", err.message);
         return new Error("Error getting user");
      }
   }
   else {
      return new Error("DB not connected");
   }
}

export const getUserByEmail = async (db, email) => {
   if (db.isConnected) {
      try {
         const user = await User.findOne({ email: email });
         return user;
      } catch (err) {
         console.log("Error getting user by email:", err.message);
         return new Error("Error getting user by email");
      }
   }
   else {
      return new Error("DB not connected");
   }
}

export const deleteUser = async (db, userId) => {
   if (db.isConnected) {
      try {
         await User.findByIdAndDelete(userId);
         return true;
      } catch (err) {
         console.log("Error deleting user:", err.message);
         return new Error("Error deleting user");
      }
   }
   else {
      return new Error("DB not connected");
   }
}

export const updateUser = async (db, userId, updateData) => {
   if (db.isConnected) {
      try {
         const user = await User.findById(userId);
         if (!user) {
            return new Error("User not found");
         }
         Object.keys(updateData).forEach(key => {
            user[key] = updateData[key];
         });
         await user.save();
         return user;
      } catch (err) {
         console.log("Error updating user:", err.message);
         return new Error("Error updating user");
      }
   }
   else {
      return new Error("DB not connected");
   }
}
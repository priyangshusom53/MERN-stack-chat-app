import mongoose from "mongoose";

export async function connect() {
   try {
      if (this.isConnected === false) {
         if (!this.connectionString) {
            throw new Error("Connection string is null or not defined");
         }
         await mongoose.connect(this.connectionString);
         console.log("Connected to MongoDB user: priyangshusom975_db_user");
         this.isConnected = true;
      }
      else {
         return new Promise((resolve, reject) => {
            resolve("Already connected to DB");
         });
      }

   } catch (err) {
      console.log("Error connecting to MongoDB:", err);
      this.isConnected = false;
   }
}

export async function closeDb() {
   try {
      if (this.isConnected) {
         await mongoose.connection.close();
         console.log("MongoDB connection closed.");
         this.isConnected = false;
      } else {
         console.log("No active MongoDB connection to close.");
      }
   } catch (err) {
      console.log("Error closing MongoDB connection:", err);
   }
}

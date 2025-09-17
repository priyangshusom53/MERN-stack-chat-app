import mongoose from "mongoose";


export const dbExists = async (dbName) => {
   const admin = mongoose.connection.db.admin();

   // List all databases
   const { databases } = await admin.listDatabases();
   const exists = databases.some(db => db.name === dbName);
   return exists;
}

export const createDatabase = async (dbName) => {
   const exists = await dbExists(dbName);
   if (!exists) {
      const db = mongoose.connection.useDb(dbName, { useCache: true });
      console.log(`Database ${dbName} created.`);
      mongoose.connection = db;
      return db;
   }
   else {
      return new Error("Database already exists");
   }
}

export const useDatabase = async (dbName) => {
   const exists = await dbExists(dbName);
   if (exists) {
      const db = mongoose.connection.useDb(dbName, { useCache: true });
      console.log(`Switched to database: ${dbName}`);
      mongoose.connection = db;
      return db;
   }
   else {
      return new Error("Database does not exist");
   }
}

export const deleteDatabase = async (dbName) => {
   const exists = await dbExists(dbName);
   if (exists) {
      const db = mongoose.connection.useDb(dbName);
      await db.dropDatabase();
      console.log(`Database ${dbName} deleted.`);
   }
   else {
      return new Error("Database does not exist");
   }
}

export const currentDatabase = () => {
   return mongoose.connection.name;
}
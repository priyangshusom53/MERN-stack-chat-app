import mongoose from "mongoose";


export const dbExists = async (dbName: string) => {
   const admin = mongoose.connection.db?.admin();

   // List all databases
   if (admin) {
      const { databases } = await admin.listDatabases();
      const exists = databases.some(db => db.name === dbName);
      return exists;
   }
   return false;
}

export const createDatabase = async (dbName: string) => {
   const exists = await dbExists(dbName);
   if (!exists) {
      const db = mongoose.connection.useDb(dbName, { useCache: true });
      console.log(`Database ${dbName} created.`);
      return db;
   }
   else {
      console.error("Database already exists")
      return null
   }
}

export const useDatabase = async (dbName: string) => {
   const exists = await dbExists(dbName);
   if (exists) {
      const db = mongoose.connection.useDb(dbName, { useCache: true });
      console.log(`Switched to database: ${dbName}`);
      return db;
   }
   else {
      console.error("Database does not exists")
      return null
   }
}

export const deleteDatabase = async (dbName: string) => {
   const exists = await dbExists(dbName);
   if (exists) {
      const db = mongoose.connection.useDb(dbName);
      await db.dropDatabase();
      console.log(`Database ${dbName} deleted.`);
   }
   else {
      console.error("Database does not exists")
      return null
   }
}

export const currentDatabase = () => {
   return mongoose.connection.name;
}
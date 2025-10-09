

// export class DBConn {
//    isConnected = false;
//    connectionString = null;
//    constructor(connectionString) {
//       this.isConnected = false;
//       this.connectionString = connectionString;
//    }
// }

// import { connect } from "./connectdb.js";
// DBConn.prototype.connect = connect;


import mongoose from "mongoose";
import { dbExists, useDatabase, createDatabase } from "./dbConfig.js";

// types
import { type IUser } from "./models/user.js";

export class DB {
   isConnected: boolean = false
   connectionString: string | null = null
   dbName: string = ''
   connection: mongoose.Connection | null = null
   modelNames: string[] = []

   constructor(connectionString: string, dbName: string) {
      this.connectionString = connectionString
      this.dbName = dbName
   }

   async connect() {
      try {
         if (this.isConnected === false) {
            if (!this.connectionString) {
               throw new Error("Connection string is null or not defined");
            }
            await mongoose.connect(this.connectionString);
            console.log(`Connected to MongoDB: ${this.connectionString}`);
            this.isConnected = true;
            return
         }
         else {
            console.log(`Already connected to DB: ${this.connectionString}`)
            return
         }

      } catch (err) {
         console.error("Error connecting to MongoDB:", err);
         this.isConnected = false;
      }
   }

   status(): mongoose.ConnectionStates {
      return mongoose.connection.readyState
   }

   async useDB() {
      try {
         const exist = await dbExists(this.dbName)
         if (exist) {
            this.connection = await useDatabase(this.dbName)
         } else {
            this.connection = await createDatabase(this.dbName)
         }
      } catch (err: any) {
         console.log(err.message)
      }
   }

   createCollection<TMongooseDocType>(modelName: string, schema: mongoose.Schema, collectionName: string): mongoose.Model<TMongooseDocType> | null {
      this.modelNames.push(modelName)
      if (this.connection) {
         return this.connection.model<TMongooseDocType>(modelName, schema, collectionName)
      }
      return null
   }

   useCollection(modelName: string) {
      return this.connection?.model<IUser>(modelName)
   }
}

export type DataBase = DB;


export class DBConn {
   isConnected = false;
   connectionString = null;
   constructor(connectionString) {
      this.isConnected = false;
      this.connectionString = connectionString;
   }
}

import { connect } from "./connectdb.js";
DBConn.prototype.connect = connect;


import mongoose from "mongoose";
import { dbExists, useDatabase, createDatabase } from "./dbconfig.js";

export class DB {
   isConnected = false
   connectionString = null
   dbName = null
   connection = mongoose.connection
   modelNames = []

   constructor(connectionString, dbName) {
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
         }
         else {
            console.log(`Already connected to DB: ${this.connectionString}`)
            return
         }

      } catch (err) {
         console.log("Error connecting to MongoDB:", err);
         this.isConnected = false;
      }
   }

   status() {
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
      } catch (err) {
         console.log(err.message)
      }
   }

   createCollection(modelName, schema, collectionName) {
      this.modelNames.push(modelName)
      return this.connection.model(modelName, schema, collectionName)
   }

   useCollection(modelName) {
      return this.connection.model(modelName)
   }
}
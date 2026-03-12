

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


// import mongoose from "mongoose";
// import { dbExists, useDatabase, createDatabase } from "./dbConfig.js";

// // types
// import { type IUser } from "./models/user.js";

// export class DB {
//    isConnected: boolean = false
//    connectionString: string | null = null
//    dbName: string = ''
//    connection: mongoose.Connection | null = null
//    modelNames: string[] = []

//    constructor(connectionString: string, dbName: string) {
//       this.connectionString = connectionString
//       this.dbName = dbName
//    }

//    async connect() {
//       try {
//          if (this.isConnected === false) {
//             if (!this.connectionString) {
//                throw new Error("Connection string is null or not defined");
//             }
//             await mongoose.connect(this.connectionString);
//             console.log(`Connected to MongoDB: ${this.connectionString}`);
//             this.isConnected = true;
//             return
//          }
//          else {
//             console.log(`Already connected to DB: ${this.connectionString}`)
//             return
//          }

//       } catch (err) {
//          console.error("Error connecting to MongoDB:", err);
//          this.isConnected = false;
//       }
//    }

//    status(): mongoose.ConnectionStates {
//       return mongoose.connection.readyState
//    }

//    async useDB() {
//       try {
//          const exist = await dbExists(this.dbName)
//          if (exist) {
//             this.connection = await useDatabase(this.dbName)
//          } else {
//             this.connection = await createDatabase(this.dbName)
//          }
//       } catch (err: any) {
//          console.log(err.message)
//       }
//    }

//    createCollection<TMongooseDocType>(modelName: string, schema: mongoose.Schema, collectionName: string): mongoose.Model<TMongooseDocType> | null {
//       this.modelNames.push(modelName)
//       if (this.connection) {
//          return this.connection.model<TMongooseDocType>(modelName, schema, collectionName)
//       }
//       return null
//    }

//    useCollection(modelName: string) {
//       return this.connection?.model<IUser>(modelName)
//    }
// }

// export type DataBase = DB;


// New
interface IDataBase{
   create(tableName:string, rowData:Object):Promise<any>;

   find(tableName:string, query:Object):Promise<any>;

   findOne(tableName:string, query:Object):Promise<any>;

   update(tableName:string, query:Object, updateData:Object):Promise<any>;

   updateOne(tableName:string, query:Object, updateData:Object):Promise<any>;

   delete(tableName:string, query:Object):Promise<any>;

   deleteOne(tableName:string, query:Object):Promise<any>;
}

// IO layer for DB(MongoDB)
import mongoose from "mongoose";

// DataBase connection string filled by dbConfig
// let connection: mongoose.Connection | null = null;

class MongoNoSQLDB implements IDataBase{
   
   connection:mongoose.Connection;
   schemaMap: Map<string, { modelName: string, schema:mongoose.Schema}>;

   constructor(connection:mongoose.Connection, schemaMap: Map<string, { modelName: string, schema:mongoose.Schema}>) {
      this.connection = connection 
      this.schemaMap = schemaMap
   }

   async create(tableName: string, rowData: Object): Promise<any> {
      const config = this.schemaMap.get(tableName)

      if (!config) {
         console.error(`No schema defined for table: ${tableName}`);
         return null;
      }

      const { modelName, schema } = config;

      if(this.connection){
         
         const Model = this.connection.model(modelName, schema, tableName);
         const document = new Model(rowData);
         return await document.save();
      }
      console.error("No database connection or schema defined");
   }

   async find( tableName: string, query: Object): Promise<any> {

      const config = this.schemaMap.get(tableName)

      if (!config) {
         console.error(`No schema defined for table: ${tableName}`);
         return null;
      }
      
      const { modelName, schema } = config;

      if(this.connection){
         const Model = this.connection.model(modelName, schema, tableName);
         const documents = await Model.find(query);
         return documents;
      }
      console.error("No database connection or schema defined");
   }

   async findOne( tableName: string, query: Object): Promise<any> {
      const config = this.schemaMap.get(tableName)

      if (!config) {
         console.error(`No schema defined for table: ${tableName}`);
         return null;
      }

      const { modelName, schema } = config;

      if(this.connection){
         const Model = this.connection.model(modelName, schema, tableName);
         const document = await Model.findOne(query);
         return document;
      }
      console.error("No database connection or schema defined");
   }

   async update( tableName: string, query: Object, updateData: Object): Promise<any> {
      const config = this.schemaMap.get(tableName)

      if (!config) {
         console.error(`No schema defined for table: ${tableName}`);
         return null;
      }

      const { modelName, schema } = config;

      if(this.connection){
         const Model = this.connection.model(modelName, schema, tableName);
         const result = await Model.updateMany(query, updateData);
         return result;
      }
      console.error("No database connection or schema defined");
   }

   async updateOne( tableName: string, query: Object, updateData: Object): Promise<any> {
      const config = this.schemaMap.get(tableName)

      if (!config) {
         console.error(`No schema defined for table: ${tableName}`);
         return null;
      }

      const { modelName, schema } = config;

      if(this.connection){
         const Model = this.connection.model(modelName, schema, tableName);
         const result = await Model.updateOne(query, updateData);
         return result;
      }
      console.error("No database connection or schema defined");
   }

   async delete( tableName: string, query: Object): Promise<any> {
      const config = this.schemaMap.get(tableName)

      if (!config) {
         console.error(`No schema defined for table: ${tableName}`);
         return null;
      }

      const { modelName, schema } = config;

      if(this.connection){
         const Model = this.connection.model(modelName, schema, tableName);
         const result = await Model.deleteMany(query);
         return result;
      }
      console.error("No database connection or schema defined");   
   }

   async deleteOne( tableName: string, query: Object): Promise<any> {
      const config = this.schemaMap.get(tableName)

      if (!config) {
         console.error(`No schema defined for table: ${tableName}`);
         return null;
      }

      const { modelName, schema } = config;

      if(this.connection){
         const Model = this.connection.model(modelName, schema, tableName);
         const result = await Model.deleteOne(query);
         return result;
      }
      console.error("No database connection or schema defined");  
   }
}

export type {
   IDataBase
}

export { 
   MongoNoSQLDB
};


export interface QueryOptions{
   limit?: number
   skip?: number
   sort?: Record<string, 1 | -1>
   projection?: Record<string, 0 | 1>
}

export interface IDatabase{
   model(tableName:string):any

   find(
      tableName:string,
      query:object,
      options?:QueryOptions
   ):Promise<any[]>

   findOne(
      tableName:string,
      query:object,
      options?:QueryOptions
   ):Promise<any|null>

   create(
      tableName:string,
      data:object
   ):Promise<any>

   updateOne(
      tableName:string,
      query:object,
      data:object
   ):Promise<any>

   updateMany(
      tableName:string,
      query:object,
      data:object
   ):Promise<any>

   deleteOne(
      tableName:string,
      query:object
   ):Promise<any>

   deleteMany(
      tableName:string,
      query:object
   ):Promise<any>
}

import mongoose from 'mongoose'

export class MongoNoSQLDB implements IDatabase{

   connection:mongoose.Connection
   schemaMap: Map<string, { modelName:string, schema:mongoose.Schema }>
   constructor(
      connection:mongoose.Connection,
      schemaMap:Map<string, { modelName:string, schema:mongoose.Schema }>
   ){
      this.connection = connection
      this.schemaMap = schemaMap
   }

   model(tableName:string):mongoose.Model<any> | null{
      const entry = this.schemaMap.get(tableName)

      if(entry){
         const { modelName, schema } = entry
         return this.connection.model(modelName, schema, tableName)
      }

      return null        
   }

   // limit= -1 means all
   async find(
   tableName:string,
   query:object,
   options?:QueryOptions
   ):Promise<any[]>{

      const model = this.model(tableName)
      if(!model) return []

      let q = model.find(query)

      if(options?.projection)
         q = q.select(options.projection)

      if(options?.sort)
         q = q.sort(options.sort)

      if(options?.skip)
         q = q.skip(options.skip)

      if(options?.limit)
         q = q.limit(options.limit)

      return await q.lean()
   }

   async findOne(
      tableName:string,
      query:object,
      options?:QueryOptions
   ):Promise<any|null>{

      const model = this.model(tableName)
      if(!model) return null

      let q = model.findOne(query)

      if(options?.projection)
         q = q.select(options.projection)

      return await q.lean()
   }

   async create(
      tableName:string,
      data:object
   ):Promise<any>{

      const model = this.model(tableName)
      if(!model) throw new Error("Model not found")

      return await model.create(data)
   }

   async updateOne(
      tableName:string,
      query:object,
      data:object
   ):Promise<any>{

      const model = this.model(tableName)
      if(!model) throw new Error("Model not found")

      return await model.updateOne(query, { $set: data })
   }

   async updateMany(
      tableName:string,
      query:object,
      data:object
   ):Promise<any>{

      const model = this.model(tableName)
      if(!model) throw new Error("Model not found")

      return await model.updateMany(query, { $set: data })
   }

   async deleteMany(
      tableName:string,
      query:object
   ):Promise<any>{

      const model = this.model(tableName)
      if(!model) throw new Error("Model not found")

      return await model.deleteMany(query)
   }

   async deleteOne(
      tableName:string,
      query:object
   ):Promise<any>{

      const model = this.model(tableName)
      if(!model) throw new Error("Model not found")

      return await model.deleteOne(query)
   }
}
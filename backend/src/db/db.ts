

export interface QueryOptions{
   limit?: number
   skip?: number
   sort?: Record<string, 1 | -1>
   projection?: Record<string, 0 | 1>
}


// export interface INoSQLDatabase{

// }

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
import path from 'node:path';
import url from 'node:url';
import { type Doc, type WithId } from './schemas.js'

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class MongoNoSQLDB {

   /**
    * 
    * @param model model corresponding to mongoose schema
    * @param query mongoose FilterQuery based on fields of Document
    * @param options mongoose options object like { limit:6, lean:true, sort:{ createdAt:1 } }
    * @returns Hydrated Document includes `_id` field with other Document fields
    */
   async find<RawDocType extends Doc>(
      model:mongoose.Model<RawDocType>,
      query:mongoose.FilterQuery<RawDocType>,
      options?:mongoose.QueryOptions<RawDocType>
   ):Promise<WithId<RawDocType>[] | null>{

      try{
         let q = await model.find<WithId<RawDocType>>(query, null, options)
         return q
      }catch(err){
         console.error(`Error from: ${__filename} `+err)
      }
      return null
   }

   async findOne<RawDocType extends Doc>(
      model:mongoose.Model<RawDocType>,
      query:mongoose.FilterQuery<RawDocType>,
      options?:mongoose.QueryOptions<RawDocType>
   ):Promise<WithId<RawDocType> | null>{
      try{
         let q = await model.findOne<WithId<RawDocType>>(query, null, options)
         return q
      }catch(err){
         console.error(`Error from: ${__filename} `+err)
      }
      return null
   }

   async create<RawDocType extends Doc>(
      model:mongoose.Model<RawDocType>,
      data:Partial<RawDocType>
   ):Promise<WithId<RawDocType> | null>{
      try{
         const doc = new model(data)
         await doc.save()
      }catch(err){
         console.error(`Error in: ${__filename} `+err)
      }
      return null
   }

   async updateOne<RawDocType extends Doc>(
      model:mongoose.Model<RawDocType>,
      query:mongoose.FilterQuery<RawDocType>,
      updateData:Partial<RawDocType>
   ):Promise<WithId<RawDocType> | null>{
      try{
         const q = await model.updateOne<WithId<RawDocType>>(query,{ $set:updateData}).findOne(query)
         return q
      }catch(err){
         console.error(`Error from: ${__filename} `+err)
      }
      return null
   }

   // async updateMany(
   //    tableName:string,
   //    query:object,
   //    data:object
   // ):Promise<any>{

   //    const model = this.model(tableName)
   //    if(!model) throw new Error("Model not found")

   //    return await model.updateMany(query, { $set: data })
   // }

   async delete<RawDocType extends Doc>(
      model:mongoose.Model<RawDocType>,
      query:mongoose.QueryOptions<RawDocType>
   ):Promise<boolean | null>{

      try{
         const q = await model.deleteMany(query)
         return q.acknowledged
      }catch(err){
         console.error(`Error from: ${__filename} `+err)
      }
      return null
   }

   async deleteOne<RawDocType extends Doc>(
      model:mongoose.Model<RawDocType>,
      query:mongoose.QueryOptions<RawDocType>
   ):Promise<boolean | null>{

      try{
         const q = await model.deleteOne(query)
         return q.acknowledged
      }catch(err){
         console.error(`Error from: ${__filename} `+err)
      }
      return null
   }
}

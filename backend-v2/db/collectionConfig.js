import mongoose from "mongoose";

export const getCollection = (collectionName) => {
   return mongoose.connection.collection(collectionName);
}

export const dropCollection = async (collectionName) => {
   const collection = getCollection(collectionName);
   if (collection) {
      await collection.drop();
      console.log(`Collection ${collectionName} dropped.`);
   } else {
      throw new Error(`Collection ${collectionName} does not exist.`);
   }
}
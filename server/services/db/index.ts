import mongoose from 'mongoose'

export default async function connectDb (){
   const res = await mongoose.connect(process.env.NODE_ENV === "production" ? process.env.PRODUCTION_DB_URI as string : process.env.LOCAL_DB_URI as string , {dbName:"project-managment"})
   return res.connection.host;
}
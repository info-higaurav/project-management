import mongoose from 'mongoose'

export default async function connectDb (){
   const res = await mongoose.connect(process.env.DB_URI as string, {dbName:"project-managment"})
   return res.connection.host;
}
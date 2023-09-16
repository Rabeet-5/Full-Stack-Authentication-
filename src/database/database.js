import mongoose from "mongoose";

const DB_LINK = process.env.MONGO_URI ;

export const connectDb = async () => {

   try {
    await mongoose.connect(DB_LINK);

    mongoose.connection.on('connected',() =>{
        console.log('MongoDb connected')
    })

    mongoose.connection.on("error",(err)=>{
        console.log(err,"MongoDb shutting down due to error ")
        process.exit()

    })

   } catch (error) {
        console.log(error,'there is some error in catch')
   }

}

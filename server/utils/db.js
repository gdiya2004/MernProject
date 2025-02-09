import mongoose from "mongoose"
// await mongoose.connect("mongodb://127.0.0.1:27017/mern_admin")

export const connectDb=async()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/mern_admin")
        console.log("connected")
    }catch(error){
        console.log(error);
    }
}
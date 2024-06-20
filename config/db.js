import mongoose from "mongoose";
import colors from 'colors';
const connectDB= async()=>{
    try{
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to mongodb ${connection.connection.host}`.bgMagenta.white);

    }catch (error){
        console.log(`error in Mongodb ${error}`.bgRed.white)
    }
}

export default connectDB;
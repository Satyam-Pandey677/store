import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        const db = await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
        if(db){
            console.log("mongoDb connected succesfully")
        }
        
    } catch (error) {
        console.log(error.message)
    }
}
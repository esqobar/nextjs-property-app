import mongoose from "mongoose";

let connected = false

const connectDB = async () => {
    mongoose.set('strictQuery', true)

    if(connected) {
        console.log('MongoDB Is Already Connected')
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        connected = true
        console.log('MongoBD Connected Successfully...')
    } catch (error) {
        console.log(error)
    }
}

export default connectDB
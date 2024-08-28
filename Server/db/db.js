import mongoose from "mongoose";

export default async function mongooseConnection() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connection successful...');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the process with failure
    }
}




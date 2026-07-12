import mongoose from 'mongoose';

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        console.log('Connected to MongoDB');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        throw error;
    }
};

export default connectDB;
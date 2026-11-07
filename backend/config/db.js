
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 15000,
            connectTimeoutMS: 15000
        });

        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("MongoDB connection failed:");
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;

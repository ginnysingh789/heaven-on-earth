const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.warn('⚠️  MONGO_URI not set - running without database (using mock data)');
      return;
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️  MongoDB Connection Failed: ${error.message}`);
    console.warn('⚠️  Server will run without database (using mock data)');
  }
};

module.exports = connectDB;

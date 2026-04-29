import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

// Fix for ECONNREFUSED on querySrv by using Google DNS
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || '');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

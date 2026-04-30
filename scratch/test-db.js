const mongoose = require('mongoose');
const dns = require('dns');
require('dotenv').config();

dns.setServers(['8.8.8.8', '8.8.4.4']);

const uri = process.env.MONGODB_URI;

async function testConnection() {
  console.log('Testing MongoDB connection to:', uri.split('@')[1]);
  try {
    await mongoose.connect(uri);
    console.log('Connected successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Connection failed:', error);
    process.exit(1);
  }
}

testConnection();

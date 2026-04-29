const mongoose = require('mongoose');
const dns = require('dns');

// Use Google DNS as in the app
dns.setServers(['8.8.8.8', '8.8.4.4']);

const MONGODB_URI = "mongodb+srv://rvschoold_db_user:fEfkwixUu8uKJYei@rishividyalaya.e9iomnk.mongodb.net/RishiVidyalaya_DB?retryWrites=true&w=majority&appName=rishividyalaya";

async function testConn() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Connection failed:', err);
    process.exit(1);
  }
}

testConn();

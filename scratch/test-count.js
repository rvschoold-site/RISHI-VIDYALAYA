const mongoose = require('mongoose');
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

const MONGODB_URI = "mongodb+srv://rvschoold_db_user:fEfkwixUu8uKJYei@rishividyalaya.e9iomnk.mongodb.net/RishiVidyalaya_DB?retryWrites=true&w=majority&appName=rishividyalaya";

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'ADMIN' },
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function testCount() {
  try {
    console.log('Connecting...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected.');
    const count = await Admin.countDocuments();
    console.log('Admin count:', count);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

testCount();

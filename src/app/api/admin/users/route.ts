import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { verifyAdmin, unauthorizedResponse } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function GET(req: Request) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin || admin.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    await dbConnect();
    const admins = await Admin.find().select('-password').sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: admins });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin || admin.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const { name, email, password, role } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    await dbConnect();
    
    // Check if email already exists
    const existing = await Admin.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'An administrator with this email already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'ADMIN'
    });

    const adminData = newAdmin.toObject();
    delete adminData.password;

    return NextResponse.json({ 
      success: true, 
      data: adminData, 
      message: 'Administrator created successfully!' 
    });
  } catch (error: any) {
    console.error('Error creating admin:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

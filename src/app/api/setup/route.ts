import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';
import { createAdminLog } from '@/lib/logger';

export async function GET() {
  try {
    await dbConnect();
    const adminCount = await Admin.countDocuments();
    return NextResponse.json({ setupRequired: adminCount === 0 });
  } catch (error: any) {
    console.error('Setup GET Error:', error);
    return NextResponse.json({ error: 'Database connection failed', details: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    
    // Check if an admin already exists
    const adminCount = await Admin.countDocuments();
    if (adminCount > 0) {
      return NextResponse.json({ error: 'Setup already completed. Admin already exists.' }, { status: 403 });
    }

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Super Admin
    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      role: 'SUPER_ADMIN'
    });

    // Log Activity
    await createAdminLog({
      adminId: admin.id,
      adminName: admin.name,
      action: 'SYSTEM_SETUP_COMPLETED',
      module: 'AUTH',
      details: 'First Super Admin account created during setup.',
      req
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Super Admin created successfully',
      data: { id: admin.id, name: admin.name, email: admin.email }
    });

  } catch (error: any) {
    console.error('Setup API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

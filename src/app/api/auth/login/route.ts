import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';
import { createSession } from '@/lib/auth';
import { createAdminLog } from '@/lib/logger';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_dev_only';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);

    if (!isPasswordCorrect) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Create Session via Cookie
    const token = await createSession(admin.id);

    // Log Activity
    await createAdminLog({
      adminId: admin.id,
      adminName: admin.name,
      action: 'LOGIN',
      module: 'AUTH',
      details: `Admin logged in successfully from IP: ${req.headers.get('x-forwarded-for') || 'local'}`,
      req
    });

    return NextResponse.json({
      success: true,
      data: {
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: admin.role
        }
      }
    });

  } catch (error: any) {
    console.error('Login API Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

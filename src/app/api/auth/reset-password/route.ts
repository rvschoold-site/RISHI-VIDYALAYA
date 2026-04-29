import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ message: 'Token and password are required' }, { status: 400 });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const admin = await Admin.findOne({
      resetToken: hashedToken,
      resetTokenExp: { $gt: new Date() }
    });

    if (!admin) {
      return NextResponse.json({ message: 'Invalid or expired reset token' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Admin.findByIdAndUpdate(admin._id, {
      password: hashedPassword,
      resetToken: null,
      resetTokenExp: null
    });

    return NextResponse.json({ success: true, message: 'Password reset successful. You can now login.' });

  } catch (error: any) {
    console.error('Reset Password API Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

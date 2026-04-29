import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import crypto from 'crypto';
import { sendEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email } = await req.json();

    const admin = await Admin.findOne({ email });

    if (!admin) {
      // Don't reveal if user exists
      return NextResponse.json({ message: 'If your email exists, you will receive a reset link.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    await Admin.findByIdAndUpdate(admin._id, {
      resetToken: hashedToken,
      resetTokenExp: new Date(Date.now() + 3600000) // 1 hour
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/reset-password?token=${resetToken}`;

    const message = `
      <h1>Password Reset Request</h1>
      <p>You requested a password reset. Please click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you did not request this, please ignore this email.</p>
    `;

    await sendEmail({
      to: admin.email,
      subject: 'Password Reset Request - Rishi Vidyalaya',
      html: message
    });

    return NextResponse.json({ message: 'Password reset link sent to email.' });

  } catch (error: any) {
    console.error('Forgot Password API Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

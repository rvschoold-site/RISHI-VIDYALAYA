import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AdminInvitation from '@/models/AdminInvitation';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    await dbConnect();
    const { token } = await params;
    const invitation = await AdminInvitation.findOne({ token, status: 'PENDING' });

    if (!invitation) {
      return NextResponse.json({ error: 'Invalid or expired invitation' }, { status: 404 });
    }

    if (new Date() > invitation.expiresAt) {
      invitation.status = 'EXPIRED';
      await invitation.save();
      return NextResponse.json({ error: 'Invitation has expired' }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: { email: invitation.email, role: invitation.role } });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    await dbConnect();
    const { token } = await params;
    const { name, password } = await req.json();

    const invitation = await AdminInvitation.findOne({ token, status: 'PENDING' });

    if (!invitation || new Date() > invitation.expiresAt) {
      return NextResponse.json({ error: 'Invalid or expired invitation' }, { status: 400 });
    }

    if (!name || !password) {
      return NextResponse.json({ error: 'Name and password are required' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Admin
    const admin = await Admin.create({
      name,
      email: invitation.email,
      password: hashedPassword,
      role: invitation.role
    });

    // Mark invitation as accepted
    invitation.status = 'ACCEPTED';
    await invitation.save();

    return NextResponse.json({ 
      success: true, 
      message: 'Account created successfully! You can now log in.' 
    });

  } catch (error: any) {
    console.error('Accept Invitation Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

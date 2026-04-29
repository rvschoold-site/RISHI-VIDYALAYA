import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AdminInvitation from '@/models/AdminInvitation';
import { verifyAdmin, unauthorizedResponse } from '@/lib/auth';
import crypto from 'crypto';

// Only SUPER_ADMIN can invite or list invitations
export async function GET(req: Request) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin || admin.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    await dbConnect();
    const invitations = await AdminInvitation.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: invitations });
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

    const { email, role } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });

    await dbConnect();
    
    // Check if invitation already exists for this email
    const existing = await AdminInvitation.findOne({ email });
    if (existing && existing.status === 'PENDING') {
      return NextResponse.json({ error: 'Invitation already pending for this email' }, { status: 400 });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    const invitation = await AdminInvitation.create({
      email,
      role: role || 'ADMIN',
      token,
      expiresAt,
      status: 'PENDING'
    });

    // In a real app, send email here. For now, we return the link.
    const inviteLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/admin/setup/${token}`;

    return NextResponse.json({ 
      success: true, 
      message: 'Invitation created successfully',
      data: { ...invitation.toObject(), inviteLink } 
    });

  } catch (error: any) {
    console.error('Invite Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

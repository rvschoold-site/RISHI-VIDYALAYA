import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { verifyAdmin, unauthorizedResponse } from '@/lib/auth';

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

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_dev_only';

export async function GET(req: Request) {
  try {
    await dbConnect();
    
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded: any = jwt.verify(token, JWT_SECRET);

    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: admin });

  } catch (error: any) {
    console.error('Auth Me API Error:', error);
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}

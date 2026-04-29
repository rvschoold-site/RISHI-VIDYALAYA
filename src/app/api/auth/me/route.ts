import { NextResponse } from 'next/server';
import { verifyAdmin, unauthorizedResponse } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const admin = await verifyAdmin(req);

    if (!admin) {
      return unauthorizedResponse();
    }

    return NextResponse.json({ success: true, data: admin });

  } catch (error: any) {
    console.error('Auth Me API Error:', error);
    return unauthorizedResponse();
  }
}

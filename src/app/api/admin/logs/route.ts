import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AdminLog from '@/models/AdminLog';
import { verifySuperAdmin, forbiddenResponse } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const admin = await verifySuperAdmin(req);
    if (!admin) {
      return forbiddenResponse();
    }

    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const module = searchParams.get('module');
    const action = searchParams.get('action');

    const query: any = {};
    if (module) query.module = module;
    if (action) query.action = action;

    const [logs, total] = await Promise.all([
      AdminLog.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('adminId', 'name email role'),
      AdminLog.countDocuments(query)
    ]);

    return NextResponse.json({
      success: true,
      data: {
        logs,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error: any) {
    console.error('Logs API Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

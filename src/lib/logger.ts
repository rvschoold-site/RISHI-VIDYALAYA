import AdminLog from '@/models/AdminLog';
import dbConnect from './mongodb';

interface LogOptions {
  adminId: string;
  adminName: string;
  action: string;
  module: string;
  details: string;
  req?: Request;
}

export async function createAdminLog({ adminId, adminName, action, module, details, req }: LogOptions) {
  try {
    await dbConnect();
    
    let ip = '';
    let userAgent = '';
    
    if (req) {
      ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '';
      userAgent = req.headers.get('user-agent') || '';
    }

    await AdminLog.create({
      adminId,
      adminName,
      action,
      module,
      details,
      ip,
      userAgent
    });
  } catch (error) {
    console.error('Failed to create admin log:', error);
  }
}

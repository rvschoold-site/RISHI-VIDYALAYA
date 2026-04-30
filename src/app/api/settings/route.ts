import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import SiteSettings from '@/models/SiteSettings';
import { verifyAdmin, unauthorizedResponse } from '@/lib/auth';
import { createAdminLog } from '@/lib/logger';

export async function GET() {
  try {
    console.log('API: Fetching site settings...');
    await dbConnect();
    
    const settings = await SiteSettings.find({});
    console.log(`API: Found ${settings.length} settings`);
    
    const settingsObj = settings.reduce((acc: any, setting: any) => {
      if (setting.key) {
        acc[setting.key] = setting.value;
      }
      return acc;
    }, {});

    return NextResponse.json({ success: true, data: settingsObj });
  } catch (error: any) {
    console.error('API Error (GET /api/settings):', error);
    return new NextResponse(JSON.stringify({ 
      success: false, 
      error: 'Failed to fetch settings',
      message: error.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return unauthorizedResponse();
    }

    await dbConnect();
    const updates = await req.json();

    const updatePromises = Object.entries(updates).map(([key, value]) => {
      return SiteSettings.findOneAndUpdate(
        { key },
        { value: String(value) },
        { upsert: true, new: true }
      );
    });

    await Promise.all(updatePromises);

    // Log Activity
    await createAdminLog({
      adminId: admin.id,
      adminName: admin.name,
      action: 'UPDATE_SETTINGS',
      module: 'SETTINGS',
      details: `Updated site settings: ${Object.keys(updates).join(', ')}`,
      req
    });

    return NextResponse.json({ success: true, message: 'Settings updated successfully' });

  } catch (error: any) {
    console.error('API Error (PATCH /api/settings):', error);
    return new NextResponse(JSON.stringify({ 
      success: false, 
      error: 'Internal Server Error',
      message: error.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import SiteSettings from '@/models/SiteSettings';
import { verifyAdmin, unauthorizedResponse } from '@/lib/auth';

export async function GET() {
  try {
    await dbConnect();
    const settings = await SiteSettings.find();
    const settingsObj = settings.reduce((acc: any, setting: any) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {});
    return NextResponse.json({ success: true, data: settingsObj });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
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

    return NextResponse.json({ success: true, message: 'Settings updated successfully' });

  } catch (error: any) {
    console.error('Settings API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

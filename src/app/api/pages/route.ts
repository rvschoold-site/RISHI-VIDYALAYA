import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import PageContent from '@/models/PageContent';
import { verifyAdmin, unauthorizedResponse } from '@/lib/auth';

// Get all pages list
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const pages = await PageContent.find().select('slug title updatedAt');
    return NextResponse.json({ success: true, data: pages });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Create or Update page
export async function POST(req: NextRequest) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) return unauthorizedResponse();

    await dbConnect();
    const body = await req.json();
    const { slug, title, sections, metadata } = body;

    const page = await PageContent.findOneAndUpdate(
      { slug },
      { title, sections, metadata },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, data: page });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

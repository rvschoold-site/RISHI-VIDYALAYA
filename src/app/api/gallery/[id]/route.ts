import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { verifyAdmin, unauthorizedResponse } from '@/lib/auth';
import GalleryItem from '@/models/GalleryItem';
import dbConnect from '@/lib/mongodb';
import fs from 'fs/promises';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) return unauthorizedResponse();

    const { id } = await params;
    const body = await req.json();

    await dbConnect();
    const item = await GalleryItem.findByIdAndUpdate(id, body, { new: true });

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) return unauthorizedResponse();

    const { id } = await params;

    await dbConnect();
    const item = await GalleryItem.findById(id);

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    // Delete from storage
    if (item.type === 'cloudinary' && item.publicId) {
      await cloudinary.uploader.destroy(item.publicId);
    } else if (item.type === 'local') {
      const fileName = item.url.split('/').pop();
      if (fileName) {
        const filePath = path.join(process.cwd(), 'public', 'uploads', 'gallery', fileName);
        try {
          await fs.unlink(filePath);
        } catch (err) {
          console.error('Failed to delete local file:', err);
        }
      }
    }

    await GalleryItem.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Item deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

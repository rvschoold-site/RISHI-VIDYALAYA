import { NextRequest, NextResponse } from 'next/server';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { verifyAdmin, unauthorizedResponse } from '@/lib/auth';
import GalleryItem from '@/models/GalleryItem';
import dbConnect from '@/lib/mongodb';
import fs from 'fs/promises';
import path from 'path';

// AWS S3 Config
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ap-southeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET = process.env.AWS_S3_BUCKET || 'rishividalaya';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) return unauthorizedResponse();

    const { id } = await params;
    const body = await req.json();

    await dbConnect();
    const item = await GalleryItem.findByIdAndUpdate(id, body, { returnDocument: 'after' });

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
    if (item.type === 's3' && item.key) {
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: BUCKET,
          Key: item.key,
        })
      );
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

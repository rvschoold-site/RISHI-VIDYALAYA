import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
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

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const featured = searchParams.get('featured');
    const type = searchParams.get('type');

    // Build query filter
    const filter: any = {};
    if (featured === 'true') {
      filter.isFeatured = true;
    }
    if (type && (type === 'local' || type === 's3')) {
      filter.type = type;
    }

    const items = await GalleryItem.find(filter).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(items);
  } catch (error: any) {
    console.error('API Error (GET /api/gallery):', error);
    return new NextResponse(JSON.stringify({ 
      success: false, 
      error: 'Failed to fetch gallery',
      message: error.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) return unauthorizedResponse();

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const type = (formData.get('type') as string) || 's3';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let url = '';
    let s3Key = '';

    if (type === 's3') {
      // Upload to AWS S3
      const sanitizedName = file.name.replace(/\s+/g, '_');
      const key = `gallery/${Date.now()}-${sanitizedName}`;

      await s3Client.send(
        new PutObjectCommand({
          Bucket: BUCKET,
          Key: key,
          Body: buffer,
          ContentType: file.type,
        })
      );

      const region = process.env.AWS_REGION || 'ap-southeast-2';
      url = `https://${BUCKET}.s3.${region}.amazonaws.com/${key}`;
      s3Key = key;
    } else {
      // Save locally
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'gallery');
      try {
        await fs.access(uploadDir);
      } catch {
        await fs.mkdir(uploadDir, { recursive: true });
      }

      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
      const filePath = path.join(uploadDir, fileName);
      await fs.writeFile(filePath, buffer);
      url = `/uploads/gallery/${fileName}`;
    }

    await dbConnect();
    
    const galleryItem = await GalleryItem.create({
      title,
      description,
      category,
      type,
      url,
      key: type === 's3' ? s3Key : undefined,
      fileName: file.name,
      mimeType: file.type,
      size: file.size,
    });

    return NextResponse.json({ 
      success: true, 
      data: galleryItem 
    });

  } catch (error: any) {
    console.error('Gallery Upload Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

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

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const items = await GalleryItem.find().sort({ order: 1, createdAt: -1 });
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
    const type = (formData.get('type') as string) || 'cloudinary';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let url = '';
    let publicId = '';

    if (type === 'cloudinary') {
      // Upload to Cloudinary
      const uploadResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { 
            folder: 'rishi-vidyalaya/gallery',
            resource_type: 'image'
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      }) as any;
      url = uploadResponse.secure_url;
      publicId = uploadResponse.public_id;
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
      publicId: type === 'cloudinary' ? publicId : undefined,
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

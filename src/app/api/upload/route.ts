import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { verifyAdmin, unauthorizedResponse } from '@/lib/auth';
import File from '@/models/File';
import dbConnect from '@/lib/mongodb';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) return unauthorizedResponse();

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'rishi-vidyalaya' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    }) as any;

    await dbConnect();
    
    // Save record in DB
    const fileDoc = await File.create({
      fileName: file.name,
      fileType: file.type.split('/')[0],
      mimeType: file.type,
      storage: 'cloudinary',
      url: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
      size: file.size,
    });

    return NextResponse.json({ 
      success: true, 
      url: uploadResponse.secure_url,
      data: fileDoc 
    });

  } catch (error: any) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, unauthorizedResponse } from '@/lib/auth';
import File from '@/models/File';
import dbConnect from '@/lib/mongodb';
import { uploadFile } from '@/lib/storage';

export async function POST(req: NextRequest) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) return unauthorizedResponse();

    const formData = await req.formData();
    const file = formData.get('file') as any;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Upload using unified storage utility
    const uploadResponse = await uploadFile(file);

    await dbConnect();
    
    // Save record in DB
    const fileDoc = await File.create({
      fileName: file.name,
      fileType: file.type.split('/')[0],
      mimeType: file.type,
      storage: uploadResponse.storage,
      url: uploadResponse.url,
      publicId: uploadResponse.publicId,
      key: uploadResponse.key,
      size: file.size,
    });

    return NextResponse.json({ 
      success: true, 
      url: uploadResponse.url,
      data: fileDoc 
    });

  } catch (error: any) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

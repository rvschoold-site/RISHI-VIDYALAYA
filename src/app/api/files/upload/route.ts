import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import FileModel from '@/models/File';
import { uploadFile } from '@/lib/storage';
import { verifyAdmin, unauthorizedResponse } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) return unauthorizedResponse();

    await dbConnect();
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Process upload based on routing rules
    const result = await uploadFile(file);

    // Save to MongoDB
    const fileRecord = await FileModel.create({
      userId: admin.id,
      fileName: file.name,
      fileType: file.type.split('/')[0],
      mimeType: file.type,
      storage: result.storage,
      url: result.url,
      publicId: result.publicId,
      key: result.key,
      size: file.size,
    });

    return NextResponse.json({
      success: true,
      message: 'File uploaded and routed successfully',
      data: fileRecord
    });

  } catch (error: any) {
    console.error('File Upload Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

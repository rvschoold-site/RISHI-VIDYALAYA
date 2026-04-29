import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import FileModel from '@/models/File';
import { getAccessUrl, deleteStoredFile } from '@/lib/storage';
import { verifyAdmin, unauthorizedResponse } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) return unauthorizedResponse();

    await dbConnect();
    const { id } = await params;
    const file = await FileModel.findById(id);

    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Generate dynamic URL if needed
    const accessUrl = await getAccessUrl(file);

    return NextResponse.json({
      success: true,
      data: {
        ...file.toObject(),
        accessUrl
      }
    });

  } catch (error: any) {
    console.error('Fetch File Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) return unauthorizedResponse();

    await dbConnect();
    const { id } = await params;
    const file = await FileModel.findById(id);

    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Delete from physical storage (Cloudinary)
    if (file.publicId) {
      await deleteStoredFile(file.storage, file.publicId);
    }

    // Delete from MongoDB
    await FileModel.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'File deleted from storage and database'
    });

  } catch (error: any) {
    console.error('Delete File Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

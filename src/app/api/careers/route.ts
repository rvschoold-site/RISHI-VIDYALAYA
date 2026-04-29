import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import JobApplication from '@/models/JobApplication';
import { v2 as cloudinary } from 'cloudinary';
import { verifyAdmin, unauthorizedResponse } from '@/lib/auth';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req: NextRequest) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) return unauthorizedResponse();

    await dbConnect();
    const applications = await JobApplication.find().sort({ createdAt: -1 });
    return NextResponse.json(applications);
  } catch (error) {
    console.error('Error fetching career applications:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const formData = await req.formData();
    
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const positionType = formData.get('positionType') as string;
    const positionName = formData.get('positionName') as string;
    const experience = formData.get('experience') as string;
    const qualification = formData.get('qualification') as string;
    const coverLetter = formData.get('coverLetter') as string;
    const resumeFile = formData.get('resume') as File;

    if (!resumeFile) {
      return NextResponse.json({ error: 'Resume is required' }, { status: 400 });
    }

    // Convert file to buffer for Cloudinary upload
    const bytes = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'careers/resumes',
          resource_type: 'raw', // Use raw for PDF/DOCX
          public_id: `${Date.now()}-${fullName.replace(/\s+/g, '_')}_resume`,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    }) as any;

    // Save to database
    const application = await JobApplication.create({
      fullName,
      email,
      phone,
      positionType,
      positionName,
      experience,
      qualification,
      resumeUrl: uploadResult.secure_url,
      coverLetter,
    });


    return NextResponse.json({ 
      success: true, 
      message: 'Application submitted successfully!',
      applicationId: application.id 
    });

  } catch (error) {
    console.error('Career application error:', error);
    return NextResponse.json({ 
      error: 'Failed to submit application. Please try again.' 
    }, { status: 500 });
  }
}

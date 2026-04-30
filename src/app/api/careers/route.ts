import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import JobApplication from '@/models/JobApplication';
import { verifyAdmin, unauthorizedResponse } from '@/lib/auth';
import { uploadFile } from '@/lib/storage';

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
    const subjects = formData.getAll('subjects') as string[];
    const resumeFile = formData.get('resume') as File;

    if (!resumeFile) {
      return NextResponse.json({ error: 'Resume is required' }, { status: 400 });
    }

    // Upload using unified storage utility (will use S3 for PDFs)
    const uploadResult = await uploadFile(resumeFile);

    // Save to database
    const application = await JobApplication.create({
      fullName,
      email,
      phone,
      positionType,
      positionName,
      experience,
      qualification,
      resumeUrl: uploadResult.url,
      coverLetter,
      subjects,
    });

    // Send Emails
    try {
      const { sendEmail } = await import('@/lib/mailer');
      const { getCareerConfirmationTemplate, getAdminNotificationTemplate } = await import('@/lib/email-templates');
      
      // Applicant Confirmation
      await sendEmail({
        to: email,
        subject: 'Application Received - Rishi Vidyalaya',
        html: getCareerConfirmationTemplate({ fullName, positionName, positionType, experience })
      });

      // Admin Notification
      await sendEmail({
        to: process.env.ADMIN_EMAIL || 'rvschoold@gmail.com',
        subject: `New Career Application: ${fullName}`,
        html: getAdminNotificationTemplate('Career', { fullName, email, phone, positionName, experience, subjects })
      });
    } catch (e) {
      console.error('Email error:', e);
    }

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

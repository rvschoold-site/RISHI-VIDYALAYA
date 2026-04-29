import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AdmissionLead from '@/models/AdmissionLead';
import { verifyAdmin, unauthorizedResponse } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) return unauthorizedResponse();

    await dbConnect();
    const leads = await AdmissionLead.find().sort({ createdAt: -1 });
    return NextResponse.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { parentName, studentName, email, phone, grade } = body;

    if (!parentName || !studentName || !email || !phone || !grade) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const lead = await AdmissionLead.create({
      parentName,
      studentName,
      email,
      phone,
      grade,
      status: 'NEW',
    });

    // Send Emails
    try {
      const { sendEmail } = await import('@/lib/mailer');
      const { getAdmissionConfirmationTemplate, getAdminNotificationTemplate } = await import('@/lib/email-templates');
      
      // Parent Confirmation
      await sendEmail({
        to: email,
        subject: 'Admission Inquiry Received - Rishi Vidyalaya',
        html: getAdmissionConfirmationTemplate({ parentName, studentName, grade, phone })
      });

      // Admin Notification
      await sendEmail({
        to: process.env.ADMIN_EMAIL || 'rvschoold@gmail.com',
        subject: `New Admission Inquiry: ${studentName}`,
        html: getAdminNotificationTemplate('Admission', { studentName, grade, parentName, email, phone })
      });
    } catch (e) {
      console.error('Email error:', e);
    }

    return NextResponse.json({ message: 'Admission lead created successfully', lead }, { status: 201 });
  } catch (error) {
    console.error('Error creating admission lead:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

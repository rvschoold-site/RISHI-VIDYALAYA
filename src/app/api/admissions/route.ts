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


    return NextResponse.json({ message: 'Admission lead created successfully', lead }, { status: 201 });
  } catch (error) {
    console.error('Error creating admission lead:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AdmissionLead from '@/models/AdmissionLead';

export async function GET() {
  try {
    await dbConnect();
    // Check if we already have data
    const leadCount = await AdmissionLead.countDocuments();
    if (leadCount > 0) {
      return NextResponse.json({ message: 'Data already exists' });
    }

    // Seed Leads
    await AdmissionLead.insertMany([
      { parentName: 'Ramesh Kumar', studentName: 'Suresh Kumar', email: 'ramesh@example.com', phone: '9876543210', grade: 'Grade 5', status: 'NEW' },
      { parentName: 'Anita Sharma', studentName: 'Rahul Sharma', email: 'anita@example.com', phone: '9876543211', grade: 'Grade 3', status: 'CONTACTED' },
      { parentName: 'Vijay Varma', studentName: 'Pooja Varma', email: 'vijay@example.com', phone: '9876543212', grade: 'LKG', status: 'INTERVIEW_SCHEDULED' },
    ]);


    return NextResponse.json({ message: 'Demo data seeded successfully' });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Check if we already have data
    const leadCount = await prisma.admissionLead.count();
    if (leadCount > 0) {
      return NextResponse.json({ message: 'Data already exists' });
    }

    // Seed Leads
    await prisma.admissionLead.createMany({
      data: [
        { parentName: 'Ramesh Kumar', studentName: 'Suresh Kumar', email: 'ramesh@example.com', phone: '9876543210', grade: 'Grade 5', status: 'NEW' },
        { parentName: 'Anita Sharma', studentName: 'Rahul Sharma', email: 'anita@example.com', phone: '9876543211', grade: 'Grade 3', status: 'CONTACTED' },
        { parentName: 'Vijay Varma', studentName: 'Pooja Varma', email: 'vijay@example.com', phone: '9876543212', grade: 'LKG', status: 'INTERVIEW_SCHEDULED' },
      ]
    });

    // Seed Faculty
    await prisma.faculty.createMany({
      data: [
        { employeeId: 'RV001', firstName: 'Sarah', lastName: 'Johnson', department: 'Science', designation: 'Senior Teacher' },
        { employeeId: 'RV002', firstName: 'Mark', lastName: 'Wilson', department: 'Mathematics', designation: 'HOD' },
        { employeeId: 'RV003', firstName: 'Elena', lastName: 'Rodriguez', department: 'Arts', designation: 'Teacher' },
      ]
    });

    // Seed Students
    await prisma.student.createMany({
      data: [
        { registrationNo: '2024001', firstName: 'Arav', lastName: 'Patel', grade: 'Grade 6', section: 'A', dateOfBirth: new Date('2012-05-15') },
        { registrationNo: '2024002', firstName: 'Isha', lastName: 'Gupta', grade: 'Grade 4', section: 'B', dateOfBirth: new Date('2014-11-20') },
      ]
    });

    return NextResponse.json({ message: 'Demo data seeded successfully' });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

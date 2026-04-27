import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const leads = await prisma.admissionLead.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { parentName, studentName, email, phone, grade } = body;

    if (!parentName || !studentName || !email || !phone || !grade) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const lead = await prisma.admissionLead.create({
      data: {
        parentName,
        studentName,
        email,
        phone,
        grade,
        status: 'NEW',
      },
    });

    return NextResponse.json({ message: 'Admission lead created successfully', lead }, { status: 201 });
  } catch (error) {
    console.error('Error creating admission lead:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

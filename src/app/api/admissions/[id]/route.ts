import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AdmissionLead from '@/models/AdmissionLead';
import { verifyAdmin, unauthorizedResponse } from '@/lib/auth';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) return unauthorizedResponse();

    await dbConnect();
    const { id } = await params;
    const { status } = await req.json();
    const lead = await AdmissionLead.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    return NextResponse.json(lead);
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) return unauthorizedResponse();

    await dbConnect();
    const { id } = await params;
    await AdmissionLead.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Lead deleted successfully' });

  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

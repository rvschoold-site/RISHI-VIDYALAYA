import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AdmissionLead from '@/models/AdmissionLead';
import SiteSettings from '@/models/SiteSettings';

export async function GET() {
  try {
    await dbConnect();
    
    // Seed Leads
    const leadCount = await AdmissionLead.countDocuments();
    if (leadCount === 0) {
      await AdmissionLead.insertMany([
        { parentName: 'Ramesh Kumar', studentName: 'Suresh Kumar', email: 'ramesh@example.com', phone: '9876543210', grade: 'Grade 5', status: 'NEW' },
        { parentName: 'Anita Sharma', studentName: 'Rahul Sharma', email: 'anita@example.com', phone: '9876543211', grade: 'Grade 3', status: 'CONTACTED' },
        { parentName: 'Vijay Varma', studentName: 'Pooja Varma', email: 'vijay@example.com', phone: '9876543212', grade: 'LKG', status: 'INTERVIEW_SCHEDULED' },
      ]);
    }

    // Clean up old settings
    await SiteSettings.deleteOne({ key: 'APPLICATION_URL' });

    // Seed Site Settings
    const defaultSettings = [
      { key: 'CONTACT_EMAIL', value: 'info@rishividyalaya.in', description: 'Public contact email' },
      { key: 'CONTACT_PHONE', value: '+91 99887 76655', description: 'Primary school contact number' },
      { key: 'ACADEMIC_YEAR', value: '2026-27', description: 'Current active academic year' },
      { key: 'ADMISSIONS_OPEN', value: 'true', description: 'Toggle admission portal visibility' },
      { 
        key: 'NAV_LINKS', 
        value: JSON.stringify([
          { label: 'Home', path: '/' },
          { label: 'About Us', path: '/about' },
          { label: 'Academics', path: '/academics' },
          { label: 'Admissions', path: '/admissions' },
          { label: 'Gallery', path: '/gallery' },
          { label: 'Careers', path: '/careers' },
          { label: 'Contact', path: '/contact' }
        ]), 
        description: 'Main navigation menu configuration' 
      }
    ];

    for (const setting of defaultSettings) {
      await SiteSettings.findOneAndUpdate(
        { key: setting.key },
        { $setOnInsert: setting },
        { upsert: true, new: true }
      );
    }

    return NextResponse.json({ message: 'Demo data and site settings seeded successfully' });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

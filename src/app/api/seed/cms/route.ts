import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import PageContent from '@/models/PageContent';

export async function GET() {
  try {
    await dbConnect();
    
    const homeSlug = 'home';
    const existing = await PageContent.findOne({ slug: homeSlug });
    if (existing) return NextResponse.json({ message: 'Home page already exists in CMS' });

    await PageContent.create({
      slug: homeSlug,
      title: 'Home Page',
      sections: [
        {
          id: 'hero-1',
          type: 'hero',
          title: 'Hero Banner',
          order: 0,
          isVisible: true,
          content: {
            badge: 'First Time in the Region',
            title: 'Rishi Vidyalaya',
            subtitle: 'Best School in Dharmavaram | IIT-NEET Foundation School | Top CBSE School',
            description: 'AC Campus | 2 Acres Playground | Green Hostel | IIT–NEET Foundation | AI & Robotics',
            ctaPrimary: 'Admission Open 2026-27',
            ctaSecondary: 'Enquire Now'
          }
        },
        {
          id: 'features-1',
          type: 'features',
          title: 'Academic Excellence',
          order: 1,
          isVisible: true,
          content: {
            tag: 'Academic Excellence',
            title: 'Strong Foundation for a Bright Future',
            subtitle: 'Best School in Dharmavaram for Concept-Based Learning',
            items: [
              { title: 'Back to Basics', description: 'Strong fundamentals for careers like IIT, NEET, IAS, IPS.' },
              { title: 'IIT–NEET Foundation', description: 'Early preparation with a structured academic roadmap.' },
              { title: 'Individual Attention', description: 'Step-by-step learning system tailored for every student.' }
            ]
          }
        }
      ]
    });

    return NextResponse.json({ message: 'CMS seeded with Home Page content' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

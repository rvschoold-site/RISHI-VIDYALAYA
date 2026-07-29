import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import { verifyAdmin, unauthorizedResponse } from '@/lib/auth';

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

async function getUniqueSlug(baseTitle: string, currentId?: string): Promise<string> {
  let slug = slugify(baseTitle) || 'post';
  let counter = 1;
  let uniqueSlug = slug;

  while (true) {
    const existing = await BlogPost.findOne({ 
      slug: uniqueSlug,
      ...(currentId ? { _id: { $ne: currentId } } : {})
    });
    if (!existing) break;
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '9', 10);
    const isAdmin = searchParams.get('admin') === 'true';

    const filter: any = {};

    // For public, default to only PUBLISHED posts unless admin parameter is passed and verified
    if (!isAdmin) {
      filter.status = 'PUBLISHED';
    } else if (status) {
      filter.status = status;
    }

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const skip = (page - 1) * limit;
    const [posts, total] = await Promise.all([
      BlogPost.find(filter)
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit),
      BlogPost.countDocuments(filter)
    ]);

    return NextResponse.json({
      success: true,
      data: posts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error: any) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) return unauthorizedResponse();

    await dbConnect();
    const body = await req.json();

    const {
      title,
      customSlug,
      content,
      summary,
      coverImage,
      category,
      tags,
      author,
      status,
      publishedAt,
      metaTitle,
      metaDescription
    } = body;

    if (!title || !content || !summary) {
      return NextResponse.json({ success: false, error: 'Title, summary, and content are required' }, { status: 400 });
    }

    const slugToUse = customSlug ? slugify(customSlug) : title;
    const finalSlug = await getUniqueSlug(slugToUse);

    const post = await BlogPost.create({
      title,
      slug: finalSlug,
      content,
      summary,
      coverImage: coverImage || '',
      category: category || 'News & Announcements',
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map((t: string) => t.trim()) : []),
      author: author || admin.name || 'Rishi Vidyalaya Team',
      status: status || 'PUBLISHED',
      publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || summary
    });

    return NextResponse.json({ success: true, data: post });

  } catch (error: any) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

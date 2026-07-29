import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import { verifyAdmin, unauthorizedResponse } from '@/lib/auth';
import mongoose from 'mongoose';

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

async function getUniqueSlug(baseTitle: string, currentId: string): Promise<string> {
  let slug = slugify(baseTitle) || 'post';
  let counter = 1;
  let uniqueSlug = slug;

  while (true) {
    const existing = await BlogPost.findOne({ 
      slug: uniqueSlug,
      _id: { $ne: currentId }
    });
    if (!existing) break;
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();

    // Query either by ObjectId or by Slug
    let post;
    if (mongoose.Types.ObjectId.isValid(id)) {
      post = await BlogPost.findById(id);
    } else {
      post = await BlogPost.findOne({ slug: id });
    }

    if (!post) {
      return NextResponse.json({ success: false, error: 'Blog post not found' }, { status: 404 });
    }

    // Increment views asynchronously for public detail view
    const { searchParams } = new URL(req.url);
    if (searchParams.get('inc') === 'true') {
      await BlogPost.findByIdAndUpdate(post._id, { $inc: { views: 1 } });
    }

    return NextResponse.json({ success: true, data: post });

  } catch (error: any) {
    console.error('Error fetching single blog post:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) return unauthorizedResponse();

    const { id } = await params;
    await dbConnect();

    const body = await req.json();
    const {
      title,
      slug,
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

    const existingPost = await BlogPost.findById(id);
    if (!existingPost) {
      return NextResponse.json({ success: false, error: 'Blog post not found' }, { status: 404 });
    }

    let finalSlug = existingPost.slug;
    if (slug && slug !== existingPost.slug) {
      finalSlug = await getUniqueSlug(slug, id);
    } else if (title && title !== existingPost.title && !slug) {
      finalSlug = await getUniqueSlug(title, id);
    }

    const updatedPost = await BlogPost.findByIdAndUpdate(
      id,
      {
        title: title ?? existingPost.title,
        slug: finalSlug,
        content: content ?? existingPost.content,
        summary: summary ?? existingPost.summary,
        coverImage: coverImage ?? existingPost.coverImage,
        category: category ?? existingPost.category,
        tags: Array.isArray(tags) ? tags : (typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : existingPost.tags),
        author: author ?? existingPost.author,
        status: status ?? existingPost.status,
        publishedAt: publishedAt ? new Date(publishedAt) : existingPost.publishedAt,
        metaTitle: metaTitle ?? existingPost.metaTitle,
        metaDescription: metaDescription ?? existingPost.metaDescription
      },
      { new: true }
    );

    return NextResponse.json({ success: true, data: updatedPost });

  } catch (error: any) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) return unauthorizedResponse();

    const { id } = await params;
    await dbConnect();

    const deleted = await BlogPost.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Blog post deleted successfully' });

  } catch (error: any) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

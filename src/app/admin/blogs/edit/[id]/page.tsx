import React from 'react';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import BlogForm from '../../BlogForm';

interface EditProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPostPage({ params }: EditProps) {
  const { id } = await params;
  await dbConnect();

  const post = await BlogPost.findById(id);
  if (!post) {
    notFound();
  }

  // Convert Mongoose doc to plain JSON object
  const plainPost = JSON.parse(JSON.stringify(post));

  return <BlogForm initialData={plainPost} isEdit={true} />;
}

import React from 'react';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import PageContent from '@/models/PageContent';
import SectionRenderer from '@/components/SectionRenderer';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await dbConnect();
  const page = await PageContent.findOne({ slug });

  if (!page) return {};

  return {
    title: page.metadata?.title || page.title,
    description: page.metadata?.description,
    keywords: page.metadata?.keywords,
  };
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  await dbConnect();
  
  // Find the page and sort sections by order
  const page = await PageContent.findOne({ slug });

  if (!page) {
    notFound();
  }

  // Ensure sections are visible and sorted
  const sections = page.sections
    .filter((s: any) => s.isVisible)
    .sort((a: any, b: any) => a.order - b.order);

  return (
    <div className="dynamic-page">
      {sections.map((section: any) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </div>
  );
}

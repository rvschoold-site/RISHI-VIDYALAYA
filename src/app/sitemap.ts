import { MetadataRoute } from 'next';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import SiteSettings from '@/models/SiteSettings';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.rishividyalaya.in';

  // Base static routes
  const staticRoutes = [
    '',
    '/about',
    '/academics',
    '/gallery',
    '/blog',
    '/careers',
    '/contact',
    '/apply'
  ];

  let blogPosts: any[] = [];

  try {
    await dbConnect();

    // Check site canonical URL setting
    const canonicalSetting = await SiteSettings.findOne({ key: 'SITE_CANONICAL_URL' });
    if (canonicalSetting && canonicalSetting.value) {
      baseUrl = canonicalSetting.value;
    }

    // Fetch published blog posts
    blogPosts = await BlogPost.find({ status: 'PUBLISHED' }).select('slug updatedAt publishedAt').sort({ publishedAt: -1 });
  } catch (error) {
    console.error('Failed to generate dynamic blog sitemap:', error);
  }

  const sitemapEntries: MetadataRoute.Sitemap = [
    ...staticRoutes.map(route => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: route === '' ? ('weekly' as const) : ('monthly' as const),
      priority: route === '' ? 1.0 : (route === '/blog' ? 0.9 : 0.8),
    })),
    ...blogPosts.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: (post.updatedAt || post.publishedAt || new Date()).toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  ];

  return sitemapEntries;
}

import { MetadataRoute } from 'next';
import dbConnect from '@/lib/mongodb';
import PageContent from '@/models/PageContent';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.rishividyalaya.in';

  // Base routes
  const routes = [
    '',
    '/careers',
    '/contact',
    '/gallery',
    '/about',
    '/academics'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    await dbConnect();
    const cmsPages = await PageContent.find({}).select('slug updatedAt');
    
    const dynamicRoutes = cmsPages
      .filter(page => page.slug !== 'home') // Home is already in base routes
      .map(page => ({
        url: `${baseUrl}/${page.slug}`,
        lastModified: new Date(page.updatedAt).toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));

    return [...routes, ...dynamicRoutes];
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return routes;
  }
}

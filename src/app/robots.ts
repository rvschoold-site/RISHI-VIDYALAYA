import { MetadataRoute } from 'next';
import dbConnect from '@/lib/mongodb';
import SiteSettings from '@/models/SiteSettings';

export default async function robots(): Promise<MetadataRoute.Robots> {
  let baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.rishividyalaya.in';
  let allowIndexing = true;
  let disallowPaths = ['/admin/', '/api/'];

  try {
    await dbConnect();
    const settings = await SiteSettings.find({});
    const settingsMap: Record<string, string> = {};
    settings.forEach(s => {
      settingsMap[s.key] = s.value;
    });

    if (settingsMap.SITE_CANONICAL_URL) {
      baseUrl = settingsMap.SITE_CANONICAL_URL;
    }
    if (settingsMap.ALLOW_INDEXING === 'false') {
      allowIndexing = false;
    }
    if (settingsMap.ROBOTS_DISALLOW_PATHS) {
      disallowPaths = settingsMap.ROBOTS_DISALLOW_PATHS
        .split(',')
        .map(p => p.trim())
        .filter(Boolean);
    }
  } catch (e) {
    console.error('Failed to load dynamic robots settings from DB:', e);
  }

  if (!allowIndexing) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
      sitemap: `${baseUrl}/sitemap.xml`,
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: disallowPaths,
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

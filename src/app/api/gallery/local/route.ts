import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.svg'];

/**
 * GET /api/gallery/local
 * Scans the public directory for image files and returns them.
 * These are static files on disk, not stored in the database.
 */
export async function GET(req: NextRequest) {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const files = await fs.readdir(publicDir);

    const images = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return IMAGE_EXTENSIONS.includes(ext);
      })
      .map(file => ({
        _id: `local-${file}`,
        title: file
          .replace(/\.[^/.]+$/, '')       // remove extension
          .replace(/\.JPG|\.jpeg/gi, '')   // remove double extensions
          .replace(/[-_]/g, ' ')           // replace dashes/underscores with spaces
          .replace(/\s+/g, ' ')            // collapse whitespace
          .trim(),
        description: '',
        category: 'Campus',
        type: 'local' as const,
        url: `/${encodeURIComponent(file)}`,
        fileName: file,
        isFeatured: false,
        isStatic: true, // marker: this is a static public file, not in DB
        createdAt: new Date().toISOString(),
      }));

    return NextResponse.json(images);
  } catch (error: any) {
    console.error('Error scanning public directory:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

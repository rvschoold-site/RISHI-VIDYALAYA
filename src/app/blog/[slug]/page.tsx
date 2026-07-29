import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, User, Eye, ArrowLeft, Tag, Share2, Newspaper } from 'lucide-react';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import SiteSettings from '@/models/SiteSettings';
import styles from './article.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await dbConnect();
  
  const post = await BlogPost.findOne({ slug, status: 'PUBLISHED' });
  if (!post) {
    return {
      title: 'Article Not Found | Rishi Vidyalaya',
    };
  }

  const canonicalSetting = await SiteSettings.findOne({ key: 'SITE_CANONICAL_URL' });
  const baseUrl = canonicalSetting?.value || process.env.NEXT_PUBLIC_BASE_URL || 'https://www.rishividyalaya.in';
  const postUrl = `${baseUrl}/blog/${post.slug}`;

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.summary,
    keywords: post.tags?.join(', '),
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.summary,
      url: postUrl,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author],
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.summary,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
    alternates: {
      canonical: postUrl,
    }
  };
}

export default async function BlogPostDetailPage({ params }: Props) {
  const { slug } = await params;
  await dbConnect();

  // Query post by slug & increment view count
  const post = await BlogPost.findOneAndUpdate(
    { slug, status: 'PUBLISHED' },
    { $inc: { views: 1 } },
    { new: true }
  );

  if (!post) {
    notFound();
  }

  // Fetch related articles from same category
  const relatedPosts = await BlogPost.find({
    status: 'PUBLISHED',
    category: post.category,
    _id: { $ne: post._id }
  })
  .limit(3)
  .sort({ publishedAt: -1 });

  return (
    <article className={styles.container}>
      <div className={styles.navHeader}>
        <Link href="/blog" className={styles.backBtn}>
          <ArrowLeft size={16} />
          <span>Back to Blog</span>
        </Link>
        <span className={styles.categoryBadge}>{post.category}</span>
      </div>

      <header className={styles.header}>
        <h1 className={styles.title}>{post.title}</h1>

        <div className={styles.metaBar}>
          <div className={styles.authorGroup}>
            <div className={styles.avatar}>
              {post.author.charAt(0)}
            </div>
            <div>
              <div className={styles.authorName}>{post.author}</div>
              <div className={styles.postDate}>
                {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            </div>
          </div>

          <div className={styles.statsGroup}>
            <div className={styles.statItem}>
              <Eye size={16} />
              <span>{post.views || 1} views</span>
            </div>
          </div>
        </div>
      </header>

      {post.coverImage && (
        <div className={styles.coverWrapper}>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className={styles.coverImage}
            sizes="(max-width: 1024px) 100vw, 1000px"
          />
        </div>
      )}

      {/* Summary Box */}
      <div className={styles.summaryCallout}>
        <strong>Key Takeaway:</strong> {post.summary}
      </div>

      {/* Content Render */}
      <div 
        className={styles.content} 
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className={styles.tagsContainer}>
          <Tag size={16} className={styles.tagIcon} />
          <div className={styles.tagsList}>
            {post.tags.map((t: string) => (
              <span key={t} className={styles.tagPill}>{t}</span>
            ))}
          </div>
        </div>
      )}

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className={styles.relatedSection}>
          <h3 className={styles.relatedTitle}>Related Articles</h3>
          <div className={styles.relatedGrid}>
            {relatedPosts.map((rel: any) => (
              <Link key={rel._id} href={`/blog/${rel.slug}`} className={styles.relatedCard}>
                <div className={styles.relatedImageContainer}>
                  {rel.coverImage ? (
                    <Image src={rel.coverImage} alt={rel.title} fill className={styles.relatedImage} sizes="300px" />
                  ) : (
                    <div style={{ width: '100%', height: '100%', backgroundColor: '#1E293B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8' }}>
                      <Newspaper size={24} />
                    </div>
                  )}
                </div>
                <div className={styles.relatedCardBody}>
                  <span className={styles.relatedCategory}>{rel.category}</span>
                  <h4 className={styles.relatedCardTitle}>{rel.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

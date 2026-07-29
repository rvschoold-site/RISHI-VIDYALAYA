'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Calendar, User, ArrowRight, Eye, Tag, Loader2, Newspaper } from 'lucide-react';
import styles from './blog.module.css';

const CATEGORIES = [
  'All',
  'News & Announcements',
  'Academic Insights',
  'Campus Life',
  'Events & Activities',
  'Student Achievements'
];

export default function BlogListingPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<any>({ total: 0, pages: 1 });

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory, page]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', '9');
      if (selectedCategory !== 'All') params.append('category', selectedCategory);
      if (search.trim()) params.append('search', search.trim());

      const res = await fetch(`/api/blogs?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        setPosts(data.data);
        setPagination(data.pagination);
      }
    } catch (err) {
      console.error('Error fetching blog posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchPosts();
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <span className={styles.heroBadge}>Insights & Updates</span>
        <h1 className={styles.heroTitle}>Rishi Vidyalaya Blog</h1>
        <p className={styles.heroSubtitle}>
          Stay connected with our latest campus news, academic advancements, student successes, and educational insights.
        </p>
      </div>

      {/* Controls Bar */}
      <div className={styles.controlsBar}>
        <form onSubmit={handleSearchSubmit} className={styles.searchBox}>
          <Search className={styles.searchIcon} size={18} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search articles by title, keyword or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <div className={styles.categoryFilter}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setPage(1);
              }}
              className={`${styles.categoryBtn} ${selectedCategory === cat ? styles.categoryBtnActive : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
          <Loader2 className="animate-spin" size={36} style={{ color: '#DC2626', margin: '0 auto 1rem auto' }} />
          <p style={{ color: '#64748B', fontWeight: 500 }}>Loading latest articles...</p>
        </div>
      ) : posts.length === 0 ? (
        /* Empty State */
        <div className={styles.emptyState}>
          <Newspaper size={48} style={{ color: '#94A3B8' }} />
          <h3 className={styles.emptyTitle}>No Articles Found</h3>
          <p>We couldn't find any articles matching your search or category filter.</p>
        </div>
      ) : (
        /* Posts Grid */
        <div className={styles.grid}>
          {posts.map((post) => (
            <article key={post._id} className={styles.card}>
              <div className={styles.cardImageContainer}>
                <span className={styles.categoryTag}>{post.category}</span>
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className={styles.cardImage}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#1E293B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8' }}>
                    <Newspaper size={40} />
                  </div>
                )}
              </div>

              <div className={styles.cardBody}>
                <div className={styles.cardMeta}>
                  <div className={styles.cardMetaItem}>
                    <Calendar size={14} />
                    <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <div className={styles.cardMetaItem}>
                    <User size={14} />
                    <span>{post.author}</span>
                  </div>
                </div>

                <h2 className={styles.cardTitle}>
                  <Link href={`/blog/${post.slug}`} className={styles.cardTitleLink}>
                    {post.title}
                  </Link>
                </h2>

                <p className={styles.cardSummary}>{post.summary}</p>

                <div className={styles.cardFooter}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#64748B' }}>
                    <Eye size={14} />
                    <span>{post.views || 0} views</span>
                  </div>
                  <Link href={`/blog/${post.slug}`} className={styles.readMoreBtn}>
                    <span>Read Article</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>

          {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`${styles.pageBtn} ${page === p ? styles.pageBtnActive : ''}`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}

          <button
            className={styles.pageBtn}
            disabled={page === pagination.pages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

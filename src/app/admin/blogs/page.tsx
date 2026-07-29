'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Search, Edit3, Trash2, ExternalLink, Eye, Newspaper, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import styles from './blogs.module.css';

export default function AdminBlogManagementPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, [statusFilter]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('admin', 'true');
      if (statusFilter !== 'ALL') params.append('status', statusFilter);
      if (search) params.append('search', search);

      const res = await fetch(`/api/blogs?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setPosts(data.data);
      }
    } catch (e) {
      console.error('Failed to fetch admin blog posts:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPosts();
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setPosts(posts.filter((p) => p._id !== id));
      } else {
        alert(data.error || 'Failed to delete post');
      }
    } catch (e) {
      alert('Error deleting post');
    } finally {
      setDeletingId(null);
    }
  };

  const toggleStatus = async (post: any) => {
    const newStatus = post.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    try {
      const res = await fetch(`/api/blogs/${post._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setPosts(posts.map((p) => (p._id === post._id ? { ...p, status: newStatus } : p)));
      }
    } catch (e) {
      console.error('Failed to update status:', e);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerBar}>
        <div>
          <h1 className={styles.title}>Blog Posts Management</h1>
          <p className={styles.subtitle}>Create, edit, publish, and manage all school articles and SEO metadata</p>
        </div>
        <Link href="/admin/blogs/new" className={styles.createBtn}>
          <Plus size={18} />
          <span>Create New Post</span>
        </Link>
      </div>

      <div className={styles.filterBar}>
        <form onSubmit={handleSearchSubmit} className={styles.searchBox}>
          <Search className={styles.searchIcon} size={16} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Filter by title or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <select
          className={styles.selectInput}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All Statuses</option>
          <option value="PUBLISHED">Published Only</option>
          <option value="DRAFT">Drafts Only</option>
        </select>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', background: '#fff', borderRadius: '14px' }}>
          <Loader2 className="animate-spin" size={32} style={{ color: '#DC2626', margin: '0 auto 0.75rem auto' }} />
          <p style={{ color: '#64748B' }}>Loading blog table...</p>
        </div>
      ) : posts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', background: '#fff', borderRadius: '14px' }}>
          <Newspaper size={40} style={{ color: '#94A3B8', marginBottom: '0.5rem' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>No Posts Found</h3>
          <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Click "Create New Post" above to add your first article.</p>
        </div>
      ) : (
        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Article Title & Slug</th>
                <th>Category</th>
                <th>Author</th>
                <th>Status</th>
                <th>Views</th>
                <th>Date</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id}>
                  <td>
                    <div className={styles.postTitleCell}>
                      {post.coverImage ? (
                        <Image src={post.coverImage} alt="" width={48} height={48} className={styles.thumbnail} />
                      ) : (
                        <div className={styles.thumbnail} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Newspaper size={20} style={{ color: '#94A3B8' }} />
                        </div>
                      )}
                      <div>
                        <Link href={`/admin/blogs/edit/${post._id}`} className={styles.postTitle}>
                          {post.title}
                        </Link>
                        <div className={styles.slugText}>/blog/{post.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td>{post.category}</td>
                  <td>{post.author}</td>
                  <td>
                    <button
                      onClick={() => toggleStatus(post)}
                      className={`${styles.badge} ${post.status === 'PUBLISHED' ? styles.publishedBadge : styles.draftBadge}`}
                      style={{ border: 'none', cursor: 'pointer' }}
                      title="Click to toggle status"
                    >
                      {post.status === 'PUBLISHED' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                      <span>{post.status}</span>
                    </button>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#64748B' }}>
                      <Eye size={14} />
                      <span>{post.views || 0}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: '#64748B' }}>
                    {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-IN')}
                  </td>
                  <td>
                    <div className={styles.actionBtns} style={{ justifyContent: 'flex-end' }}>
                      {post.status === 'PUBLISHED' && (
                        <Link href={`/blog/${post.slug}`} target="_blank" className={styles.iconBtn} title="View Live Page">
                          <ExternalLink size={15} />
                        </Link>
                      )}
                      <Link href={`/admin/blogs/edit/${post._id}`} className={styles.iconBtn} title="Edit Post">
                        <Edit3 size={15} />
                      </Link>
                      <button
                        onClick={() => handleDelete(post._id, post.title)}
                        className={`${styles.iconBtn} ${styles.deleteBtn}`}
                        disabled={deletingId === post._id}
                        title="Delete Post"
                      >
                        {deletingId === post._id ? <Loader2 className="animate-spin" size={15} /> : <Trash2 size={15} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

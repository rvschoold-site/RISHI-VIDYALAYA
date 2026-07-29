'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Upload, Loader2, Globe, FileText, Tag, Image as ImageIcon } from 'lucide-react';
import styles from './blog-form.module.css';

const CATEGORIES = [
  'News & Announcements',
  'Academic Insights',
  'Campus Life',
  'Events & Activities',
  'Student Achievements'
];

interface BlogFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function BlogForm({ initialData, isEdit }: BlogFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    customSlug: initialData?.slug || '',
    category: initialData?.category || 'News & Announcements',
    summary: initialData?.summary || '',
    content: initialData?.content || '',
    coverImage: initialData?.coverImage || '',
    author: initialData?.author || 'Rishi Vidyalaya Team',
    tags: Array.isArray(initialData?.tags) ? initialData.tags.join(', ') : (initialData?.tags || ''),
    status: initialData?.status || 'PUBLISHED',
    metaTitle: initialData?.metaTitle || '',
    metaDescription: initialData?.metaDescription || ''
  });

  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: val,
      customSlug: slugify(val),
      metaTitle: prev.metaTitle ? prev.metaTitle : val
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const body = new FormData();
    body.append('file', file);
    body.append('type', 'local'); // Upload to local uploads or gallery endpoint

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body
      });
      const data = await res.json();
      if (data.url || data.path || data.data?.url) {
        setFormData((prev) => ({ ...prev, coverImage: data.url || data.path || data.data?.url }));
      } else {
        alert('Image upload failed');
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Error uploading cover image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.summary || !formData.content) {
      alert('Please fill in Title, Excerpt Summary, and Article Content.');
      return;
    }

    setSaving(true);
    try {
      const url = isEdit ? `/api/blogs/${initialData._id}` : '/api/blogs';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          slug: formData.customSlug
        })
      });

      const data = await res.json();
      if (data.success) {
        router.push('/admin/blogs');
        router.refresh();
      } else {
        alert(data.error || 'Failed to save blog post');
      }
    } catch (err) {
      console.error('Error saving post:', err);
      alert('Network or server error while saving');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.topHeader}>
        <div>
          <Link href="/admin/blogs" className={styles.backLink}>
            <ArrowLeft size={16} />
            <span>Back to Blog List</span>
          </Link>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0.25rem 0 0 0', color: '#0F172A' }}>
            {isEdit ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h1>
        </div>

        <div className={styles.submitBar} style={{ margin: 0 }}>
          <Link href="/admin/blogs" className={styles.cancelBtn}>
            Cancel
          </Link>
          <button type="submit" className={styles.saveBtn} disabled={saving}>
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            <span>{saving ? 'Saving...' : isEdit ? 'Update Article' : 'Publish Article'}</span>
          </button>
        </div>
      </div>

      {/* Main Content & Title */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>
          <FileText size={18} style={{ color: '#DC2626' }} />
          <span>Article Details</span>
        </div>

        <div className={styles.formGroup}>
          <label>Article Title *</label>
          <input
            type="text"
            className={styles.input}
            placeholder="e.g. Rishi Vidyalaya Students Excel in State Science Olympiad"
            value={formData.title}
            onChange={handleTitleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>URL Slug (SEO Permalink)</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748B', fontFamily: 'monospace' }}>/blog/</span>
            <input
              type="text"
              className={styles.input}
              placeholder="url-friendly-slug"
              value={formData.customSlug}
              onChange={(e) => setFormData({ ...formData, customSlug: slugify(e.target.value) })}
            />
          </div>
          <span className={styles.slugHelp}>Auto-generated from title. Controls the clean SEO link of the post.</span>
        </div>

        <div className={styles.rowGrid}>
          <div className={styles.formGroup}>
            <label>Category</label>
            <select
              className={styles.select}
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Author Name</label>
            <input
              type="text"
              className={styles.input}
              placeholder="e.g. Principal's Desk / Rishi Vidyalaya Team"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Status</label>
            <select
              className={styles.select}
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'DRAFT' | 'PUBLISHED' })}
            >
              <option value="PUBLISHED">Published (Visible on site)</option>
              <option value="DRAFT">Draft (Hidden from public)</option>
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Excerpt / Summary Preview *</label>
          <textarea
            className={styles.textarea}
            rows={3}
            placeholder="A brief 2-3 sentence overview shown on blog cards and search results..."
            value={formData.summary}
            onChange={(e) => setFormData((prev) => ({
              ...prev,
              summary: e.target.value,
              metaDescription: prev.metaDescription || e.target.value
            }))}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Article Content (HTML supported) *</label>
          <textarea
            className={styles.textarea}
            rows={14}
            placeholder="Write article content here... You can use standard HTML like <p>, <h2>, <ul>, <strong>, <a> etc."
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
            required
          />
        </div>
      </div>

      {/* Cover Image */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>
          <ImageIcon size={18} style={{ color: '#DC2626' }} />
          <span>Cover Image</span>
        </div>

        <div className={styles.rowGrid}>
          <div className={styles.formGroup} style={{ flex: 1 }}>
            <label>Cover Image URL</label>
            <input
              type="text"
              className={styles.input}
              placeholder="https://... or upload below"
              value={formData.coverImage}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
            />

            <div style={{ marginTop: '0.75rem' }}>
              <label htmlFor="image-upload" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#F1F5F9', border: '1px solid #CBD5E1', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                {uploading ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                <span>{uploading ? 'Uploading Image...' : 'Upload Image File'}</span>
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          {formData.coverImage && (
            <div className={styles.imagePreviewWrapper}>
              <Image src={formData.coverImage} alt="Cover Preview" fill style={{ objectFit: 'cover' }} />
            </div>
          )}
        </div>
      </div>

      {/* Tags & Meta SEO */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>
          <Globe size={18} style={{ color: '#DC2626' }} />
          <span>Search Engine Optimization (SEO Metadata) & Tags</span>
        </div>

        <div className={styles.formGroup}>
          <label>Tags (Comma-separated)</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Olympiad, Academics, STEM, CBSE"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          />
        </div>

        <div className={styles.formGroup}>
          <label style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>SEO Meta Title</span>
            <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{formData.metaTitle.length} / 60 chars</span>
          </label>
          <input
            type="text"
            className={styles.input}
            placeholder="Custom meta title for Google search results"
            value={formData.metaTitle}
            onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
          />
        </div>

        <div className={styles.formGroup}>
          <label style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>SEO Meta Description</span>
            <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{formData.metaDescription.length} / 160 chars</span>
          </label>
          <textarea
            className={styles.textarea}
            rows={3}
            placeholder="Custom snippet description for Google SERP..."
            value={formData.metaDescription}
            onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
          />
        </div>
      </div>
    </form>
  );
}

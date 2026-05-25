'use client';

import { useState, useEffect } from 'react';
import { Upload, Trash2, Image as ImageIcon, Plus, Loader2, X, Star, Cloud, HardDrive } from 'lucide-react';
import styles from './gallery.module.css';
import adminStyles from '../admin.module.css';

interface GalleryItem {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  type: 'local' | 's3';
  url: string;
  fileName: string;
  isFeatured?: boolean;
  isStatic?: boolean; // true for static files from /public
  createdAt: string;
}

export default function GalleryManagement() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 's3' | 'local'>('all');

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('General');
  const [storageType, setStorageType] = useState<'local' | 's3'>('s3');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      // Fetch DB gallery items (S3 + uploaded local)
      const dbRes = await fetch('/api/gallery');
      const dbData = await dbRes.json();
      const dbItems: GalleryItem[] = Array.isArray(dbData) ? dbData : [];

      // Try to fetch static local images (best-effort, may fail on Vercel)
      let localItems: GalleryItem[] = [];
      try {
        const localRes = await fetch('/api/gallery/local');
        const localData = await localRes.json();
        localItems = Array.isArray(localData) ? localData : [];
      } catch {
        // Local scan not available (e.g., serverless deployment)
      }

      // Merge: DB items first, then static local images not already in DB
      const dbFileNames = new Set(dbItems.map(i => i.fileName));
      const uniqueLocalItems = localItems.filter(
        li => !dbFileNames.has(li.fileName)
      );

      setItems([...dbItems, ...uniqueLocalItems]);
    } catch (error) {
      console.error('Failed to fetch gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('type', storageType);

    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setTitle('');
        setDescription('');
        setFile(null);
        setShowUploadForm(false);
        fetchGallery();
      } else {
        const error = await res.json();
        alert(`Upload failed: ${error.error}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('An error occurred during upload.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this image from the gallery?')) return;

    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setItems(items.filter(item => item._id !== id));
      } else {
        alert('Failed to delete image');
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleToggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: !currentStatus }),
      });

      if (res.ok) {
        setItems(items.map(item =>
          item._id === id ? { ...item, isFeatured: !currentStatus } : item
        ));
      } else {
        alert('Failed to update featured status');
      }
    } catch (error) {
      console.error('Featured toggle error:', error);
    }
  };

  const filteredItems = activeTab === 'all'
    ? items
    : items.filter(item => item.type === activeTab);

  const featuredCount = items.filter(i => i.isFeatured).length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div className={adminStyles.header} style={{ margin: 0 }}>
          <h1>Gallery Management</h1>
          <p>Manage campus and event images displayed on the website</p>
        </div>
        <button 
          className={adminStyles.buttonPrimary}
          onClick={() => setShowUploadForm(!showUploadForm)}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          {showUploadForm ? <X size={16} /> : <Plus size={16} />}
          <span>{showUploadForm ? 'Cancel Upload' : 'Upload Image'}</span>
        </button>
      </div>

      {/* Featured counter */}
      <div style={{ marginBottom: '1.25rem', fontSize: '0.85rem', color: '#64748b' }}>
        <Star size={14} style={{ display: 'inline', verticalAlign: 'middle', color: '#f59e0b', marginRight: '0.35rem' }} />
        <strong>{featuredCount}</strong> image{featuredCount !== 1 ? 's' : ''} marked as featured for homepage hero slideshow
      </div>

      {/* Tabs */}
      <div className={styles.tabBar}>
        <button 
          className={`${styles.tab} ${activeTab === 'all' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All ({items.length})
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 's3' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('s3')}
        >
          <Cloud size={14} /> S3 Cloud ({items.filter(i => i.type === 's3').length})
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'local' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('local')}
        >
          <HardDrive size={14} /> Local ({items.filter(i => i.type === 'local').length})
        </button>
      </div>

      {showUploadForm && (
        <div className={styles.uploadSection} style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: '#e2e8f0', background: 'white', textAlign: 'left', padding: '2rem', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--primary)' }}>Add Image Details</h3>
          <form onSubmit={handleUpload} className={styles.uploadForm}>
            <div className={adminStyles.formGroup}>
              <label>Image Title *</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="e.g., Science Fair Exhibition" 
                required 
              />
            </div>
            <div className={adminStyles.formGroup}>
              <label>Category *</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="General">General</option>
                <option value="Events">Events</option>
                <option value="Campus">Campus</option>
                <option value="Sports">Sports</option>
                <option value="Academic">Academic</option>
              </select>
            </div>
            <div className={adminStyles.formGroup}>
              <label>Storage Server</label>
              <select 
                value={storageType} 
                onChange={(e) => setStorageType(e.target.value as 'local' | 's3')}
              >
                <option value="s3">AWS S3 Cloud (Recommended)</option>
                <option value="local">Local Storage (Development only)</option>
              </select>
            </div>
            <div className={adminStyles.formGroup}>
              <label>Select File *</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setFile(e.target.files?.[0] || null)} 
                required 
                style={{ padding: '0.45rem' }}
              />
            </div>
            <div className={styles.fullWidth} style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button 
                type="button" 
                className={adminStyles.buttonGhost} 
                onClick={() => setShowUploadForm(false)}
                disabled={uploading}
              >
                Cancel
              </button>
              <button type="submit" className={adminStyles.buttonPrimary} disabled={uploading}>
                {uploading ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Loader2 className="animate-spin" size={16} /> Uploading...
                  </span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Upload size={16} /> Upload to Gallery
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className={adminStyles.loading}>
          <Loader2 className="animate-spin" size={24} />
          <span>Loading Gallery...</span>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className={styles.emptyState}>
          <ImageIcon size={48} strokeWidth={1.5} style={{ marginBottom: '1rem', opacity: 0.5, color: '#64748b' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>No images found</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            {activeTab === 'all' ? 'Start by adding some images to your gallery.' : `No ${activeTab === 's3' ? 'S3 Cloud' : 'Local'} images found.`}
          </p>
        </div>
      ) : (
        <div className={styles.galleryGrid}>
          {filteredItems.map((item) => (
            <div key={item._id} className={`${styles.galleryCard} ${item.isFeatured ? styles.galleryCardFeatured : ''}`}>
              <div className={styles.imageWrapper}>
                <img src={item.url} alt={item.title} loading="lazy" />
                {item.isFeatured && (
                  <div className={styles.featuredBadge}>
                    <Star size={12} /> Featured
                  </div>
                )}
                {item.isStatic && (
                  <div className={styles.staticBadge}>
                    Static
                  </div>
                )}
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardMeta}>
                  <span style={{ backgroundColor: '#f1f5f9', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                    {item.category}
                  </span>
                  <span className={`${styles.badge} ${item.type === 's3' ? styles.badgeS3 : styles.badgeLocal}`}>
                    {item.type === 's3' ? 'S3' : 'Local'}
                  </span>
                </div>
                <div className={styles.cardActions} style={{ marginTop: '1rem', paddingTop: '0.75rem' }}>
                  {!item.isStatic && (
                    <>
                      <button
                        className={`${styles.featuredToggle} ${item.isFeatured ? styles.featuredToggleActive : ''}`}
                        onClick={() => handleToggleFeatured(item._id, !!item.isFeatured)}
                        title={item.isFeatured ? 'Remove from featured' : 'Set as featured'}
                      >
                        <Star size={14} />
                      </button>
                      <button 
                        className={adminStyles.buttonDanger} 
                        onClick={() => handleDelete(item._id)}
                        title="Delete Image"
                        style={{ padding: '0.4rem' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </>
                  )}
                  {item.isStatic && (
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontStyle: 'italic' }}>
                      Upload to S3 to manage
                    </span>
                  )}
                  <div style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center' }}>
                    {item.isStatic ? 'Static' : new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

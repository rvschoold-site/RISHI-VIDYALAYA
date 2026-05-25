'use client';

import { useState, useEffect } from 'react';
import { Upload, Trash2, Image as ImageIcon, Plus, Loader2, X } from 'lucide-react';
import styles from './gallery.module.css';
import adminStyles from '../admin.module.css';

interface GalleryItem {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  type: 'local' | 'cloudinary';
  url: string;
  fileName: string;
  createdAt: string;
}

export default function GalleryManagement() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('General');
  const [storageType, setStorageType] = useState<'local' | 'cloudinary'>('cloudinary');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (Array.isArray(data)) {
        setItems(data);
      }
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
            <div className={`${adminStyles.formGroup} ${styles.fullWidth}`}>
              <label>Description</label>
              <input 
                type="text" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Brief description of the image or activity..." 
              />
            </div>
            <div className={adminStyles.formGroup}>
              <label>Storage Server</label>
              <select 
                value={storageType} 
                onChange={(e) => setStorageType(e.target.value as 'local' | 'cloudinary')}
              >
                <option value="cloudinary">Cloudinary (Recommended)</option>
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
      ) : items.length === 0 ? (
        <div className={styles.emptyState}>
          <ImageIcon size={48} strokeWidth={1.5} style={{ marginBottom: '1rem', opacity: 0.5, color: '#64748b' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>No images found</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.25rem' }}>Start by adding some images to your gallery.</p>
        </div>
      ) : (
        <div className={styles.galleryGrid}>
          {items.map((item) => (
            <div key={item._id} className={styles.galleryCard}>
              <div className={styles.imageWrapper}>
                <img src={item.url} alt={item.title} loading="lazy" />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle} title={item.title}>{item.title}</h3>
                <div className={styles.cardMeta} style={{ marginTop: '0.5rem' }}>
                  <span style={{ backgroundColor: '#f1f5f9', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                    {item.category}
                  </span>
                  <span className={`${styles.badge} ${item.type === 'cloudinary' ? styles.badgeCloudinary : styles.badgeLocal}`}>
                    {item.type}
                  </span>
                </div>
                <div className={styles.cardActions} style={{ marginTop: '1rem', paddingTop: '0.75rem' }}>
                  <button 
                    className={adminStyles.buttonDanger} 
                    onClick={() => handleDelete(item._id)}
                    title="Delete Image"
                    style={{ padding: '0.4rem' }}
                  >
                    <Trash2 size={14} />
                  </button>
                  <div style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center' }}>
                    {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
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

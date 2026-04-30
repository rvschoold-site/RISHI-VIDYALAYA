'use client';

import { useState, useEffect } from 'react';
import { Upload, Trash2, Image as ImageIcon, Plus, Loader2, X, Check } from 'lucide-react';
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
      setItems(data);
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
    if (!confirm('Are you sure you want to delete this image?')) return;

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
    <div className={adminStyles.content}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b' }}>Gallery Management</h1>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Manage school images and activities</p>
        </div>
        <button 
          className={adminStyles.buttonGhost}
          onClick={() => setShowUploadForm(!showUploadForm)}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: showUploadForm ? '#f1f5f9' : 'white' }}
        >
          {showUploadForm ? <X size={18} /> : <Plus size={18} />}
          {showUploadForm ? 'Cancel' : 'Add New Image'}
        </button>
      </div>

      {showUploadForm && (
        <div className={styles.uploadSection}>
          <form onSubmit={handleUpload} className={styles.uploadForm}>
            <div className={adminStyles.formGroup}>
              <label>Image Title</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="e.g. Annual Day 2024" 
                required 
              />
            </div>
            <div className={adminStyles.formGroup}>
              <label>Category</label>
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
                placeholder="Brief description of the activity..." 
              />
            </div>
            <div className={adminStyles.formGroup}>
              <label>Storage Location</label>
              <select 
                value={storageType} 
                onChange={(e) => setStorageType(e.target.value as 'local' | 'cloudinary')}
              >
                <option value="cloudinary">Cloudinary (Recommended for Production)</option>
                <option value="local">Local Server (Development only)</option>
              </select>
            </div>
            <div className={adminStyles.formGroup}>
              <label>Choose Image</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setFile(e.target.files?.[0] || null)} 
                required 
              />
            </div>
            <div className={styles.fullWidth} style={{ marginTop: '1rem' }}>
              <button type="submit" className={styles.submitBtn} disabled={uploading}>
                {uploading ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                    <Loader2 className="animate-spin" size={18} /> Uploading...
                  </span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                    <Upload size={18} /> Upload to Gallery
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className={adminStyles.loading}>
          <Loader2 className="animate-spin" size={32} />
        </div>
      ) : items.length === 0 ? (
        <div className={styles.emptyState}>
          <ImageIcon size={48} strokeWidth={1} style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <h3>No images found</h3>
          <p>Start by adding some images to your gallery.</p>
        </div>
      ) : (
        <div className={styles.galleryGrid}>
          {items.map((item) => (
            <div key={item._id} className={styles.galleryCard}>
              <div className={styles.imageWrapper}>
                <img src={item.url} alt={item.title} loading="lazy" />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <div className={styles.cardMeta}>
                  <span>{item.category}</span>
                  <span className={`${styles.badge} ${item.type === 'cloudinary' ? styles.badgeCloudinary : styles.badgeLocal}`}>
                    {item.type}
                  </span>
                </div>
                <div className={styles.cardActions}>
                  <button 
                    className={styles.deleteBtn} 
                    onClick={() => handleDelete(item._id)}
                    title="Delete Image"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div style={{ marginLeft: 'auto', fontSize: '0.7rem', color: '#94a3b8' }}>
                    {new Date(item.createdAt).toLocaleDateString()}
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

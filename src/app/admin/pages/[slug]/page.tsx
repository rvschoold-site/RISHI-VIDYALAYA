'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styles from '../../admin.module.css';

export default function PageEditor() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();
  
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  useEffect(() => {
    fetchPage();
  }, [slug]);

  const fetchPage = async () => {
    try {
      const res = await fetch(`/api/pages/${slug}`);
      const data = await res.json();
      if (data.success) {
        setPageData(data.data);
      }
    } catch (error) {
      console.error('Error fetching page:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/pages/${slug}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pageData)
      });
      if (res.ok) {
        alert('Page updated successfully!');
      }
    } catch (error) {
      alert('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const addSection = (type: string) => {
    const newSection = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      title: `New ${type} section`,
      content: {},
      order: pageData.sections.length,
      isVisible: true
    };
    setPageData({ ...pageData, sections: [...pageData.sections, newSection] });
    setActiveSectionId(newSection.id);
  };

  const updateSection = (id: string, updates: any) => {
    setPageData({
      ...pageData,
      sections: pageData.sections.map((s: any) => s.id === id ? { ...s, ...updates } : s)
    });
  };

  const removeSection = (id: string) => {
    if (confirm('Are you sure you want to remove this section?')) {
      setPageData({
        ...pageData,
        sections: pageData.sections.filter((s: any) => s.id !== id)
      });
    }
  };

  if (loading) return <div style={{ padding: '3rem' }}>Loading page editor...</div>;
  if (!pageData) return <div style={{ padding: '3rem' }}>Page not found</div>;

  return (
    <div style={{ maxWidth: '1000px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <button onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem' }}>←</button>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)' }}>Editing: {pageData.title}</h1>
          </div>
          <p style={{ color: '#64748b' }}>Managed via slug: <code>/{slug}</code></p>
        </div>
        <button 
          onClick={handleSave} 
          className="btn btn-primary" 
          disabled={saving}
          style={{ padding: '0.75rem 2rem' }}
        >
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
        {/* Sidebar: Section List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b' }}>Page Structure</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div 
              onClick={() => setActiveSectionId('metadata')}
              style={{ 
                padding: '1rem', 
                backgroundColor: activeSectionId === 'metadata' ? '#eff6ff' : 'white',
                border: `1px solid ${activeSectionId === 'metadata' ? '#3b82f6' : '#e2e8f0'}`,
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>🔍 SEO & Metadata</div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>PAGE SETTINGS</div>
            </div>

            <div style={{ margin: '0.5rem 0', borderTop: '1px solid #f1f5f9' }}></div>

            {pageData.sections.sort((a: any, b: any) => a.order - b.order).map((section: any) => (
              <div 
                key={section.id} 
                onClick={() => setActiveSectionId(section.id)}
                style={{ 
                  padding: '1rem', 
                  backgroundColor: activeSectionId === section.id ? '#fef2f2' : 'white',
                  border: `1px solid ${activeSectionId === section.id ? 'var(--accent)' : '#e2e8f0'}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{section.title}</div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>{section.type}</div>
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '1rem', textTransform: 'uppercase' }}>Add New Section</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {['hero', 'features', 'text', 'gallery', 'cta'].map(type => (
                <button 
                  key={type} 
                  onClick={() => addSection(type)}
                  className={styles.buttonGhost}
                  style={{ fontSize: '0.75rem', padding: '0.5rem' }}
                >
                  + {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area: Section Editor */}
        <div className={styles.card}>
          {activeSectionId === 'metadata' ? (
            <MetadataForm 
              data={pageData.metadata || {}} 
              pageTitle={pageData.title}
              onUpdate={(updates: any) => setPageData({ ...pageData, ...updates })}
            />
          ) : activeSectionId ? (
            <SectionForm 
              section={pageData.sections.find((s: any) => s.id === activeSectionId)} 
              onUpdate={(updates: any) => updateSection(activeSectionId, updates)}
              onRemove={() => removeSection(activeSectionId)}
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '5rem', color: '#94a3b8' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
              <p>Select a section from the left to start editing its content.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MetadataForm({ data, pageTitle, onUpdate }: any) {
  return (
    <div>
      <div style={{ marginBottom: '2rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>SEO & Page Settings</h3>
        <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Configure how this page appears in search engines and browser tabs.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div className={styles.formGroup}>
          <label>Admin Page Title (CMS Internal)</label>
          <input 
            type="text" 
            value={pageTitle || ''} 
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="e.g. Admissions Overview"
          />
        </div>

        <div style={{ margin: '1rem 0', borderTop: '1px solid #f1f5f9' }}></div>

        <div className={styles.formGroup}>
          <label>SEO Browser Title</label>
          <input 
            type="text" 
            value={data.title || ''} 
            onChange={(e) => onUpdate({ metadata: { ...data, title: e.target.value } })}
            placeholder="e.g. Admissions 2026-27 | Rishi Vidyalaya"
          />
          <p style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Visible in browser tabs and search results.</p>
        </div>

        <div className={styles.formGroup}>
          <label>Meta Description</label>
          <textarea 
            value={data.description || ''} 
            onChange={(e) => onUpdate({ metadata: { ...data, description: e.target.value } })}
            placeholder="Brief summary of the page content..."
            style={{ minHeight: '100px' }}
          />
          <p style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Shown below the title in search results (recommended: 150-160 characters).</p>
        </div>

        <div className={styles.formGroup}>
          <label>Keywords</label>
          <input 
            type="text" 
            value={data.keywords || ''} 
            onChange={(e) => onUpdate({ metadata: { ...data, keywords: e.target.value } })}
            placeholder="e.g. school, admissions, dharmavaram"
          />
          <p style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Comma-separated list of relevant search terms.</p>
        </div>
      </div>
    </div>
  );
}

function SectionForm({ section, onUpdate, onRemove }: any) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Edit Section: {section.title}</h3>
        <button onClick={onRemove} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>Delete Section</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div className={styles.formGroup}>
          <label>Display Title</label>
          <input 
            type="text" 
            value={section.title || ''} 
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="e.g. Hero Banner"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className={styles.formGroup}>
            <label>Section Order</label>
            <input 
              type="number" 
              value={section.order} 
              onChange={(e) => onUpdate({ order: parseInt(e.target.value) })}
            />
          </div>
          <div className={styles.formGroup} style={{ flexDirection: 'row', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
            <input 
              type="checkbox" 
              checked={section.isVisible} 
              onChange={(e) => onUpdate({ isVisible: e.target.checked })}
              style={{ width: '20px', height: '20px' }}
            />
            <label>Visible on Live Site</label>
          </div>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>Section Content (JSON Data)</h4>
            <button 
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = async (e: any) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  
                  const formData = new FormData();
                  formData.append('file', file);
                  
                  try {
                    const res = await fetch('/api/upload', {
                      method: 'POST',
                      body: formData
                    });
                    const data = await res.json();
                    if (data.success) {
                      alert(`Upload successful! URL: ${data.url}\n\nCopy this URL and paste it into your JSON content.`);
                    } else {
                      alert('Upload failed: ' + data.error);
                    }
                  } catch (err) {
                    alert('Upload failed');
                  }
                };
                input.click();
              }}
              className={styles.buttonGhost}
              style={{ fontSize: '0.8rem' }}
            >
              📷 Upload Image Helper
            </button>
          </div>
          <textarea 
            style={{ 
              width: '100%', 
              minHeight: '300px', 
              fontFamily: 'monospace', 
              padding: '1rem', 
              borderRadius: '12px', 
              border: '1px solid #e2e8f0',
              backgroundColor: '#f8fafc'
            }}
            value={JSON.stringify(section.content, null, 2)}
            onChange={(e) => {
              try {
                const newContent = JSON.parse(e.target.value);
                onUpdate({ content: newContent });
              } catch (err) {
                // Ignore invalid JSON while typing
              }
            }}
          />
          <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>
            Tip: Edit the JSON object above to update specific fields like text, image URLs, etc.
          </p>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../admin.module.css';

export default function PagesManagement() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/pages');
      const data = await res.json();
      if (data.success) {
        setPages(data.data);
      }
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>Page Management</h1>
          <p style={{ color: '#64748b' }}>Manage dynamic content and sections for your website pages.</p>
        </div>
        <button 
          onClick={() => {
            const title = prompt('Enter page title:');
            const slug = prompt('Enter page slug (URL path):');
            if (title && slug) {
              fetch('/api/pages', {
                method: 'POST',
                headers: { 
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ slug, title, sections: [] })
              }).then(res => res.json()).then(data => {
                if (data.success) fetchPages();
                else alert(data.error);
              });
            }
          }}
          className="btn btn-primary"
        >
          + Create New Page
        </button>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Managed Pages</div>
          <div className={styles.statValue}>{pages.length}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Last Updated</div>
          <div className={styles.statValue} style={{ fontSize: '1.25rem' }}>
            {pages.length > 0 ? new Date(Math.max(...pages.map(p => new Date(p.updatedAt).getTime()))).toLocaleDateString() : 'N/A'}
          </div>
        </div>
      </div>

      <div className={styles.card} style={{ padding: 0, overflow: 'hidden' }}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Page Title</th>
                <th>URL Slug</th>
                <th>Last Modified</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '5rem', color: '#64748b' }}>Loading pages...</td></tr>
              ) : pages.map(page => (
                <tr key={page.slug}>
                  <td style={{ fontWeight: 700, color: 'var(--primary)' }}>{page.title}</td>
                  <td><code>/{page.slug === 'home' ? '' : page.slug}</code></td>
                  <td>{new Date(page.updatedAt).toLocaleString()}</td>
                  <td>
                    <span className={styles.statusBadge} style={{ backgroundColor: '#dcfce7', color: '#15803d' }}>
                      Active
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link 
                        href={`/admin/pages/${page.slug}`}
                        className={styles.buttonGhost}
                        style={{ color: 'var(--accent)', borderColor: 'rgba(220, 38, 38, 0.2)' }}
                      >
                        Edit
                      </Link>
                      {page.slug !== 'home' && (
                        <button
                          onClick={async () => {
                            if (confirm(`Are you sure you want to delete the "${page.title}" page?`)) {
                              const res = await fetch(`/api/pages/${page.slug}`, { method: 'DELETE' });
                              if (res.ok) fetchPages();
                              else alert('Failed to delete page');
                            }
                          }}
                          className={styles.buttonGhost}
                          style={{ color: '#ef4444', borderColor: '#fee2e2' }}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && pages.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '5rem' }}>
                    <div style={{ marginBottom: '1rem', color: '#64748b' }}>No pages are currently managed via CMS.</div>
                    <button 
                      onClick={async () => {
                        // Initialize with home page if empty
                        await fetch('/api/pages', {
                          method: 'POST',
                          headers: { 
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({ slug: 'home', title: 'Home Page', sections: [] })
                        });
                        fetchPages();
                      }}
                      className="btn btn-primary"
                    >
                      Initialize Home Page
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

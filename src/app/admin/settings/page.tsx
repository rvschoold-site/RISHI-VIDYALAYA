'use client';

import React, { useState, useEffect } from 'react';
import styles from '../admin.module.css';

export default function SiteSettings() {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/settings', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setSettings(data.data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Settings updated successfully!' });
      } else {
        throw new Error('Failed to update settings');
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: '2rem' }}>Loading settings...</div>;

  return (
    <div style={{ maxWidth: '800px' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem' }}>Site Settings</h1>

      {message.text && (
        <div style={{ 
          padding: '1rem', 
          borderRadius: '8px', 
          marginBottom: '1.5rem',
          backgroundColor: message.type === 'success' ? '#f0fdf4' : '#fef2f2',
          color: message.type === 'success' ? '#15803d' : '#b91c1c',
          border: `1px solid ${message.type === 'success' ? '#dcfce7' : '#fee2e2'}`
        }}>
          {message.text}
        </div>
      )}

      <div className={styles.card}>
        <form onSubmit={handleSave}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Contact Information</h3>
            
            <div className={styles.formGroup}>
              <label>School Email (Public)</label>
              <input 
                type="email" 
                value={settings.CONTACT_EMAIL || ''} 
                onChange={(e) => setSettings({ ...settings, CONTACT_EMAIL: e.target.value })}
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
            </div>

            <div className={styles.formGroup}>
              <label>School Phone</label>
              <input 
                type="text" 
                value={settings.CONTACT_PHONE || ''} 
                onChange={(e) => setSettings({ ...settings, CONTACT_PHONE: e.target.value })}
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: '1rem' }}>Admission Settings</h3>
            
            <div className={styles.formGroup}>
              <label>Academic Year</label>
              <input 
                type="text" 
                value={settings.ACADEMIC_YEAR || '2026-27'} 
                onChange={(e) => setSettings({ ...settings, ACADEMIC_YEAR: e.target.value })}
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
            </div>

            <div className={styles.formGroup} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
              <input 
                type="checkbox" 
                checked={settings.ADMISSIONS_OPEN === 'true'} 
                onChange={(e) => setSettings({ ...settings, ADMISSIONS_OPEN: String(e.target.checked) })}
                id="admissions_open"
                style={{ width: '20px', height: '20px' }}
              />
              <label htmlFor="admissions_open">Open for New Admissions</label>
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: '1rem' }}>External Links</h3>

            <div className={styles.formGroup}>
              <label>Online Application URL (Wix/Google Form)</label>
              <input 
                type="text" 
                value={settings.APPLICATION_URL || ''} 
                onChange={(e) => setSettings({ ...settings, APPLICATION_URL: e.target.value })}
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

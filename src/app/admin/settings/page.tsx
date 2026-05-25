'use client';

import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, 
  Phone, 
  Mail, 
  Calendar, 
  Navigation, 
  Share2, 
  Save, 
  CheckCircle2, 
  AlertCircle,
  Loader2
} from 'lucide-react';
import styles from '../admin.module.css';

export default function SiteSettings() {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
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
      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(settings)
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Settings updated successfully!' });
        setTimeout(() => setMessage({ type: '', text: '' }), 4000);
      } else {
        throw new Error('Failed to update settings');
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <Loader2 className="animate-spin" size={24} />
        <span>Loading settings...</span>
      </div>
    );
  }

  const tabs = [
    { id: 'general', name: 'General Info', icon: <SettingsIcon size={16} /> },
    { id: 'admissions', name: 'Admissions', icon: <Calendar size={16} /> },
    { id: 'navigation', name: 'Navigation', icon: <Navigation size={16} /> },
    { id: 'social', name: 'Social Media', icon: <Share2 size={16} /> },
  ];

  return (
    <div style={{ maxWidth: '1000px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div className={styles.header} style={{ margin: 0 }}>
          <h1>Site Settings</h1>
          <p>Configure global website parameters, admissions, and contact details</p>
        </div>
        <button 
          onClick={handleSave} 
          className={styles.buttonPrimary} 
          disabled={saving}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.25rem' }}
        >
          {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
          <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
        </button>
      </div>

      {message.text && (
        <div style={{ 
          padding: '0.75rem 1rem', 
          borderRadius: '8px', 
          marginBottom: '1.5rem',
          backgroundColor: message.type === 'success' ? '#f0fdf4' : '#fef2f2',
          color: message.type === 'success' ? '#15803d' : '#b91c1c',
          border: `1px solid ${message.type === 'success' ? '#dcfce7' : '#fee2e2'}`,
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span>{message.text}</span>
        </div>
      )}

      <div className={styles.settingsLayout}>
        {/* Tabs Sidebar */}
        <div className={styles.settingsTabs}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === tab.id ? '#fef2f2' : 'transparent',
                color: activeTab === tab.id ? 'var(--accent, #DC2626)' : '#64748b',
                fontWeight: activeTab === tab.id ? 700 : 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'left',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className={styles.card} style={{ flex: 1, minHeight: '400px' }}>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {activeTab === 'general' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
                  <Mail size={18} style={{ color: 'var(--accent, #DC2626)' }} />
                  <span>Contact Information</span>
                </h3>
                
                <div className={styles.formGroup}>
                  <label>School Email (Public)</label>
                  <input 
                    type="email" 
                    value={settings.CONTACT_EMAIL || ''} 
                    onChange={(e) => setSettings({ ...settings, CONTACT_EMAIL: e.target.value })}
                    placeholder="info@rishividyalaya.edu"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>School Phone</label>
                  <input 
                    type="text" 
                    value={settings.CONTACT_PHONE || ''} 
                    onChange={(e) => setSettings({ ...settings, CONTACT_PHONE: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>School Address</label>
                  <textarea 
                    value={settings.CONTACT_ADDRESS || ''} 
                    onChange={(e) => setSettings({ ...settings, CONTACT_ADDRESS: e.target.value })}
                    placeholder="Enter school location..."
                    rows={4}
                  />
                </div>
              </div>
            )}

            {activeTab === 'admissions' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
                  <Calendar size={18} style={{ color: 'var(--accent, #DC2626)' }} />
                  <span>Enrollment Cycles</span>
                </h3>
                
                <div className={styles.formGroup}>
                  <label>Active Academic Year</label>
                  <input 
                    type="text" 
                    value={settings.ACADEMIC_YEAR || '2026-27'} 
                    onChange={(e) => setSettings({ ...settings, ACADEMIC_YEAR: e.target.value })}
                  />
                </div>

                <div style={{ 
                  backgroundColor: '#f8fafc', 
                  padding: '1.25rem', 
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary)' }}>Admissions Lead Inbound status</div>
                    <div style={{ fontSize: '0.775rem', color: '#64748b', marginTop: '0.15rem' }}>Control visibility of the Admissions button on the homepage.</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: settings.ADMISSIONS_OPEN === 'true' ? '#166534' : '#991b1b', backgroundColor: settings.ADMISSIONS_OPEN === 'true' ? '#dcfce7' : '#ffe4e6', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                      {settings.ADMISSIONS_OPEN === 'true' ? 'OPEN' : 'CLOSED'}
                    </span>
                    <input 
                      type="checkbox" 
                      checked={settings.ADMISSIONS_OPEN === 'true'} 
                      onChange={(e) => setSettings({ ...settings, ADMISSIONS_OPEN: String(e.target.checked) })}
                      style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'navigation' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
                  <Navigation size={18} style={{ color: 'var(--accent, #DC2626)' }} />
                  <span>Navbar Configuration</span>
                </h3>
                <div className={styles.formGroup}>
                  <label>Main Navigation (JSON Array)</label>
                  <textarea 
                    value={settings.NAV_LINKS || '[]'} 
                    onChange={(e) => setSettings({ ...settings, NAV_LINKS: e.target.value })}
                    style={{ 
                      minHeight: '280px', 
                      fontFamily: 'monospace',
                      backgroundColor: '#f8fafc',
                      fontSize: '0.8rem'
                    }}
                  />
                  <div style={{ 
                    marginTop: '0.5rem', 
                    padding: '0.75rem', 
                    backgroundColor: '#eff6ff', 
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    color: '#1e40af',
                    lineHeight: '1.4'
                  }}>
                    <strong>Format Checklist:</strong> Must be a valid JSON array of objects containing <code>label</code> and <code>path</code> keys. <br/>
                    Example: <code>[{'{"label": "Home", "path": "/"}'}]</code>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'social' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
                  <Share2 size={18} style={{ color: 'var(--accent, #DC2626)' }} />
                  <span>Social Media Handles</span>
                </h3>
                
                <div className={styles.formGroup}>
                  <label>Facebook Page URL</label>
                  <input 
                    type="url" 
                    value={settings.SOCIAL_FB || ''} 
                    onChange={(e) => setSettings({ ...settings, SOCIAL_FB: e.target.value })}
                    placeholder="https://facebook.com/..."
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Instagram Username</label>
                  <input 
                    type="text" 
                    value={settings.SOCIAL_IG || ''} 
                    onChange={(e) => setSettings({ ...settings, SOCIAL_IG: e.target.value })}
                    placeholder="@rishividyalaya"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Twitter/X Profile URL</label>
                  <input 
                    type="url" 
                    value={settings.SOCIAL_TW || ''} 
                    onChange={(e) => setSettings({ ...settings, SOCIAL_TW: e.target.value })}
                    placeholder="https://twitter.com/..."
                  />
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

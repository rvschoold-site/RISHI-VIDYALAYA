'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styles from '../../login/login.module.css';

export default function InvitationSetupPage() {
  const { token } = useParams();
  const router = useRouter();
  const [invitation, setInvitation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', password: '', confirmPassword: '' });
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch(`/api/admin/invite/${token}`);
        const data = await res.json();
        if (data.success) {
          setInvitation(data.data);
        } else {
          setStatus(prev => ({ ...prev, error: data.error || 'Invalid or expired invitation' }));
        }
      } catch (err) {
        setStatus(prev => ({ ...prev, error: 'Failed to verify invitation' }));
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setStatus(prev => ({ ...prev, error: 'Passwords do not match' }));
      return;
    }

    setStatus({ loading: true, error: '', success: '' });
    try {
      const res = await fetch(`/api/admin/invite/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, password: formData.password })
      });
      const data = await res.json();
      if (data.success) {
        setStatus({ loading: false, error: '', success: data.message });
        setTimeout(() => router.push('/admin/login'), 2000);
      } else {
        setStatus({ loading: false, error: data.error, success: '' });
      }
    } catch (err) {
      setStatus({ loading: false, error: 'Failed to complete setup', success: '' });
    }
  };

  if (loading) return <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>Verifying invitation...</div>;

  if (status.error && !invitation) {
    return (
      <div className={styles.container}>
        <div className={styles.loginCard} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
          <h1 style={{ color: '#ef4444' }}>Invalid Invitation</h1>
          <p>{status.error}</p>
          <button onClick={() => router.push('/')} className="btn btn-outline" style={{ marginTop: '1.5rem' }}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginCard} style={{ maxWidth: '500px' }}>
        <div className={styles.header}>
          <span className="badge-premium" style={{ marginBottom: '1rem', display: 'inline-block' }}>Profile Setup</span>
          <h1>Welcome to Rishi Admin</h1>
          <p>You've been invited as <strong>{invitation?.role?.replace('_', ' ')}</strong> for <strong>{invitation?.email}</strong>.</p>
        </div>

        {status.error && <div className={styles.error} style={{ marginBottom: '1.5rem' }}>{status.error}</div>}
        {status.success && <div style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', textAlign: 'center' }}>{status.success}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Your Full Name</label>
            <input 
              type="text" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. John Doe"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Create Password</label>
            <input 
              type="password" 
              required 
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Confirm Password</label>
            <input 
              type="password" 
              required 
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={status.loading} style={{ marginTop: '1rem' }}>
            {status.loading ? 'Setting up account...' : 'Complete Account Setup'}
          </button>
        </form>
      </div>
    </div>
  );
}

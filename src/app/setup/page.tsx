'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../admin/login/login.module.css';

export default function SetupPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [status, setStatus] = useState({ loading: true, error: '', success: '', setupRequired: false });
  const router = useRouter();

  useEffect(() => {
    checkSetup();
  }, []);

  const checkSetup = async () => {
    try {
      const res = await fetch('/api/setup');
      const data = await res.json();
      if (!data.setupRequired) {
        router.push('/admin/login');
      } else {
        setStatus(prev => ({ ...prev, loading: false, setupRequired: true }));
      }
    } catch (err) {
      setStatus(prev => ({ ...prev, loading: false, error: 'Failed to check setup status' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setStatus(prev => ({ ...prev, error: 'Passwords do not match' }));
      return;
    }

    setStatus(prev => ({ ...prev, loading: true, error: '' }));

    try {
      const res = await fetch('/api/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Setup failed');

      setStatus(prev => ({ ...prev, loading: false, success: 'Super Admin created successfully! Redirecting...' }));
      setTimeout(() => router.push('/admin/login'), 2000);
    } catch (err: any) {
      setStatus(prev => ({ ...prev, loading: false, error: err.message }));
    }
  };

  if (status.loading && !status.setupRequired) {
    return <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>Checking setup status...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginCard} style={{ maxWidth: '500px' }}>
        <div className={styles.header}>
          <span className="badge-premium" style={{ marginBottom: '1rem', display: 'inline-block' }}>Initial Setup</span>
          <h1>Create Super Admin</h1>
          <p>Please configure your master administrator account to get started.</p>
        </div>

        {status.error && <div className={styles.error} style={{ marginBottom: '1.5rem' }}>{status.error}</div>}
        {status.success && <div style={{ backgroundColor: '#f0fdf4', color: '#15803d', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 600 }}>{status.success}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. John Doe"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="admin@example.com"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className={styles.formGroup}>
              <label>Password</label>
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
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }} disabled={status.loading}>
            {status.loading ? 'Creating Account...' : 'Complete Setup'}
          </button>
        </form>
      </div>
    </div>
  );
}

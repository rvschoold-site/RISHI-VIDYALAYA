'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styles from '../../login/login.module.css';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });
  const router = useRouter();
  const params = useParams();
  const token = params.token;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setStatus({ ...status, error: 'Passwords do not match' });
    }
    
    setStatus({ loading: true, error: '', success: '' });

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Reset failed');

      setStatus({ loading: false, error: '', success: 'Password reset successful! Redirecting to login...' });
      setTimeout(() => router.push('/admin/login'), 2000);
    } catch (err: any) {
      setStatus({ loading: false, error: err.message, success: '' });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <h1>Reset Password</h1>
          <p>Enter your new password below</p>
        </div>

        {status.error && <div className={styles.error}>{status.error}</div>}
        {status.success && <div style={{ backgroundColor: '#f0fdf4', color: '#15803d', padding: '0.75rem 1rem', borderRadius: '6px', marginBottom: '1.5rem', fontSize: '0.875rem', border: '1px solid #dcfce7' }}>{status.success}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="password">New Password</label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={status.loading}>
            {status.loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}

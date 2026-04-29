'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../login/login.module.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: '' });

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Request failed');

      setStatus({ loading: false, error: '', success: data.message });
    } catch (err: any) {
      setStatus({ loading: false, error: err.message, success: '' });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <h1>Forgot Password?</h1>
          <p>Enter your email to receive a reset link</p>
        </div>

        {status.error && <div className={styles.error}>{status.error}</div>}
        {status.success && <div style={{ backgroundColor: '#f0fdf4', color: '#15803d', padding: '0.75rem 1rem', borderRadius: '6px', marginBottom: '1.5rem', fontSize: '0.875rem', border: '1px solid #dcfce7' }}>{status.success}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={status.loading}>
            {status.loading ? 'Sending...' : 'Send Reset Link'}
          </button>

          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Link href="/admin/login" className={styles.forgotLink}>Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

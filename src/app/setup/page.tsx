'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './setup.module.css';

export default function SetupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    setupKey: ''
  });
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: '' });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/setup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Setup failed');

      setStatus({ loading: false, error: '', success: 'Super Admin created successfully! Redirecting to login...' });
      setTimeout(() => router.push('/admin/login'), 2000);
    } catch (err: any) {
      setStatus({ loading: false, error: err.message, success: '' });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.setupCard}>
        <div className={styles.header}>
          <h1>System Setup</h1>
          <p>Initialize the Super Admin account</p>
        </div>

        {status.error && <div className={styles.error}>{status.error}</div>}
        {status.success && <div className={styles.success}>{status.success}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your name"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="admin@rishividyalaya.com"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Minimum 8 characters"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="setupKey">Setup Key (Optional for dev)</label>
            <input
              id="setupKey"
              type="password"
              value={formData.setupKey}
              onChange={(e) => setFormData({ ...formData, setupKey: e.target.value })}
              placeholder="Enter system setup key"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={status.loading}>
            {status.loading ? 'Setting up...' : 'Create Super Admin'}
          </button>
        </form>
      </div>
    </div>
  );
}

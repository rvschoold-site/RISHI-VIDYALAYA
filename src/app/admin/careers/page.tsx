'use client';

import React, { useEffect, useState } from 'react';
import styles from '../admin.module.css';

interface Application {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  positionName: string;
  experience: string;
  resumeUrl: string;
  createdAt: string;
}

export default function CareersAdminPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const res = await fetch('/api/careers');
      const data = await res.json();
      if (Array.isArray(data)) {
        setApplications(data);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/careers/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setApplications(applications.map(app => app.id === id ? { ...app, status: newStatus } : app));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteApplication = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return;
    try {
      const res = await fetch(`/api/careers/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setApplications(applications.filter(app => app.id !== id));
      }
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  useEffect(() => {
    fetchApplications();
    const interval = setInterval(fetchApplications, 15000); // 15s polling
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className={styles.loading}>Loading Applications...</div>;

  return (
    <div className="animate-fade-in">
      <div className={styles.header} style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Job Applications</h1>
        <p style={{ color: '#64748b' }}>Manage career inquiries and resumes</p>
      </div>

      <div className={styles.card}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Candidate</th>
                <th>Position</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app: any) => (
                <tr key={app.id}>
                  <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{app.fullName}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{app.email}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{app.phone}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 500 }}>{app.positionName}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{app.experience}</div>
                  </td>
                  <td>
                    <select
                      value={app.status || 'PENDING'}
                      onChange={(e) => updateStatus(app.id, e.target.value)}
                      className={`${styles.statusBadge} ${styles[`status${(app.status || 'PENDING').charAt(0).toUpperCase() + (app.status || 'PENDING').slice(1).toLowerCase()}`]}`}
                      style={{ border: 'none', cursor: 'pointer', appearance: 'none' }}
                    >
                      <option value="PENDING">Pending</option>
                      <option value="REVIEWED">Reviewed</option>
                      <option value="SHORTLISTED">Shortlisted</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <a 
                        href={app.resumeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.buttonGhost}
                        style={{ color: 'var(--primary)', borderColor: '#e2e8f0', fontSize: '0.75rem' }}
                      >
                        Resume
                      </a>
                      <button
                        onClick={() => deleteApplication(app.id)}
                        className={styles.buttonGhost}
                        style={{ color: '#ef4444', borderColor: '#fee2e2', fontSize: '0.75rem' }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {applications.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                    No applications received yet.
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

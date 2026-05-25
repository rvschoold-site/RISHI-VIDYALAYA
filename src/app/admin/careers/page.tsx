'use client';

import React, { useEffect, useState } from 'react';
import { Trash2, Loader2, RefreshCw, FileText } from 'lucide-react';
import styles from '../admin.module.css';

interface Application {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  positionName: string;
  experience: string;
  resumeUrl: string;
  status: string;
  createdAt: string;
}

export default function CareersAdminPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchApplications = async (isPoll = false) => {
    if (!isPoll) setRefreshing(true);
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
      setRefreshing(false);
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
    if (!confirm('Are you sure you want to permanently delete this job application? This action cannot be undone.')) return;
    try {
      const res = await fetch(`/api/careers/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setApplications(applications.filter(app => app.id !== id));
      } else {
        alert('Failed to delete application.');
      }
    } catch (error) {
      console.error('Error deleting application:', error);
      alert('An error occurred while deleting the application.');
    }
  };

  useEffect(() => {
    fetchApplications();
    const interval = setInterval(() => fetchApplications(true), 15000); // 15s polling
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div className={styles.header} style={{ margin: 0 }}>
          <h1>Job Applications</h1>
          <p>Manage career inquiries and review candidate resumes</p>
        </div>

        <button 
          className={styles.buttonGhost} 
          onClick={() => fetchApplications()} 
          disabled={refreshing}
          style={{ padding: '0.5rem 0.75rem' }}
        >
          <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      <div className={styles.card} style={{ padding: 0, overflow: 'hidden' }}>
        <div className={styles.tableContainer} style={{ border: 'none' }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Candidate</th>
                <th>Position</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Loading applications...</span>
                    </div>
                  </td>
                </tr>
              ) : applications.map((app) => (
                <tr key={app.id}>
                  <td>{new Date(app.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{app.fullName}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{app.email}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{app.phone}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{app.positionName}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.15rem' }}>Exp: {app.experience}</div>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[`status${(app.status || 'PENDING').charAt(0).toUpperCase() + (app.status || 'PENDING').slice(1).toLowerCase()}`]}`}>
                      {app.status || 'PENDING'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                      <select
                        value={app.status || 'PENDING'}
                        onChange={(e) => updateStatus(app.id, e.target.value)}
                        style={{ 
                          padding: '0.4rem 0.5rem', 
                          borderRadius: '6px', 
                          fontSize: '0.8rem', 
                          border: '1px solid #cbd5e1',
                          backgroundColor: '#ffffff',
                          fontWeight: 600,
                          color: '#334155'
                        }}
                      >
                        <option value="PENDING">Pending</option>
                        <option value="REVIEWED">Reviewed</option>
                        <option value="SHORTLISTED">Shortlisted</option>
                        <option value="REJECTED">Rejected</option>
                      </select>

                      <a 
                        href={app.resumeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.buttonGhost}
                        style={{ padding: '0.4rem 0.6rem', height: '30px' }}
                        title="View Resume"
                      >
                        <FileText size={14} />
                        <span>Resume</span>
                      </a>

                      <button
                        onClick={() => deleteApplication(app.id)}
                        className={styles.buttonDanger}
                        style={{ padding: '0.45rem', borderRadius: '6px' }}
                        title="Delete Application"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && applications.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '5rem', color: '#64748b' }}>
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

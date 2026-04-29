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
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/careers', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
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
                <th>Experience</th>
                <th>Resume</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{app.fullName}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{app.email}</div>
                  </td>
                  <td>{app.positionName}</td>
                  <td>{app.experience}</td>
                  <td>
                    <a 
                      href={app.resumeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.buttonGhost}
                      style={{ color: 'var(--accent)', borderColor: 'rgba(220, 38, 38, 0.2)' }}
                    >
                      View Resume
                    </a>
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

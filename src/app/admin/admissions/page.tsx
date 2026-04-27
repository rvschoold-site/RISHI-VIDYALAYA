'use client';

import React, { useState, useEffect } from 'react';
import styles from '../admin.module.css';

interface Lead {
  id: string;
  parentName: string;
  studentName: string;
  email: string;
  phone: string;
  grade: string;
  status: string;
  createdAt: string;
}

export default function AdmissionsInbox() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/admissions`);
      const data = await res.json();
      if (data.success) {
        setLeads(data.data);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/admissions/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredLeads = filter === 'ALL' ? leads : leads.filter(l => l.status === filter);

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Admissions Inbox</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['ALL', 'NEW', 'CONTACTED', 'INTERVIEW', 'ENROLLED', 'REJECTED'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                backgroundColor: filter === f ? 'var(--primary)' : 'white',
                color: filter === f ? 'white' : 'var(--text-muted)',
                border: '1px solid #e2e8f0',
                cursor: 'pointer'
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.card} style={{ padding: 0, overflow: 'hidden' }}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Student / Parent</th>
                <th>Contact Info</th>
                <th>Grade</th>
                <th>Received At</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '3rem' }}>Loading inquiries...</td></tr>
              ) : filteredLeads.map(lead => (
                <tr key={lead.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{lead.studentName}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>P: {lead.parentName}</div>
                  </td>
                  <td>
                    <div>{lead.email}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{lead.phone}</div>
                  </td>
                  <td><span style={{ backgroundColor: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>Grade {lead.grade}</span></td>
                  <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[`status${lead.status.charAt(0).toUpperCase() + lead.status.slice(1).toLowerCase()}`]}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td>
                    <select 
                      value={lead.status}
                      onChange={(e) => updateStatus(lead.id, e.target.value)}
                      style={{ padding: '0.3rem', borderRadius: '4px', fontSize: '0.8rem', border: '1px solid #e2e8f0' }}
                    >
                      <option value="NEW">New</option>
                      <option value="CONTACTED">Contacted</option>
                      <option value="INTERVIEW">Interview</option>
                      <option value="ENROLLED">Enrolled</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
              {!loading && filteredLeads.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>No inquiries found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

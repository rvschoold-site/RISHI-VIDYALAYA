'use client';

import React, { useState, useEffect } from 'react';
import { Trash2, Loader2, RefreshCw } from 'lucide-react';
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
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    fetchLeads(true);
    // Real-time polling: fetch every 15 seconds
    const interval = setInterval(() => fetchLeads(true), 15000);
    return () => clearInterval(interval);
  }, []);

  const fetchLeads = async (isPoll = false) => {
    if (!isPoll) setRefreshing(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/admissions', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setLeads(data);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/admissions/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this admission inquiry? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/admissions/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        setLeads(leads.filter(l => l.id !== id));
      } else {
        const err = await res.json();
        alert(`Failed to delete inquiry: ${err.error || 'Server error'}`);
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
      alert('An error occurred while deleting the inquiry.');
    }
  };

  const filteredLeads = filter === 'ALL' ? leads : leads.filter(l => l.status === filter);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div className={styles.header} style={{ margin: 0 }}>
          <h1>Admissions Inbox</h1>
          <p>Review and manage student admission leads</p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button 
            className={styles.buttonGhost} 
            onClick={() => fetchLeads()} 
            disabled={refreshing}
            style={{ padding: '0.5rem 0.75rem' }}
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>

          <div style={{ display: 'flex', gap: '0.25rem', backgroundColor: 'white', padding: '0.35rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
            {['ALL', 'NEW', 'CONTACTED', 'ENROLLED', 'REJECTED'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  backgroundColor: filter === f ? 'var(--accent, #DC2626)' : 'transparent',
                  color: filter === f ? 'white' : '#64748b',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.card} style={{ padding: 0, overflow: 'hidden' }}>
        <div className={styles.tableContainer} style={{ border: 'none' }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Student / Parent</th>
                <th>Contact Info</th>
                <th>Grade</th>
                <th>Received At</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Loading inquiries...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredLeads.map(lead => (
                <tr key={lead.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{lead.studentName}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>Parent: {lead.parentName}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 500 }}>{lead.email}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{lead.phone}</div>
                  </td>
                  <td>
                    <span style={{ backgroundColor: '#f1f5f9', padding: '0.35rem 0.6rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
                      {lead.grade}
                    </span>
                  </td>
                  <td>{new Date(lead.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[`status${lead.status.charAt(0).toUpperCase() + lead.status.slice(1).toLowerCase()}`]}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                      <select 
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value)}
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
                        <option value="NEW">New</option>
                        <option value="CONTACTED">Contacted</option>
                        <option value="INTERVIEW_SCHEDULED">Interview</option>
                        <option value="ENROLLED">Enrolled</option>
                        <option value="REJECTED">Rejected</option>
                      </select>
                      <button 
                        onClick={() => handleDeleteLead(lead.id)}
                        className={styles.buttonDanger}
                        style={{ padding: '0.45rem', borderRadius: '6px' }}
                        title="Delete Lead"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '5rem', color: '#64748b' }}>
                    No inquiries found.
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

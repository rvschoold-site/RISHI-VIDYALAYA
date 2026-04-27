'use client';
import React, { useEffect, useState } from 'react';
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

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/admissions');
      const data = await res.json();
      setLeads(data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      const res = await fetch(`/api/admissions/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setLeads(leads.filter(l => l.id !== id));
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.card}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Student</th>
              <th>Parent</th>
              <th>Grade</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                <td>{lead.studentName}</td>
                <td>{lead.parentName}</td>
                <td>{lead.grade}</td>
                <td>
                  <div style={{ fontSize: '0.75rem' }}>{lead.email}</div>
                  <div style={{ fontWeight: 500 }}>{lead.phone}</div>
                </td>
                <td>
                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus(lead.id, e.target.value)}
                    className={`${styles.statusBadge} ${styles[`status${lead.status.charAt(0).toUpperCase() + lead.status.slice(1).toLowerCase()}`]}`}
                    style={{ border: 'none', cursor: 'pointer', appearance: 'none' }}
                  >
                    <option value="NEW">New</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="INTERVIEW_SCHEDULED">Interview</option>
                    <option value="ENROLLED">Enrolled</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => deleteLead(lead.id)}
                    className={styles.buttonGhost}
                    style={{ color: '#ef4444', borderColor: '#fee2e2' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import styles from '../admin.module.css';

export default function AdminUsersManagement() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [invitations, setInvitations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteData, setInviteData] = useState({ email: '', role: 'ADMIN' });
  const [status, setStatus] = useState({ loading: false, message: '', error: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [adminsRes, invitesRes] = await Promise.all([
        fetch('/api/admin/users'), // Need to create this
        fetch('/api/admin/invite')
      ]);
      const adminsData = await adminsRes.json();
      const invitesData = await invitesRes.json();
      
      if (adminsData.success) setAdmins(adminsData.data);
      if (invitesData.success) setInvitations(invitesData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, message: '', error: '' });
    try {
      const res = await fetch('/api/admin/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inviteData)
      });
      const data = await res.json();
      if (data.success) {
        setStatus({ loading: false, message: `Invitation created! Link: ${data.data.inviteLink}`, error: '' });
        setInviteData({ email: '', role: 'ADMIN' });
        fetchData();
      } else {
        setStatus({ loading: false, message: '', error: data.error });
      }
    } catch (error) {
      setStatus({ loading: false, message: '', error: 'Failed to send invitation' });
    }
  };

  if (loading) return <div style={{ padding: '2rem' }}>Loading user management...</div>;

  return (
    <div style={{ maxWidth: '1000px' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '2rem' }}>User Management</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Active Admins */}
          <div className={styles.card}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 700 }}>Active Administrators</h3>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map(admin => (
                    <tr key={admin.id}>
                      <td style={{ fontWeight: 600 }}>{admin.name}</td>
                      <td>{admin.email}</td>
                      <td>
                        <span className={styles.statusBadge} style={{ 
                          backgroundColor: admin.role === 'SUPER_ADMIN' ? '#fef2f2' : '#f0fdf4',
                          color: admin.role === 'SUPER_ADMIN' ? '#991b1b' : '#166534'
                        }}>
                          {admin.role.replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pending Invitations */}
          <div className={styles.card}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 700 }}>Pending Invitations</h3>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invitations.filter(i => i.status === 'PENDING').map(invite => (
                    <tr key={invite._id}>
                      <td>{invite.email}</td>
                      <td>{invite.role}</td>
                      <td>
                        <span className={styles.statusBadge} style={{ backgroundColor: '#fff7ed', color: '#9a3412' }}>
                          Pending
                        </span>
                      </td>
                    </tr>
                  ))}
                  {invitations.filter(i => i.status === 'PENDING').length === 0 && (
                    <tr><td colSpan={3} style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>No pending invitations</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Invite Form */}
        <aside>
          <div className={styles.card}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 700 }}>Invite New Admin</h3>
            <form onSubmit={handleInvite} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className={styles.formGroup}>
                <label>Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={inviteData.email}
                  onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                  placeholder="colleague@example.com"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Assigned Role</label>
                <select 
                  value={inviteData.role}
                  onChange={(e) => setInviteData({ ...inviteData, role: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                >
                  <option value="ADMIN">Standard Admin</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                </select>
              </div>
              
              {status.error && <p style={{ color: '#ef4444', fontSize: '0.85rem' }}>{status.error}</p>}
              {status.message && (
                <div style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', wordBreak: 'break-all' }}>
                  {status.message}
                </div>
              )}

              <button type="submit" className="btn btn-primary" disabled={status.loading} style={{ marginTop: '1rem' }}>
                {status.loading ? 'Sending...' : 'Send Invitation'}
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}

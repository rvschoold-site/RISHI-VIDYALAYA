'use client';

import React, { useState, useEffect } from 'react';
import { Trash2, UserPlus, Shield, ShieldCheck, Mail, Loader2, RefreshCw, AlertTriangle } from 'lucide-react';
import styles from '../admin.module.css';

export default function AdminUsersManagement() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [invitations, setInvitations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [inviteData, setInviteData] = useState({ email: '', role: 'ADMIN' });
  const [status, setStatus] = useState({ loading: false, message: '', error: '' });
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
    // Load logged in admin from localStorage
    const userStr = localStorage.getItem('adminUser');
    if (userStr) {
      try {
        setCurrentUser(JSON.parse(userStr));
      } catch (e) {
        console.error('Failed to parse adminUser', e);
      }
    }
  }, []);

  const fetchData = async (isPoll = false) => {
    if (!isPoll) setRefreshing(true);
    try {
      const [adminsRes, invitesRes] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/admin/invite')
      ]);
      const adminsData = await adminsRes.json();
      const invitesData = await invitesRes.json();
      
      if (adminsData.success) setAdmins(adminsData.data);
      if (invitesData.success) setInvitations(invitesData.data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
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
        setStatus({ loading: false, message: 'Invitation created and email sent successfully!', error: '' });
        setInviteData({ email: '', role: 'ADMIN' });
        fetchData(true);
      } else {
        setStatus({ loading: false, message: '', error: data.error || 'Failed to send invitation' });
      }
    } catch (error) {
      setStatus({ loading: false, message: '', error: 'Failed to send invitation' });
    }
  };

  const handleRoleChange = async (id: string, newRole: string) => {
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      });
      const data = await res.json();
      if (data.success) {
        setAdmins(admins.map(a => a.id === id ? { ...a, role: newRole } : a));
      } else {
        alert(data.error || 'Failed to update admin role');
      }
    } catch (error) {
      console.error('Error changing role:', error);
      alert('An error occurred while updating the role.');
    }
  };

  const handleDeleteAdmin = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this administrator account? The user will immediately lose dashboard access.')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setAdmins(admins.filter(a => a.id !== id));
      } else {
        alert(data.error || 'Failed to delete administrator');
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
      alert('An error occurred while deleting the administrator account.');
    }
  };

  const handleRevokeInvite = async (id: string) => {
    if (!confirm('Are you sure you want to revoke this invitation? The invitation link will be deactivated.')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/invite?id=${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setInvitations(invitations.filter(i => i._id !== id));
      } else {
        alert(data.error || 'Failed to revoke invitation');
      }
    } catch (error) {
      console.error('Error revoking invitation:', error);
      alert('An error occurred while revoking the invitation.');
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <Loader2 className="animate-spin" size={24} />
        <span>Loading user management...</span>
      </div>
    );
  }

  const activePendingInvites = invitations.filter(i => i.status === 'PENDING');

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div className={styles.header} style={{ margin: 0 }}>
          <h1>User Management</h1>
          <p>Create and manage administrative access credentials and invitations</p>
        </div>

        <button 
          className={styles.buttonGhost} 
          onClick={() => fetchData()} 
          disabled={refreshing}
          style={{ padding: '0.5rem 0.75rem' }}
        >
          <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }} className="admin-user-grid-responsive">
        {/* On desktops we stack two columns. Let's write custom media styles inline or via class */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media (min-width: 1025px) {
            .admin-user-grid-responsive {
              grid-template-columns: 1fr 340px !important;
            }
          }
        `}} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Active Admins */}
          <div className={styles.card}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={18} style={{ color: '#166534' }} />
              <span>Active Administrators</span>
            </h3>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map(admin => {
                    const isSelf = currentUser && currentUser.id === admin.id;
                    const isSuperAdmin = admin.role === 'SUPER_ADMIN';
                    return (
                      <tr key={admin.id}>
                        <td>
                          <div style={{ fontWeight: 700, color: 'var(--primary)' }}>
                            {admin.name} {isSelf && <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent, #DC2626)', backgroundColor: '#fef2f2', padding: '0.1rem 0.4rem', borderRadius: '4px', marginLeft: '0.25rem' }}>(You)</span>}
                          </div>
                        </td>
                        <td>{admin.email}</td>
                        <td>
                          <span className={styles.statusBadge} style={{ 
                            backgroundColor: isSuperAdmin ? '#fef2f2' : '#f0fdf4',
                            color: isSuperAdmin ? '#991b1b' : '#166534'
                          }}>
                            {admin.role.replace('_', ' ')}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          {isSelf || isSuperAdmin ? (
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontStyle: 'italic' }}>Protected</span>
                          ) : (
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                              <select
                                value={admin.role}
                                onChange={(e) => handleRoleChange(admin.id, e.target.value)}
                                style={{
                                  padding: '0.35rem 0.5rem',
                                  borderRadius: '6px',
                                  fontSize: '0.8rem',
                                  border: '1px solid #cbd5e1',
                                  backgroundColor: '#ffffff',
                                  fontWeight: 600,
                                  color: '#334155'
                                }}
                              >
                                <option value="ADMIN">Admin</option>
                                <option value="SUPER_ADMIN">Super Admin</option>
                              </select>
                              <button
                                onClick={() => handleDeleteAdmin(admin.id)}
                                className={styles.buttonDanger}
                                style={{ padding: '0.45rem', borderRadius: '6px' }}
                                title="Delete Admin"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pending Invitations */}
          <div className={styles.card}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={18} style={{ color: '#c2410c' }} />
              <span>Pending Invitations</span>
            </h3>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Email Address</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activePendingInvites.map(invite => (
                    <tr key={invite._id}>
                      <td style={{ fontWeight: 600 }}>{invite.email}</td>
                      <td>{invite.role}</td>
                      <td>
                        <span className={`${styles.statusBadge} ${styles.statusPending}`}>
                          Pending
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={() => handleRevokeInvite(invite._id)}
                          className={styles.buttonDanger}
                          style={{ padding: '0.45rem', borderRadius: '6px' }}
                          title="Revoke Invitation"
                        >
                          <Trash2 size={14} />
                          <span>Revoke</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {activePendingInvites.length === 0 && (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                        No pending invitations found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Invite Form */}
        <aside>
          <div className={styles.card}>
            <h3 style={{ marginBottom: '1.25rem', fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <UserPlus size={18} style={{ color: 'var(--accent, #DC2626)' }} />
              <span>Invite Colleague</span>
            </h3>
            <form onSubmit={handleInvite} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className={styles.formGroup}>
                <label>Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={inviteData.email}
                  onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                  placeholder="colleague@rishividyalaya.in"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Access Role</label>
                <select 
                  value={inviteData.role}
                  onChange={(e) => setInviteData({ ...inviteData, role: e.target.value })}
                >
                  <option value="ADMIN">Standard Admin</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                </select>
              </div>
              
              {status.error && (
                <div style={{ 
                  backgroundColor: '#fef2f2', 
                  color: '#b91c1c', 
                  padding: '0.75rem', 
                  borderRadius: '6px', 
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  border: '1px solid #fee2e2'
                }}>
                  <AlertTriangle size={14} />
                  <span>{status.error}</span>
                </div>
              )}
              
              {status.message && (
                <div style={{ 
                  backgroundColor: '#f0fdf4', 
                  color: '#166534', 
                  padding: '0.75rem', 
                  borderRadius: '6px', 
                  fontSize: '0.8rem', 
                  wordBreak: 'break-all',
                  border: '1px solid #dcfce7'
                }}>
                  {status.message}
                </div>
              )}

              <button type="submit" className={styles.buttonPrimary} disabled={status.loading} style={{ marginTop: '0.5rem' }}>
                {status.loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Loader2 className="animate-spin" size={14} />
                    <span>Sending...</span>
                  </span>
                ) : (
                  <span>Send Invitation Email</span>
                )}
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}

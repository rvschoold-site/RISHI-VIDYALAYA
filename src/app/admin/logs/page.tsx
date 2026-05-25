'use client';

import React, { useEffect, useState, useCallback } from 'react';
import styles from '../admin.module.css';
import { History, Filter, RefreshCw, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

interface AdminLog {
  _id: string;
  adminName: string;
  action: string;
  module: string;
  details: string;
  ip: string;
  createdAt: string;
  adminId: {
    name: string;
    email: string;
    role: string;
  };
}

export default function LogsPage() {
  const [logs, setLogs] = useState<AdminLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1, limit: 50 });
  const [filters, setFilters] = useState({ module: '', action: '' });

  const fetchLogs = useCallback(async (page = 1, isPoll = false) => {
    if (!isPoll) setRefreshing(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
        ...(filters.module && { module: filters.module }),
        ...(filters.action && { action: filters.action })
      });

      const res = await fetch(`/api/admin/logs?${queryParams}`);
      const data = await res.json();
      if (data.success) {
        setLogs(data.data.logs);
        setPagination(data.data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [filters, pagination.limit]);

  useEffect(() => {
    fetchLogs(1);
  }, [fetchLogs]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div className={styles.header} style={{ margin: 0 }}>
          <h1>Activity Logs</h1>
          <p>Monitor all administrative actions and security events</p>
        </div>
        <button 
          onClick={() => fetchLogs(pagination.page)} 
          className={styles.buttonGhost}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          disabled={loading || refreshing}
        >
          <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      <div className={styles.card} style={{ padding: 0, overflow: 'hidden' }}>
        {/* Filters bar */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', backgroundColor: '#f8fafc' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={16} color="#64748b" />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>Filter logs:</span>
          </div>
          
          <select 
            name="module" 
            value={filters.module} 
            onChange={handleFilterChange}
            style={{ padding: '0.45rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.825rem', color: '#334155', fontWeight: 600 }}
          >
            <option value="">All Modules</option>
            <option value="AUTH">Authentication</option>
            <option value="SETTINGS">Settings</option>
            <option value="ADMISSIONS">Admissions</option>
            <option value="CAREERS">Careers</option>
            <option value="GALLERY">Gallery</option>
          </select>

          <select 
            name="action" 
            value={filters.action} 
            onChange={handleFilterChange}
            style={{ padding: '0.45rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.825rem', color: '#334155', fontWeight: 600 }}
          >
            <option value="">All Actions</option>
            <option value="LOGIN">Login</option>
            <option value="UPDATE_SETTINGS">Update Settings</option>
            <option value="FORGOT_PASSWORD_REQUEST">Password Reset Request</option>
          </select>
        </div>

        <div className={styles.tableContainer} style={{ border: 'none' }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Administrator</th>
                <th>Module</th>
                <th>Action</th>
                <th>Details</th>
                <th>IP Address</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Loading logs...</span>
                    </div>
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>
                    No logs found matching your criteria.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log._id}>
                    <td style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{formatDate(log.createdAt)}</td>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{log.adminName}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{log.adminId?.email || 'N/A'}</div>
                    </td>
                    <td>
                      <span style={{ 
                        padding: '0.25rem 0.5rem', 
                        borderRadius: '4px', 
                        fontSize: '0.75rem', 
                        fontWeight: 700,
                        backgroundColor: '#eff6ff',
                        color: '#2563eb'
                      }}>{log.module}</span>
                    </td>
                    <td>
                      <span style={{ 
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        color: log.action === 'LOGIN' ? '#059669' : '#1e293b'
                      }}>{log.action}</span>
                    </td>
                    <td style={{ fontSize: '0.85rem', color: '#475569', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {log.details}
                    </td>
                    <td style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'monospace' }}>
                      {log.ip || 'Unknown'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>
            Showing page {pagination.page} of {pagination.pages} ({pagination.total} total logs)
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              className={styles.buttonGhost} 
              disabled={pagination.page <= 1}
              onClick={() => fetchLogs(pagination.page - 1)}
              style={{ padding: '0.4rem' }}
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              className={styles.buttonGhost} 
              disabled={pagination.page >= pagination.pages}
              onClick={() => fetchLogs(pagination.page + 1)}
              style={{ padding: '0.4rem' }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useState, useCallback } from 'react';
import styles from '../admin.module.css';
import { History, Filter, RefreshCcw, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1, limit: 50 });
  const [filters, setFilters] = useState({ module: '', action: '' });

  const fetchLogs = useCallback(async (page = 1) => {
    setLoading(true);
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
    }
    setLoading(false);
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
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Activity Logs</h1>
          <p style={{ color: '#64748b' }}>Monitor all administrative actions across the system</p>
        </div>
        <button 
          onClick={() => fetchLogs(pagination.page)} 
          className="btn btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          disabled={loading}
        >
          <RefreshCcw size={16} className={loading ? 'spin' : ''} />
          Refresh
        </button>
      </div>

      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
        border: '1px solid #f1f5f9',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={16} color="#64748b" />
            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Filters:</span>
          </div>
          
          <select 
            name="module" 
            value={filters.module} 
            onChange={handleFilterChange}
            style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.875rem' }}
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
            style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.875rem' }}
          >
            <option value="">All Actions</option>
            <option value="LOGIN">Login</option>
            <option value="UPDATE_SETTINGS">Update Settings</option>
            <option value="FORGOT_PASSWORD_REQUEST">Password Reset Request</option>
          </select>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className={styles.table} style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', backgroundColor: '#f8fafc' }}>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b' }}>Timestamp</th>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b' }}>Admin</th>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b' }}>Module</th>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b' }}>Action</th>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b' }}>Details</th>
                <th style={{ padding: '1rem 1.5rem', fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b' }}>IP</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>Loading logs...</td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>No logs found matching your criteria.</td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>{formatDate(log.createdAt)}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{log.adminName}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{log.adminId?.email || 'N/A'}</div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{ 
                        padding: '0.25rem 0.5rem', 
                        borderRadius: '4px', 
                        fontSize: '0.75rem', 
                        fontWeight: 600,
                        backgroundColor: '#eff6ff',
                        color: '#2563eb'
                      }}>{log.module}</span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{ 
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        color: log.action === 'LOGIN' ? '#059669' : '#1e293b'
                      }}>{log.action}</span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: '#475569', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {log.details}
                    </td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', color: '#64748b', fontFamily: 'monospace' }}>
                      {log.ip || 'Unknown'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc' }}>
          <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
            Showing page {pagination.page} of {pagination.pages} ({pagination.total} total logs)
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              className="btn btn-secondary" 
              disabled={pagination.page <= 1}
              onClick={() => fetchLogs(pagination.page - 1)}
              style={{ padding: '0.4rem' }}
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              className="btn btn-secondary" 
              disabled={pagination.page >= pagination.pages}
              onClick={() => fetchLogs(pagination.page + 1)}
              style={{ padding: '0.4rem' }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

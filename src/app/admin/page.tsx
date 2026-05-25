'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import styles from './admin.module.css';

interface StatCardProps {
  label: string;
  value: number | string;
  trend?: string;
  trendUp?: boolean;
}

const StatCard = ({ label, value, trend, trendUp }: StatCardProps) => (
  <div className={styles.statCard}>
    <div className={styles.statLabel}>{label}</div>
    <div className={styles.statValue}>{value}</div>
    {trend && (
      <div className={`${styles.statTrend} ${trendUp ? styles.trendUp : styles.trendDown}`}>
        {trend}
      </div>
    )}
  </div>
);

interface DashboardStats {
  totalLeads: number;
  recentLeads: any[];
  enrolledLeads: number;
  conversionRate: number;
  weeklyTrend: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0,
    recentLeads: [],
    enrolledLeads: 0,
    conversionRate: 0,
    weeklyTrend: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = async (isPoll = false) => {
    if (!isPoll) setRefreshing(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/admissions', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      
      if (Array.isArray(data)) {
        const total = data.length;
        const enrolled = data.filter((l: any) => l.status === 'ENROLLED').length;
        const conversion = total > 0 ? Math.round((enrolled / total) * 100) : 0;
        
        // Calculate weekly trend
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const lastWeekLeads = data.filter((l: any) => new Date(l.createdAt) > oneWeekAgo).length;
        
        setStats({
          totalLeads: total,
          recentLeads: data.slice(0, 5),
          enrolledLeads: enrolled,
          conversionRate: conversion,
          weeklyTrend: lastWeekLeads
        });
      }
    } catch (error) {
      console.error('Dashboard fetch error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(() => fetchDashboardData(true), 15000); // 15s polling
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <Loader2 className="animate-spin" size={24} />
        <span>Loading Dashboard...</span>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.header}>
        <h1>Dashboard Overview</h1>
        <p>Real-time updates from Rishi Vidyalaya inquiries</p>
      </div>

      <div className={styles.statsGrid}>
        <StatCard 
          label="Total Admissions Inquiries" 
          value={stats.totalLeads} 
          trend={`${stats.weeklyTrend} new this week`} 
          trendUp={stats.weeklyTrend > 0} 
        />
        <StatCard 
          label="Pending Follow-ups" 
          value={stats.recentLeads.filter((l: any) => l.status === 'NEW').length} 
          trend="Requires attention" 
        />
        <StatCard 
          label="Conversion Rate" 
          value={`${stats.conversionRate}%`} 
          trend={`${stats.enrolledLeads} students enrolled`} 
          trendUp={true} 
        />
      </div>

      <div className={styles.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--primary)' }}>Recent Activity</h2>
          <button className={styles.buttonGhost} onClick={() => fetchDashboardData()} disabled={refreshing}>
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>
        
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Student</th>
                <th>Grade</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentLeads.map((lead: any) => (
                <tr key={lead.id}>
                  <td>{new Date(lead.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{lead.studentName}</td>
                  <td>
                    <span style={{ backgroundColor: '#f1f5f9', padding: '0.25rem 0.5rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
                      {lead.grade}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[`status${lead.status.charAt(0).toUpperCase() + lead.status.slice(1).toLowerCase()}`]}`}>
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
              {stats.recentLeads.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                    No recent inquiries found.
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

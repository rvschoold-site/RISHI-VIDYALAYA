'use client';

import React, { useEffect, useState } from 'react';
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
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({ totalLeads: 0, recentLeads: [] });
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
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
          // Adding extra fields for stats
          enrolledLeads: enrolled,
          conversionRate: conversion,
          weeklyTrend: lastWeekLeads
        } as any);
      }
    } catch (error) {
      console.error('Dashboard fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 10000); // 10s polling
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className={styles.loading}>Loading Dashboard...</div>;

  const dashboardStats = stats as any;

  return (
    <div className="animate-fade-in">
      <div className={styles.header}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Dashboard Overview</h1>
        <p style={{ color: '#64748b' }}>Real-time updates from Rishi Vidyalaya inquiries</p>
      </div>

      <div className={styles.statsGrid}>
        <StatCard 
          label="Total Admissions Inquiries" 
          value={dashboardStats.totalLeads} 
          trend={`${dashboardStats.weeklyTrend} new this week`} 
          trendUp={dashboardStats.weeklyTrend > 0} 
        />
        <StatCard 
          label="Pending Follow-ups" 
          value={dashboardStats.recentLeads.filter((l: any) => l.status === 'NEW').length} 
          trend="Requires attention" 
        />
        <StatCard 
          label="Conversion Rate" 
          value={`${dashboardStats.conversionRate}%`} 
          trend={`${dashboardStats.enrolledLeads} students enrolled`} 
          trendUp={true} 
        />
      </div>

      <div className={styles.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Recent Activity</h2>
          <button className={styles.buttonGhost} onClick={fetchDashboardData}>Refresh</button>
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
                  <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                  <td style={{ fontWeight: 600 }}>{lead.studentName}</td>
                  <td>{lead.grade}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[`status${lead.status.charAt(0).toUpperCase() + lead.status.slice(1).toLowerCase()}`]}`}>
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
              {stats.recentLeads.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
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

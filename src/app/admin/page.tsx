'use client';

import React, { useEffect, useState } from 'react';
import {
  Loader2, RefreshCw, Users, GraduationCap, Briefcase, Image as ImageIcon,
  Star, TrendingUp, Clock, CheckCircle2, AlertCircle, ArrowRight
} from 'lucide-react';
import styles from './admin.module.css';
import Link from 'next/link';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  color?: string;
}

const StatCard = ({ label, value, icon, trend, trendUp, color = '#0f172a' }: StatCardProps) => (
  <div className={styles.statCard}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <div className={styles.statLabel}>{label}</div>
        <div className={styles.statValue} style={{ color }}>{value}</div>
      </div>
      <div style={{
        width: '44px', height: '44px', borderRadius: '12px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: `${color}10`, color
      }}>
        {icon}
      </div>
    </div>
    {trend && (
      <div className={`${styles.statTrend} ${trendUp ? styles.trendUp : styles.trendDown}`}>
        {trendUp ? <TrendingUp size={12} /> : <Clock size={12} />} {trend}
      </div>
    )}
  </div>
);

interface DashboardData {
  // Admissions
  totalLeads: number;
  newLeads: number;
  enrolledLeads: number;
  contactedLeads: number;
  conversionRate: number;
  weeklyLeads: number;
  recentLeads: any[];
  // Careers
  totalApplications: number;
  pendingApplications: number;
  recentApplications: any[];
  // Gallery
  totalImages: number;
  featuredImages: number;
  s3Images: number;
  // Admin
  totalAdmins: number;
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData>({
    totalLeads: 0, newLeads: 0, enrolledLeads: 0, contactedLeads: 0,
    conversionRate: 0, weeklyLeads: 0, recentLeads: [],
    totalApplications: 0, pendingApplications: 0, recentApplications: [],
    totalImages: 0, featuredImages: 0, s3Images: 0,
    totalAdmins: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = async (isPoll = false) => {
    if (!isPoll) setRefreshing(true);
    const token = localStorage.getItem('adminToken');
    const headers: HeadersInit = { 'Authorization': `Bearer ${token}` };

    try {
      const [admissionsRes, careersRes, galleryRes, adminsRes] = await Promise.allSettled([
        fetch('/api/admissions', { headers }),
        fetch('/api/careers', { headers }),
        fetch('/api/gallery'),
        fetch('/api/admin/users', { headers }),
      ]);

      // Admissions
      let admissions: any[] = [];
      if (admissionsRes.status === 'fulfilled' && admissionsRes.value.ok) {
        const d = await admissionsRes.value.json();
        admissions = Array.isArray(d) ? d : [];
      }
      const totalLeads = admissions.length;
      const newLeads = admissions.filter((l: any) => l.status === 'NEW').length;
      const enrolledLeads = admissions.filter((l: any) => l.status === 'ENROLLED').length;
      const contactedLeads = admissions.filter((l: any) => l.status === 'CONTACTED').length;
      const oneWeekAgo = new Date(); oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const weeklyLeads = admissions.filter((l: any) => new Date(l.createdAt) > oneWeekAgo).length;
      const conversionRate = totalLeads > 0 ? Math.round((enrolledLeads / totalLeads) * 100) : 0;

      // Careers
      let careers: any[] = [];
      if (careersRes.status === 'fulfilled' && careersRes.value.ok) {
        const d = await careersRes.value.json();
        careers = Array.isArray(d) ? d : [];
      }
      const pendingApplications = careers.filter((c: any) => c.status === 'PENDING' || c.status === 'pending').length;

      // Gallery
      let gallery: any[] = [];
      if (galleryRes.status === 'fulfilled' && galleryRes.value.ok) {
        const d = await galleryRes.value.json();
        gallery = Array.isArray(d) ? d : [];
      }
      const featuredImages = gallery.filter((g: any) => g.isFeatured).length;
      const s3Images = gallery.filter((g: any) => g.type === 's3').length;

      // Admins
      let admins: any[] = [];
      if (adminsRes.status === 'fulfilled' && adminsRes.value.ok) {
        const d = await adminsRes.value.json();
        admins = Array.isArray(d) ? d : (d.data ? d.data : []);
      }

      setData({
        totalLeads, newLeads, enrolledLeads, contactedLeads,
        conversionRate, weeklyLeads,
        recentLeads: admissions.slice(0, 5),
        totalApplications: careers.length,
        pendingApplications,
        recentApplications: careers.slice(0, 3),
        totalImages: gallery.length,
        featuredImages,
        s3Images,
        totalAdmins: admins.length,
      });
    } catch (error) {
      console.error('Dashboard fetch error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(() => fetchDashboardData(true), 30000);
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div className={styles.header} style={{ margin: 0 }}>
          <h1>Dashboard Overview</h1>
          <p>Real-time overview of Rishi Vidyalaya administration</p>
        </div>
        <button className={styles.buttonGhost} onClick={() => fetchDashboardData()} disabled={refreshing}>
          <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Primary Stats */}
      <div className={styles.statsGrid}>
        <StatCard
          label="Total Admissions"
          value={data.totalLeads}
          icon={<GraduationCap size={22} />}
          trend={`${data.weeklyLeads} new this week`}
          trendUp={data.weeklyLeads > 0}
          color="#2563eb"
        />
        <StatCard
          label="New / Pending"
          value={data.newLeads}
          icon={<AlertCircle size={22} />}
          trend="Requires follow-up"
          trendUp={false}
          color="#f59e0b"
        />
        <StatCard
          label="Enrolled"
          value={data.enrolledLeads}
          icon={<CheckCircle2 size={22} />}
          trend={`${data.conversionRate}% conversion rate`}
          trendUp={true}
          color="#10b981"
        />
        <StatCard
          label="Job Applications"
          value={data.totalApplications}
          icon={<Briefcase size={22} />}
          trend={`${data.pendingApplications} pending review`}
          trendUp={data.pendingApplications > 0}
          color="#8b5cf6"
        />
        <StatCard
          label="Gallery Images"
          value={data.totalImages}
          icon={<ImageIcon size={22} />}
          trend={`${data.featuredImages} featured · ${data.s3Images} on S3`}
          trendUp={true}
          color="#ec4899"
        />
        <StatCard
          label="Admin Users"
          value={data.totalAdmins}
          icon={<Users size={22} />}
          color="#0f172a"
        />
      </div>

      {/* Two Column Layout */}
      <div className={styles.dashboardGrid}>

        {/* Recent Admissions */}
        <div className={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'var(--primary)' }}>Recent Admissions</h2>
            <Link href="/admin/admissions" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              View All <ArrowRight size={12} />
            </Link>
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
                {data.recentLeads.map((lead: any) => (
                  <tr key={lead._id || lead.id}>
                    <td>{new Date(lead.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</td>
                    <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{lead.studentName}</td>
                    <td>
                      <span style={{ backgroundColor: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}>
                        {lead.grade}
                      </span>
                    </td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[`status${lead.status?.charAt(0).toUpperCase()}${lead.status?.slice(1).toLowerCase()}`] || ''}`}>
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {data.recentLeads.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: '2.5rem', color: '#94a3b8' }}>
                      No admission inquiries yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right sidebar cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Quick Actions */}
          <div className={styles.card}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1rem', color: 'var(--primary)' }}>Quick Actions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { href: '/admin/admissions', label: 'Manage Admissions', icon: <GraduationCap size={16} />, count: data.newLeads, badge: 'New' },
                { href: '/admin/careers', label: 'Review Applications', icon: <Briefcase size={16} />, count: data.pendingApplications, badge: 'Pending' },
                { href: '/admin/gallery', label: 'Gallery Management', icon: <ImageIcon size={16} />, count: data.totalImages },
                { href: '/admin/users', label: 'Admin Users', icon: <Users size={16} />, count: data.totalAdmins },
              ].map(action => (
                <Link
                  key={action.href}
                  href={action.href}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.75rem', borderRadius: '8px', textDecoration: 'none',
                    color: '#334155', fontSize: '0.875rem', fontWeight: 600,
                    border: '1px solid #e2e8f0', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.backgroundColor = '#f8fafc'; (e.target as HTMLElement).style.borderColor = '#cbd5e1'; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.backgroundColor = ''; (e.target as HTMLElement).style.borderColor = '#e2e8f0'; }}
                >
                  {action.icon}
                  <span style={{ flex: 1 }}>{action.label}</span>
                  {action.count !== undefined && (
                    <span style={{
                      backgroundColor: action.badge === 'New' ? '#fef2f2' : action.badge === 'Pending' ? '#fef3c7' : '#f1f5f9',
                      color: action.badge === 'New' ? '#dc2626' : action.badge === 'Pending' ? '#92400e' : '#475569',
                      padding: '0.15rem 0.5rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 700,
                    }}>
                      {action.count}
                    </span>
                  )}
                  <ArrowRight size={14} style={{ color: '#94a3b8' }} />
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Job Applications */}
          <div className={styles.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'var(--primary)' }}>Job Applications</h2>
              <Link href="/admin/careers" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                View <ArrowRight size={12} />
              </Link>
            </div>
            {data.recentApplications.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {data.recentApplications.map((app: any) => (
                  <div key={app._id || app.id} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '0.65rem 0', borderBottom: '1px solid #f1f5f9', fontSize: '0.85rem',
                  }}>
                    <div>
                      <div style={{ fontWeight: 600, color: '#1e293b' }}>{app.name || app.applicantName}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.15rem' }}>{app.position || app.jobTitle}</div>
                    </div>
                    <span className={`${styles.statusBadge} ${styles[`status${app.status?.charAt(0).toUpperCase()}${app.status?.slice(1).toLowerCase()}`] || ''}`} style={{ fontSize: '0.65rem' }}>
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', textAlign: 'center', padding: '1.5rem 0' }}>
                No job applications yet.
              </p>
            )}
          </div>

          {/* Gallery Summary */}
          <div className={styles.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'var(--primary)' }}>Gallery</h2>
              <Link href="/admin/gallery" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                Manage <ArrowRight size={12} />
              </Link>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1, textAlign: 'center', padding: '1rem 0.5rem', backgroundColor: '#fef3c7', borderRadius: '10px' }}>
                <Star size={18} style={{ color: '#f59e0b', marginBottom: '0.35rem' }} />
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#92400e' }}>{data.featuredImages}</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#a16207', marginTop: '0.15rem' }}>Featured</div>
              </div>
              <div style={{ flex: 1, textAlign: 'center', padding: '1rem 0.5rem', backgroundColor: '#f0fdf4', borderRadius: '10px' }}>
                <ImageIcon size={18} style={{ color: '#10b981', marginBottom: '0.35rem' }} />
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#166534' }}>{data.s3Images}</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#15803d', marginTop: '0.15rem' }}>S3 Cloud</div>
              </div>
              <div style={{ flex: 1, textAlign: 'center', padding: '1rem 0.5rem', backgroundColor: '#f1f5f9', borderRadius: '10px' }}>
                <ImageIcon size={18} style={{ color: '#64748b', marginBottom: '0.35rem' }} />
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#334155' }}>{data.totalImages}</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', marginTop: '0.15rem' }}>Total</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

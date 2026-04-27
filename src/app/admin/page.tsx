import React from 'react';
import prisma from '@/lib/prisma';
import styles from './admin.module.css';

export const dynamic = 'force-dynamic';

interface AdmissionLead {
  id: string;
  parentName: string;
  studentName: string;
  email: string;
  phone: string;
  grade: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export default async function AdminDashboard() {
  const leadsCount = await prisma.admissionLead.count();

  const recentLeads: AdmissionLead[] = await prisma.admissionLead.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Inquiries</div>
          <div className={styles.statValue}>{leadsCount}</div>
        </div>
      </div>

      <div className={styles.card}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Recent Admission Inquiries</h2>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Student</th>
                <th>Parent</th>
                <th>Grade</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                  <td>{lead.studentName}</td>
                  <td>{lead.parentName}</td>
                  <td>{lead.grade}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[`status${lead.status.charAt(0).toUpperCase() + lead.status.slice(1).toLowerCase()}`]}`}>
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
              {recentLeads.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
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

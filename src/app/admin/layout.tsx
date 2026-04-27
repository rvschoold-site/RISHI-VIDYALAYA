'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './admin.module.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Define public routes that don't need authentication
  const publicRoutes = [
    '/admin/login',
    '/admin/forgot-password',
    '/admin/reset-password',
  ];

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');

    if (!token && !isPublicRoute) {
      router.push('/admin/login');
    } else if (userData) {
      setAdmin(JSON.parse(userData));
    }
    setLoading(false);
  }, [pathname, router, isPublicRoute]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  const navLinks = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'Admissions Inbox', href: '/admin/admissions', icon: '📬' },
    { name: 'Site Settings', href: '/admin/settings', icon: '⚙️' },
  ];

  // If loading or it's a public route, just render the content
  if (loading || isPublicRoute) {
    return <>{children}</>;
  }

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBrand}>RISHI ADMIN</div>
        <nav className={styles.sidebarNav}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${pathname === link.href ? styles.navLinkActive : ''}`}
            >
              <span style={{ fontSize: '1.2rem' }}>{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link href="/" className={styles.navLink}>
            <span>🏠</span> <span>Back to Site</span>
          </Link>
          <button onClick={handleLogout} className={styles.navLink} style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
            <span>🚪</span> <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.topbar}>
          <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>
            {navLinks.find(l => l.href === pathname)?.name || 'Admin Panel'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{admin?.name || 'Admin'}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{admin?.role?.replace('_', ' ') || 'User'}</div>
            </div>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '12px', 
              backgroundColor: 'var(--primary)', 
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '1.1rem'
            }}>
              {admin?.name?.charAt(0) || 'A'}
            </div>
          </div>
        </header>

        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
}

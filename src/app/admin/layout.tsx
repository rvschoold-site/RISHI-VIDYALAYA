'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './admin.module.css';
import { 
  LayoutDashboard, 
  Inbox, 
  Briefcase, 
  FileText, 
  Image as ImageIcon, 
  Settings, 
  Users, 
  LogOut, 
  Home, 
  Info, 
  GraduationCap,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  History,
  Menu,
  X,
  Newspaper
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // Define public routes that don't need authentication
  const publicRoutes = [
    '/admin/login',
    '/admin/forgot-password',
    '/admin/reset-password',
    '/admin/setup',
    '/admin/register',
  ];

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (data.success) {
          setAdmin(data.data);
          localStorage.setItem('adminUser', JSON.stringify(data.data));
        } else if (!isPublicRoute) {
          handleLogout();
        }
      } catch (err) {
        if (!isPublicRoute) handleLogout();
      }
      setLoading(false);
    };

    if (!isPublicRoute) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, [pathname, router, isPublicRoute]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  const [openDropdown, setOpenDropdown] = useState<string | null>('pages');

  const navLinks = [
    { name: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={18} /> },
    { name: 'Blog Posts', href: '/admin/blogs', icon: <Newspaper size={18} /> },
    { name: 'Admissions Inbox', href: '/admin/admissions', icon: <Inbox size={18} /> },
    { name: 'Job Applications', href: '/admin/careers', icon: <Briefcase size={18} /> },
    { name: 'Gallery', href: '/admin/gallery', icon: <ImageIcon size={18} /> },
    { name: 'Site Settings', href: '/admin/settings', icon: <Settings size={18} /> },
  ];

  // Add Admin Users link only for SUPER_ADMIN
  if (admin?.role === 'SUPER_ADMIN') {
    navLinks.push({ name: 'Admin Users', href: '/admin/users', icon: <Users size={18} /> });
    navLinks.push({ name: 'Activity Logs', href: '/admin/logs', icon: <History size={18} /> });
  }

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  // If loading or it's a public route, just render the content
  if (loading || isPublicRoute) {
    return <>{children}</>;
  }

  return (
    <div className={styles.layout}>
      {isSidebarOpen && (
        <div className={styles.backdrop} onClick={() => setIsSidebarOpen(false)} />
      )}

      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarBrand}>RISHI ADMIN</div>
          <button className={styles.closeButton} onClick={() => setIsSidebarOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
        <nav className={styles.sidebarNav}>
          {navLinks.map((link: any) => (
            <React.Fragment key={link.name}>
              {link.subItems ? (
                <div className={styles.navGroup}>
                  <button
                    onClick={() => toggleDropdown(link.name.toLowerCase())}
                    className={`${styles.navLink} ${pathname.startsWith(link.href) ? styles.navLinkActive : ''}`}
                    style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer', justifyContent: 'space-between' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center' }}>{link.icon}</span>
                      <span>{link.name}</span>
                    </div>
                    <span style={{ display: 'flex', alignItems: 'center', transition: 'transform 0.3s', transform: openDropdown === link.name.toLowerCase() ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      <ChevronDown size={14} />
                    </span>
                  </button>
                  
                  {openDropdown === link.name.toLowerCase() && (
                    <div className={styles.subNav}>
                      {link.subItems.map((sub: any) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={`${styles.subNavLink} ${pathname === sub.href ? styles.subNavLinkActive : ''}`}
                        >
                          <span>{sub.icon}</span>
                          <span>{sub.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={link.href}
                  className={`${styles.navLink} ${pathname === link.href ? styles.navLinkActive : ''}`}
                >
                  <span style={{ display: 'flex', alignItems: 'center' }}>{link.icon}</span>
                  <span>{link.name}</span>
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.25rem', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
          <Link href="/" className={styles.navLink} style={{ fontSize: '0.85rem' }}>
            <ExternalLink size={16} /> <span>Back to Site</span>
          </Link>
          <button onClick={handleLogout} className={styles.navLink} style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', fontSize: '0.85rem', color: '#ef4444' }}>
            <LogOut size={16} /> <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <button className={styles.menuButton} onClick={() => setIsSidebarOpen(true)} aria-label="Open menu">
              <Menu size={20} />
            </button>
            
            {/* Breadcrumb Navigation */}
            <nav className={styles.breadcrumbNav} aria-label="Breadcrumb">
              <ol className={styles.breadcrumbList}>
                <li className={styles.breadcrumbItem}>
                  <Link href="/admin" className={styles.breadcrumbLink}>
                    <Home size={14} />
                    <span>Admin</span>
                  </Link>
                </li>
                {pathname !== '/admin' && (
                  <>
                    {pathname.split('/').filter(Boolean).slice(1).map((segment, index, array) => {
                      const href = `/admin/${array.slice(0, index + 1).join('/')}`;
                      const isLast = index === array.length - 1;
                      
                      // Formatting title
                      let segmentTitle = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
                      if (segment === 'blogs') segmentTitle = 'Blog Posts';
                      if (segment === 'admissions') segmentTitle = 'Admissions Inbox';
                      if (segment === 'careers') segmentTitle = 'Job Applications';
                      if (segment === 'settings') segmentTitle = 'Site Settings';
                      if (segment === 'users') segmentTitle = 'Admin Users';
                      if (segment === 'logs') segmentTitle = 'Activity Logs';
                      if (segment === 'new') segmentTitle = 'Create New';
                      if (segment === 'edit') segmentTitle = 'Edit';

                      return (
                        <li key={href} className={styles.breadcrumbItem}>
                          <ChevronRight size={14} className={styles.breadcrumbSeparator} />
                          {isLast ? (
                            <span className={styles.breadcrumbCurrent}>{segmentTitle}</span>
                          ) : (
                            <Link href={href} className={styles.breadcrumbLink}>
                              {segmentTitle}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </>
                )}
              </ol>
            </nav>
          </div>

          <div className={styles.topbarRight}>
            <Link href="/" target="_blank" className={styles.topbarActionBtn} title="View Live Website">
              <ExternalLink size={16} />
              <span className={styles.actionBtnLabel}>View Site</span>
            </Link>

            <div className={styles.userProfile}>
              <div className={styles.userInfo}>
                <div className={styles.userName}>{admin?.name || 'Admin'}</div>
                <div className={styles.userRole}>{admin?.role?.replace('_', ' ') || 'Super Admin'}</div>
              </div>
              <div className={styles.avatar}>
                {admin?.name?.charAt(0) || 'A'}
              </div>
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

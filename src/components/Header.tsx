'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navLinks, setNavLinks] = useState<any[]>([
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Academics', path: '/academics' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Careers', path: '/careers' },
    { label: 'Contact', path: '/contact' }
  ]);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.NAV_LINKS) {
          try {
            const dynamicLinks = JSON.parse(data.data.NAV_LINKS);
            if (Array.isArray(dynamicLinks) && dynamicLinks.length > 0) {
              setNavLinks(dynamicLinks);
            }
          } catch (e) {
            console.error('Failed to parse dynamic nav links');
          }
        }
      });
  }, []);

  // Close menu when pathname changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const getLinkClass = (path: string) => {
    return pathname === path ? `${styles.link} ${styles.active}` : styles.link;
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.logoContainer}>
          <Image src="/logo.png" alt="Rishi Vidyalaya Logo" width={600} height={90} className={styles.logoImage} priority />
        </Link>

        {/* Mobile Toggle */}
        <button 
          className={styles.mobileToggle} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation */}
        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path} className={getLinkClass(link.path)}>
              {link.label}
            </Link>
          ))}
          <Link href="/admission" className={styles.applyBtn}>Apply Now</Link>
        </nav>

        {/* Overlay for mobile menu */}
        {isMenuOpen && <div className={styles.overlay} onClick={() => setIsMenuOpen(false)} />}
      </div>
    </header>
  );
}

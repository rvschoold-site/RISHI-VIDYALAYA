'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import Header from "./Header";
import LazyLoad from "./LazyLoad";

// Dynamic imports for heavy components
const SocialFeed = dynamic(() => import("./SocialFeed"), { ssr: false });
const Footer = dynamic(() => import("./Footer"), { ssr: false });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Routes where we don't want the global Header and Footer
  const hideHeaderFooter = pathname.startsWith('/admin') || pathname.startsWith('/setup');

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main>{children}</main>
      {!hideHeaderFooter && (
        <LazyLoad rootMargin="100px 0px">
          <SocialFeed />
        </LazyLoad>
      )}
      {!hideHeaderFooter && (
        <LazyLoad rootMargin="200px 0px">
          <Footer />
        </LazyLoad>
      )}
    </>
  );
}

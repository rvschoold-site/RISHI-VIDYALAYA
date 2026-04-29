'use client';

import { usePathname } from 'next/navigation';
import Header from "./Header";
import Footer from "./Footer";
import SocialFeed from "./SocialFeed";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Routes where we don't want the global Header and Footer
  const hideHeaderFooter = pathname.startsWith('/admin') || pathname.startsWith('/setup');

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main>{children}</main>
      {!hideHeaderFooter && <SocialFeed />}
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

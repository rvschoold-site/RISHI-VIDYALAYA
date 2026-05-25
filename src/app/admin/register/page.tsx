'use client';

import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

function RegisterRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      router.push(`/admin/setup/${token}`);
    } else {
      router.push('/admin/login');
    }
  }, [token, router]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      gap: '1rem',
      color: '#64748b',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <Loader2 className="animate-spin" size={32} style={{ color: 'var(--accent, #DC2626)' }} />
      <div style={{ fontWeight: 600, fontSize: '1rem' }}>Verifying registration token...</div>
    </div>
  );
}

export default function AdminRegisterRedirect() {
  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <Suspense fallback={
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: '1rem',
          color: '#64748b',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <Loader2 className="animate-spin" size={32} style={{ color: 'var(--accent, #DC2626)' }} />
          <div style={{ fontWeight: 600, fontSize: '1rem' }}>Loading verification...</div>
        </div>
      }>
        <RegisterRedirectContent />
      </Suspense>
    </div>
  );
}

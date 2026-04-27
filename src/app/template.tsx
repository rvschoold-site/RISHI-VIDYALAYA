import React from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out forwards' }}>
      {children}
    </div>
  );
}

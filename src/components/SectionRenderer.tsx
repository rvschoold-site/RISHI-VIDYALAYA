import React from 'react';
import Reveal from './Reveal';

interface SectionProps {
  section: {
    type: string;
    content: any;
  };
}

export default function SectionRenderer({ section }: SectionProps) {
  const { type, content } = section;

  switch (type) {
    case 'hero':
      return (
        <section style={{ padding: '8rem 0', textAlign: 'center', backgroundColor: '#f8fafc' }}>
          <div className="container">
            <Reveal>
              <span className="badge-premium" style={{ marginBottom: '1rem' }}>{content.badge}</span>
              <h1 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '1rem' }}>{content.title}</h1>
              <h2 style={{ fontSize: '1.5rem', color: '#64748b', marginBottom: '2rem' }}>{content.subtitle}</h2>
              <p style={{ maxWidth: '800px', margin: '0 auto 2.5rem', fontSize: '1.2rem' }}>{content.description}</p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button className="btn btn-primary">{content.ctaPrimary}</button>
                <button className="btn btn-outline">{content.ctaSecondary}</button>
              </div>
            </Reveal>
          </div>
        </section>
      );

    case 'features':
      return (
        <section className="section">
          <div className="container">
            <Reveal>
              <div className="section-header">
                <span className="text-accent">{content.tag}</span>
                <h2>{content.title}</h2>
                <p>{content.subtitle}</p>
              </div>
            </Reveal>
            <div className="grid3" style={{ marginTop: '3rem' }}>
              {content.items?.map((item: any, idx: number) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="card-premium">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      );

    // Add more section types as needed
    
    default:
      return (
        <div style={{ padding: '2rem', border: '1px dashed #ccc', textAlign: 'center' }}>
          Unknown section type: {type}
        </div>
      );
  }
}

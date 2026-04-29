import React from 'react';
import Reveal from './Reveal';
import Image from 'next/image';
import Link from 'next/link';

interface SectionProps {
  section: {
    type: string;
    content: any;
  };
}

export default function SectionRenderer({ section }: SectionProps) {
  const { type, content } = section;

  const getCtaLink = (text: string) => {
    if (!text) return '/';
    const t = text.toLowerCase();
    if (t.includes('admission') || t.includes('enquire') || t.includes('apply')) return '/admissions';
    if (t.includes('contact')) return '/contact';
    if (t.includes('about')) return '/about';
    if (t.includes('career')) return '/careers';
    return '/';
  };

  switch (type) {
    case 'hero':
      return (
        <section style={{ padding: '8rem 0', textAlign: 'center', backgroundColor: '#f8fafc', position: 'relative', overflow: 'hidden' }}>
          <div className="container">
            <Reveal>
              <span className="badge-premium" style={{ marginBottom: '1rem' }}>{content.badge}</span>
              <h1 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '1rem' }}>{content.title}</h1>
              <h2 style={{ fontSize: '1.5rem', color: '#64748b', marginBottom: '2rem' }}>{content.subtitle}</h2>
              <p style={{ maxWidth: '800px', margin: '0 auto 2.5rem', fontSize: '1.2rem' }}>{content.description}</p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                {content.ctaPrimary && (
                  <Link href={getCtaLink(content.ctaPrimary)} className="btn btn-primary">
                    {content.ctaPrimary}
                  </Link>
                )}
                {content.ctaSecondary && (
                  <Link href={getCtaLink(content.ctaSecondary)} className="btn btn-outline">
                    {content.ctaSecondary}
                  </Link>
                )}
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
                {content.tag && <span className="text-accent">{content.tag}</span>}
                <h2>{content.title}</h2>
                <p>{content.subtitle}</p>
              </div>
            </Reveal>
            <div className="grid3" style={{ marginTop: '3rem' }}>
              {content.items?.map((item: any, idx: number) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="card-premium">
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      );

    case 'text':
      return (
        <section className="section">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: content.image ? '1fr 1fr' : '1fr', gap: '4rem', alignItems: 'center' }}>
              <Reveal>
                <div>
                  <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>{content.title}</h2>
                  <div style={{ fontSize: '1.1rem', color: '#64748b', lineHeight: '1.8' }} dangerouslySetInnerHTML={{ __html: content.body }} />
                </div>
              </Reveal>
              {content.image && (
                <Reveal delay={0.2}>
                  <div style={{ position: 'relative', height: '400px', borderRadius: '24px', overflow: 'hidden' }}>
                    <Image src={content.image} alt={content.title} fill style={{ objectFit: 'cover' }} />
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </section>
      );

    case 'gallery':
      return (
        <section className="section" style={{ backgroundColor: '#f8fafc' }}>
          <div className="container">
            <Reveal>
              <div className="section-header">
                <h2>{content.title}</h2>
                <p>{content.subtitle}</p>
              </div>
            </Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem', marginTop: '3rem' }}>
              {content.images?.map((img: any, idx: number) => (
                <Reveal key={idx} delay={idx * 0.05}>
                  <div style={{ position: 'relative', height: '250px', borderRadius: '16px', overflow: 'hidden' }}>
                    <Image src={img.url} alt={img.caption || ''} fill style={{ objectFit: 'cover' }} />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      );

    case 'cta':
      return (
        <section className="section" style={{ padding: '4rem 0' }}>
          <div className="container">
            <div style={{ 
              background: 'linear-gradient(135deg, var(--primary) 0%, #1e293b 100%)', 
              padding: '4rem', 
              borderRadius: '32px', 
              textAlign: 'center',
              color: 'white'
            }}>
              <Reveal>
                <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '1rem' }}>{content.title}</h2>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                  {content.description}
                </p>
                <Link href={getCtaLink(content.buttonText)} className="btn btn-primary" style={{ padding: '1rem 3rem' }}>
                  {content.buttonText}
                </Link>
              </Reveal>
            </div>
          </div>
        </section>
      );

    default:
      return (
        <div style={{ padding: '2rem', border: '1px dashed #ccc', textAlign: 'center' }}>
          Unknown section type: {type}
        </div>
      );
  }
}

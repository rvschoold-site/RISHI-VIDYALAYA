import React from 'react';
import styles from './academics.module.css';
import Reveal from '@/components/Reveal';
import Image from 'next/image';

export default function Academics() {
  return (
    <div className={styles.container}>
      <div className="page-hero">
        <h1>Academic Excellence</h1>
        <p>Best School in Dharmavaram for Strong Foundation & Concept-Based Learning</p>
      </div>

      <section className="section">
        <Reveal>
          <div className="section-header">
            <h2>Back to Basics Approach</h2>
            <p>First time introduced in the region, focusing on strong basics and individual student skill development.</p>
          </div>
        </Reveal>
        
        <div className="grid3">
          <Reveal delay={0.1}>
            <div className="card-premium" style={{ height: '100%' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem' }}>
                <svg className="icon-float" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                <h3>Concept Clarity</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                <li><span style={{ color: 'var(--accent)' }}>✔</span> First time introduced in the region</li>
                <li><span style={{ color: 'var(--accent)' }}>✔</span> Strong basics for IIT, Doctor, IAS aspirations</li>
                <li><span style={{ color: 'var(--accent)' }}>✔</span> Clear concept understanding</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="card-premium" style={{ height: '100%' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem' }}>
                <svg className="icon-float" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l3 3"></path></svg>
                <h3>Step-by-Step Learning</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                <li><span style={{ color: 'var(--accent)' }}>✔</span> Structured concept learning system</li>
                <li><span style={{ color: 'var(--accent)' }}>✔</span> Step-by-step strong learning approach</li>
                <li><span style={{ color: 'var(--accent)' }}>✔</span> Concept-based teaching methodology</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="card-premium" style={{ height: '100%' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem' }}>
                <svg className="icon-float" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                <h3>Individual Focus</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                <li><span style={{ color: 'var(--accent)' }}>✔</span> Focus on individual student skills development</li>
                <li><span style={{ color: 'var(--accent)' }}>✔</span> Personal attention to learning gaps</li>
                <li><span style={{ color: 'var(--accent)' }}>✔</span> Supportive environment for academic confidence</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={`section ${styles.foundationSection}`}>
        <div className="container">
          <Reveal>
            <div className="section-header">
              <h2 style={{ color: 'white' }}>IIT–NEET Foundation</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)' }}>One of the top schools for IIT foundation in Dharmavaram.</p>
            </div>
          </Reveal>
          <div className={styles.foundationGrid}>
            <Reveal delay={0.1}>
              <div className={styles.foundationCard}>
                <h3>IIT & NEET Prep</h3>
                <p>Comprehensive IIT & NEET competitive exam preparation to build solid competitive advantages early.</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className={styles.foundationCard}>
                <h3>Structured Roadmap</h3>
                <p>Proper planning and structured roadmap with milestones tailored for high aspirations.</p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className={styles.foundationCard}>
                <h3>Analytical Mindset</h3>
                <p>Focusing on analytical thinking and problem-solving skill development through hands-on practice.</p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.4}>
            <div className={styles.foundationImage}>
              <Image 
                src="/PASSION.JPG.jpeg" 
                alt="IIT-NEET Foundation Classes" 
                fill 
                quality={75}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
                sizes="(max-width: 1200px) 100vw, 1200px" 
                style={{ objectFit: 'cover' }} 
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <h2>Innovation & Future Labs</h2>
              <p>Unique features that set us apart as the best school for future learning in the region.</p>
            </div>
          </Reveal>
          <div className="grid2">
            <div className="card-premium">
              <h3 style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>🤖 AI & Robotics Lab</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)' }}>
                <li><span style={{ color: 'var(--accent)' }}>✔</span> Real-time projects & practical learning</li>
                <li><span style={{ color: 'var(--accent)' }}>✔</span> Coding, automation & innovation skill development</li>
                <li><span style={{ color: 'var(--accent)' }}>✔</span> First time in the region AI lab</li>
              </ul>
            </div>
            <div className="card-premium">
              <h3 style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>🚀 Space Lab</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)' }}>
                <li><span style={{ color: 'var(--accent)' }}>✔</span> Space science & astronomy concepts</li>
                <li><span style={{ color: 'var(--accent)' }}>✔</span> Models & experiments for easy understanding</li>
                <li><span style={{ color: 'var(--accent)' }}>✔</span> First time in the region Space Lab</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="container">
          <Reveal>
            <div className="section-header">
              <h2>Strong Academics (CBSE Alignment)</h2>
              <p>Among the top English medium schools in Dharmavaram focusing on holistic CBSE standards.</p>
            </div>
          </Reveal>
          <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', padding: 0 }}>
            <li className="list-item-premium">✔ Concept-based teaching & interactive discussions</li>
            <li className="list-item-premium">✔ Regular tests & detailed progress monitoring</li>
            <li className="list-item-premium">✔ Clear & consistent communication with parents</li>
            <li className="list-item-premium">✔ Strong focus on best academic results and mindset development</li>
          </ul>
        </div>
      </section>

    </div>
  );
}

import React from 'react';
import styles from './academics.module.css';
import Reveal from '@/components/Reveal';
import Image from 'next/image';
import { 
  BookOpen, 
  TrendingUp, 
  Users, 
  Cpu, 
  Compass, 
  Check, 
  Award,
  BookMarked
} from 'lucide-react';

export default function Academics() {
  return (
    <div className={styles.container}>
      {/* Page Hero */}
      <div className="page-hero">
        <Reveal>
          <h1>Academic Excellence</h1>
          <p>Best School in Dharmavaram for Strong Foundation & Concept-Based Learning</p>
        </Reveal>
      </div>

      {/* Back to Basics */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <span className="badge-premium" style={{ marginBottom: '1rem' }}>Our Pedagogy</span>
              <h2>Back to Basics Approach</h2>
              <p>First time introduced in the region, focusing on deep conceptual basics and individual student skill development.</p>
            </div>
          </Reveal>
          
          <div className="grid3" style={{ marginTop: '3rem' }}>
            <Reveal delay={0.1}>
              <div className="card-premium" style={{ height: '100%' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div className="icon-circle" style={{ width: '48px', height: '48px', backgroundColor: '#fef2f2', color: 'var(--accent)' }}>
                    <BookOpen size={20} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Concept Clarity</h3>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  Rather than rote memorization, we ensure students grasp the foundational "why" and "how" behind scientific and literary principles.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text)' }}>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--accent)' }}>✔</span> First time introduced in the region</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--accent)' }}>✔</span> Concept understanding over memorization</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--accent)' }}>✔</span> Base building for professional careers</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="card-premium" style={{ height: '100%' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div className="icon-circle" style={{ width: '48px', height: '48px', backgroundColor: '#fef2f2', color: 'var(--accent)' }}>
                    <TrendingUp size={20} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Step-by-Step Study</h3>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  We implement a highly structured learning framework that guides students gradually from basic terms to advanced problem-solving.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text)' }}>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--accent)' }}>✔</span> Structured syllabus roadmap</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--accent)' }}>✔</span> Regular performance diagnostics</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--accent)' }}>✔</span> Graded learning assessments</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="card-premium" style={{ height: '100%' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div className="icon-circle" style={{ width: '48px', height: '48px', backgroundColor: '#fef2f2', color: 'var(--accent)' }}>
                    <Users size={20} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Individual Focus</h3>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  With optimized teacher-student ratios, we monitor specific learning progress and offer remedial modules where required.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text)' }}>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--accent)' }}>✔</span> Personal attention to learning gaps</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--accent)' }}>✔</span> Optimized student-teacher ratio</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--accent)' }}>✔</span> Dedicated mentorship & guidance</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* IIT–NEET Foundation */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className={styles.foundationSection}>
            <Reveal>
              <div className="section-header" style={{ marginBottom: '3rem' }}>
                <span className="badge-premium-hero" style={{ marginBottom: '1rem' }}>IIT & NEET Focus</span>
                <h2 style={{ color: 'white' }}>IIT–NEET Integrated Foundation</h2>
                <p style={{ color: 'rgba(255,255,255,0.85)' }}>One of the top schools for IIT & medical foundation in Dharmavaram.</p>
              </div>
            </Reveal>
            
            <div className={styles.foundationGrid}>
              <Reveal delay={0.1}>
                <div className={styles.foundationCard}>
                  <h3>IIT & NEET Prep</h3>
                  <p>Rigorous, curriculum-aligned study materials and test frameworks designed to provide students with a strong competitive edge.</p>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className={styles.foundationCard}>
                  <h3>Roadmap Planning</h3>
                  <p>Comprehensive planning with weekly milestone markers that sync seamlessly with CBSE and ICSE boards.</p>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className={styles.foundationCard}>
                  <h3>Analytical Mindset</h3>
                  <p>Fostering analytical logic, quantitative math, reasoning capabilities, and algorithmic problem-solving.</p>
                </div>
              </Reveal>
            </div>
            
            <Reveal delay={0.4}>
              <div className={styles.foundationImage} style={{ marginTop: '2rem' }}>
                <Image 
                  src="/PASSION.JPG.jpeg" 
                  alt="IIT-NEET Foundation Classes" 
                  fill 
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
                  sizes="(max-width: 1024px) 100vw, 1100px" 
                  style={{ objectFit: 'cover' }} 
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Innovation & Future Labs */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="section-header">
              <span className="badge-premium" style={{ marginBottom: '1rem' }}>Practical Tech</span>
              <h2>Innovation & Future Labs</h2>
              <p>State-of-the-art laboratory features that set us apart as a leader in practical future education.</p>
            </div>
          </Reveal>
          
          <div className="grid2" style={{ marginTop: '3rem' }}>
            <Reveal delay={0.1}>
              <div className="card-premium" style={{ padding: '2.5rem' }}>
                <h3 style={{ color: 'var(--primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700, fontSize: '1.4rem' }}>
                  <div className="icon-circle" style={{ width: '44px', height: '44px', backgroundColor: '#fef2f2', color: 'var(--accent)' }}>
                    <Cpu size={20} />
                  </div>
                  AI & Robotics Lab
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  First school in the region featuring hands-on kits to learn block coding, IoT sensor setups, automated mechanics, and algorithmic logic.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text)' }}>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--accent)' }}>✔</span> Real-time coding & robotics projects</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--accent)' }}>✔</span> Practical learning with engineering tools</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--accent)' }}>✔</span> Team collaboration & logical thinking</li>
                </ul>
              </div>
            </Reveal>
            
            <Reveal delay={0.2}>
              <div className="card-premium" style={{ padding: '2.5rem' }}>
                <h3 style={{ color: 'var(--primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700, fontSize: '1.4rem' }}>
                  <div className="icon-circle" style={{ width: '44px', height: '44px', backgroundColor: '#fef2f2', color: 'var(--accent)' }}>
                    <Compass size={20} />
                  </div>
                  Space Lab
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  Encouraging space science, astronomical observation, and stellar coordinate mapping with experiments tailored for younger grades.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text)' }}>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--accent)' }}>✔</span> Astronomy models & scale coordinates</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--accent)' }}>✔</span> Interactive sky-mapping sessions</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--accent)' }}>✔</span> Certified science project showcases</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CBSE Alignment Section */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ backgroundColor: 'var(--bg-card)', padding: '4rem 3rem', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.03)', boxShadow: '0 4px 20px rgba(0,0,0,0.01)' }}>
          <Reveal>
            <div className="section-header" style={{ marginBottom: '3rem' }}>
              <span className="badge-premium" style={{ marginBottom: '1rem' }}>Curriculum Alignment</span>
              <h2>Strong Academics (CBSE Standards)</h2>
              <p>Top English medium school in Dharmavaram focusing on holistic CBSE development matrices.</p>
            </div>
          </Reveal>
          
          <ul className={styles.listGrid}>
            <Reveal delay={0.1}>
              <li className={styles.listItem}>
                <div className={styles.listIcon}><BookMarked size={18} /></div>
                <span>Concept-based interactive lectures and assessments</span>
              </li>
            </Reveal>
            <Reveal delay={0.2}>
              <li className={styles.listItem}>
                <div className={styles.listIcon}><BookMarked size={18} /></div>
                <span>Regular analytics diagnostics and student progress reports</span>
              </li>
            </Reveal>
            <Reveal delay={0.3}>
              <li className={styles.listItem}>
                <div className={styles.listIcon}><BookMarked size={18} /></div>
                <span>Open dialogue and consistent communication with parents</span>
              </li>
            </Reveal>
            <Reveal delay={0.4}>
              <li className={styles.listItem}>
                <div className={styles.listIcon}><BookMarked size={18} /></div>
                <span>Focus on student logic, confidence, and leadership values</span>
              </li>
            </Reveal>
          </ul>
        </div>
      </section>
    </div>
  );
}

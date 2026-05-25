import React from 'react';
import styles from './about.module.css';
import Reveal from '@/components/Reveal';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Award, 
  Heart, 
  Check, 
  Compass, 
  BookOpen, 
  GraduationCap
} from 'lucide-react';

export default function About() {
  return (
    <div className={styles.container}>
      {/* Page Hero */}
      <div className="page-hero">
        <Reveal>
          <h1>About Rishi Vidyalaya</h1>
          <p>A Legacy of Excellence & Innovation in Dharmavaram</p>
        </Reveal>
      </div>

      {/* Philosophy Section */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <span className="badge-premium" style={{ marginBottom: '1rem' }}>Our Philosophy</span>
              <h2>Inspiring Success & Character</h2>
              <p>At Rishi Vidyalaya, we combine academic excellence with holistic development to prepare students for a successful future.</p>
            </div>
          </Reveal>
          
          <div className={styles.philosophyGrid}>
            <div className={styles.philosophyContent}>
              <Reveal delay={0.1}>
                <div style={{ backgroundColor: 'var(--bg-card)', padding: '2rem', borderRadius: '20px', borderLeft: '4px solid var(--accent)', boxShadow: '0 4px 20px -5px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ color: 'var(--primary)', marginBottom: '0.75rem', fontWeight: 700, fontSize: '1.35rem' }}>Our Vision</h3>
                  <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    To nurture young minds into confident, compassionate, and globally responsible individuals through holistic education and concept-based learning.
                  </p>
                </div>
              </Reveal>
              
              <Reveal delay={0.2}>
                <div style={{ backgroundColor: 'var(--bg-card)', padding: '2rem', borderRadius: '20px', boxShadow: '0 4px 20px -5px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ color: 'var(--primary)', marginBottom: '1rem', fontWeight: 700, fontSize: '1.35rem' }}>Our Mission</h3>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', padding: 0 }}>
                    <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <div style={{ color: 'var(--accent)', marginTop: '2px' }}><Check size={18} /></div>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Providing a balanced learning environment that fosters creativity, critical thinking, and leadership.</p>
                    </li>
                    <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <div style={{ color: 'var(--accent)', marginTop: '2px' }}><Check size={18} /></div>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Instilling ethical values, discipline, and a passion for lifelong learning.</p>
                    </li>
                    <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <div style={{ color: 'var(--accent)', marginTop: '2px' }}><Check size={18} /></div>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Empowering students to reach their full potential and contribute to society.</p>
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>
            
            <Reveal delay={0.3}>
              <div className={styles.philosophyImage}>
                <Image 
                  src="/PROJECT%20BASED%20LEARNING-1.JPG.jpeg" 
                  alt="Students Learning" 
                  fill 
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
                  sizes="(max-width: 1024px) 100vw, 550px" 
                  style={{ objectFit: 'cover' }} 
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Trusted Excellence Section */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className={styles.journeySection}>
            <Reveal>
              <div className="section-header" style={{ marginBottom: '3rem' }}>
                <h2 style={{ color: 'white' }}>Trusted Excellence</h2>
                <p style={{ color: 'rgba(255,255,255,0.85)' }}>Recognized among the top schools in the Dharmavaram region.</p>
              </div>
            </Reveal>
            <div className="grid2" style={{ gap: '3rem' }}>
              <Reveal delay={0.1}>
                <div style={{ color: 'white' }}>
                  <h3 style={{ color: 'var(--accent)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem' }}>
                    <Award size={20} /> Awards & Recognitions
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem' }}>
                    <li style={{ display: 'flex', gap: '0.5rem' }}><span>•</span> <span>National-level awards in education excellence and service.</span></li>
                    <li style={{ display: 'flex', gap: '0.5rem' }}><span>•</span> <span>First ISO Certified School in the region (Certified ISO 9001:2015).</span></li>
                    <li style={{ display: 'flex', gap: '0.5rem' }}><span>•</span> <span>Consistent regional milestones in student academics and achievements.</span></li>
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div style={{ color: 'white' }}>
                  <h3 style={{ color: 'var(--accent)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem' }}>
                    <Compass size={20} /> Secure Residential Facilities
                  </h3>
                  <p style={{ lineHeight: '1.7', color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem' }}>
                    Our separate green hostel campus provides a safe, secure, and dedicated environment. With nutritious food, caring warden supervision, and distinct, modern residential blocks for boys and girls, we ensure a home-away-from-home experience that supports concentrated study schedules.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="section-header">
              <span className="badge-premium" style={{ marginBottom: '1rem' }}>Our Values</span>
              <h2>Core Educational Principles</h2>
              <p>The principles that guide our everyday actions and shape our students into leaders.</p>
            </div>
          </Reveal>
          
          <div className="grid3" style={{ marginTop: '3rem' }}>
            <Reveal delay={0.1}>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <ShieldCheck size={28} />
                </div>
                <h3>Integrity</h3>
                <p>Doing the right thing even when no one is watching. We build student trust through honesty, discipline, and ethical behavior.</p>
              </div>
            </Reveal>
            
            <Reveal delay={0.2}>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <GraduationCap size={28} />
                </div>
                <h3>Excellence</h3>
                <p>Striving for the highest standards in CBSE academics, competitive prep, sports coaching, and personal development.</p>
              </div>
            </Reveal>
            
            <Reveal delay={0.3}>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <Heart size={28} />
                </div>
                <h3>Compassion</h3>
                <p>Fostering an inclusive and supportive environment where every student is valued, encouraged, and guided individually.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className={styles.journeySection} style={{ backgroundColor: 'var(--primary-light)' }}>
            <Reveal>
              <div className="section-header" style={{ marginBottom: '3rem' }}>
                <h2 style={{ color: 'white' }}>The Journey of Rishi Vidyalaya</h2>
                <p style={{ color: 'rgba(255,255,255,0.85)' }}>Building a legacy of excellence and concept teaching in Dharmavaram.</p>
              </div>
            </Reveal>
            <div className={styles.journeyGrid}>
              <Reveal delay={0.1}>
                <div style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.9)' }}>
                  <p style={{ marginBottom: '1.5rem' }}>
                    Established with a profound commitment to reshaping education, Rishi Vidyalaya has grown from a humble beginning into a premier institution. We recognized early on that academic success alone isn't enough; students need a foundation that prepares them for highly competitive landscapes like IIT and NEET, while remaining grounded in strong ethical values.
                  </p>
                  <p>
                    Today, our campus is a vibrant community where thousands of students have discovered their potential. With our state-of-the-art facilities, dedicated residential programs, and passionate faculty, we continue to bridge the gap between traditional learning and future-ready innovation.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className={styles.journeyImage}>
                  <Image 
                    src="/PERFECTION.JPG.jpeg" 
                    alt="Rishi Vidyalaya Campus" 
                    fill 
                    quality={75}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
                    sizes="(max-width: 1024px) 100vw, 550px" 
                    style={{ objectFit: 'cover' }} 
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

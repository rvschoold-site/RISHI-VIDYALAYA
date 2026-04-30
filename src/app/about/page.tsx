import React from 'react';
import styles from './about.module.css';
import Reveal from '@/components/Reveal';
import Image from 'next/image';

export default function About() {
  return (
    <div className={styles.container}>
      <div className="page-hero">
        <h1>About Rishi Vidyalaya</h1>
        <p>A Legacy of Excellence & Innovation in Dharmavaram</p>
      </div>
      <section className="section">
        <Reveal>
          <div className="section-header">
            <h2>Our Philosophy</h2>
            <p>At Rishi Vidyalaya, we combine academic excellence with holistic development to prepare students for a successful future.</p>
          </div>
        </Reveal>
        
        <div className={styles.philosophyGrid}>
          <div className={styles.philosophyContent}>
            <Reveal delay={0.1}>
              <div style={{ backgroundColor: 'var(--bg-card)', padding: 'var(--spacing-2xl)', borderRadius: '20px', borderLeft: '4px solid var(--accent)', boxShadow: '0 4px 20px -5px rgba(0,0,0,0.05)' }}>
                <h2 style={{ color: 'var(--primary)', marginBottom: 'var(--spacing-md)' }}>Our Vision</h2>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
                   To nurture young minds into confident, compassionate, and globally responsible individuals through holistic education.
                </p>
              </div>
            </Reveal>
            
            <Reveal delay={0.2}>
              <div style={{ backgroundColor: 'var(--bg-card)', padding: 'var(--spacing-2xl)', borderRadius: '20px', boxShadow: '0 4px 20px -5px rgba(0,0,0,0.05)' }}>
                <h2 style={{ color: 'var(--primary)', marginBottom: 'var(--spacing-md)' }}>Our Mission</h2>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                  <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <p style={{ fontSize: '1.1rem' }}>Providing a balanced learning environment that fosters creativity, critical thinking, and leadership.</p>
                  </li>
                  <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <p style={{ fontSize: '1.1rem' }}>Instilling ethical values, discipline, and a passion for lifelong learning.</p>
                  </li>
                  <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <p style={{ fontSize: '1.1rem' }}>Empowering students to reach their full potential and contribute to society.</p>
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
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px" 
                style={{ objectFit: 'cover' }} 
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className={`section ${styles.journeySection}`}>
        <div className="container">
          <Reveal>
            <div className="section-header" style={{ marginBottom: 'var(--spacing-xl)' }}>
              <h2 style={{ color: 'white' }}>Trusted Excellence</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)' }}>Recognized among the top schools in Dharmavaram.</p>
            </div>
          </Reveal>
          <div className="grid2" style={{ gap: '3rem' }}>
            <Reveal delay={0.2}>
              <div style={{ color: 'white' }}>
                <h3 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>🏅 Awards & Recognitions</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '1rem' }}>• National-level awards in education and service.</li>
                  <li style={{ marginBottom: '1rem' }}>• One of the first ISO-certified schools in the Dharmavaram region.</li>
                  <li style={{ marginBottom: '1rem' }}>• Consistently recognized for student achievements and academic excellence.</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div style={{ color: 'white' }}>
                <h3 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>🏠 Best Residential School</h3>
                <p style={{ lineHeight: '1.8' }}>Our separate green hostel campus provides a safe, secure, and well-maintained environment. With nutritious food and caring supervision, we ensure a home-away-from-home experience for our students.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <Reveal>
          <div className="section-header">
            <h2>Our Core Values</h2>
            <p>The principles that guide our everyday actions and shape our students.</p>
          </div>
        </Reveal>
        <div className="grid3">
          <Reveal delay={0.1}>
            <div className="card" style={{ textAlign: 'center' }}>
              <svg className="icon-float" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 8l4 4-4 4M8 12h7"></path></svg>
              <h3>Integrity</h3>
              <p>Doing the right thing even when no one is watching. We build trust through honesty.</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="card" style={{ textAlign: 'center' }}>
              <svg className="icon-float" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <h3>Excellence</h3>
              <p>Striving for the highest standards in academics, sports, and personal growth.</p>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="card" style={{ textAlign: 'center' }}>
              <svg className="icon-float" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              <h3>Compassion</h3>
              <p>Fostering an inclusive environment where every student is valued and supported.</p>
            </div>
          </Reveal>
        </div>
      </section>
      <section className={`section ${styles.journeySection}`}>
        <div className="container">
          <Reveal>
            <div className="section-header" style={{ marginBottom: 'var(--spacing-xl)' }}>
              <h2 style={{ color: 'white' }}>The Journey of Rishi Vidyalaya</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)' }}>Building a legacy of excellence in Dharmavaram.</p>
            </div>
          </Reveal>
          <div className={styles.journeyGrid}>
            <Reveal delay={0.2}>
              <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.9)' }}>
                <p style={{ marginBottom: '1.5rem' }}>Established with a profound commitment to reshaping education, Rishi Vidyalaya has grown from a humble beginning into a premier institution. We recognized early on that academic success alone isn't enough; students need a foundation that prepares them for highly competitive landscapes like IIT and NEET, while remaining grounded in strong ethical values.</p>
                <p>Today, our campus is a vibrant community where thousands of students have discovered their potential. With our state-of-the-art facilities, dedicated residential programs, and passionate faculty, we continue to bridge the gap between traditional learning and future-ready innovation.</p>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div className={styles.journeyImage}>
                <Image 
                  src="/PERFECTION.JPG.jpeg" 
                  alt="Rishi Vidyalaya Campus" 
                  fill 
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px" 
                  style={{ objectFit: 'cover' }} 
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

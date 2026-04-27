import React from 'react';
import styles from './academics.module.css';
import Reveal from '@/components/Reveal';
import Image from 'next/image';

export default function Academics() {
  return (
    <div className={styles.container}>
      <div className="page-hero">
        <h1>Academics & Beyond</h1>
        <p>Empowering students with knowledge and skills for the 21st century.</p>
      </div>
      <section className="section">
        <Reveal>
          <div className="section-header">
            <h2>The Curriculum</h2>
            <p>A multidimensional approach to learning that goes beyond textbooks.</p>
          </div>
        </Reveal>
        <div className="grid3">
          <Reveal delay={0.1}>
            <div className="card">
              <svg className="icon-float" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
              <h3>CBSE Curriculum</h3>
              <p>A structured and innovative learning approach focusing on core subjects like Mathematics, Science, Social Science, and Languages.</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="card">
              <svg className="icon-float" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem', animationDelay: '0.4s' }}><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              <h3>Skill Development</h3>
              <p>Encouraging problem-solving, analytical thinking, and communication skills.</p>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="card">
              <svg className="icon-float" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem', animationDelay: '0.8s' }}><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.334.473A2 2 0 0 1 13.565 19h-3.13a2 2 0 0 1-1.638-1.157l-.334-.473z"></path></svg>
              <h3>Science & AI Labs</h3>
              <p>State-of-the-art facilities for practical learning and innovation.</p>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="card">
              <svg className="icon-float" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem', animationDelay: '0.2s' }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
              <h3>Library & Digital Resources</h3>
              <p>A vast collection of books, journals, and e-learning tools to encourage reading and research.</p>
            </div>
          </Reveal>
          <Reveal delay={0.5}>
            <div className="card">
              <svg className="icon-float" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem', animationDelay: '0.6s' }}><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
              <h3>Sports & Extracurriculars</h3>
              <p>Cricket, Basketball, Badminton, Music, Dance, Drama, Art, and more!</p>
            </div>
          </Reveal>
          <Reveal delay={0.6}>
            <div className="card">
              <svg className="icon-float" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem', animationDelay: '1s' }}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              <h3>Hostel & Transport</h3>
              <p>Spacious dormitories, nutritious meals, 24/7 supervision, and GPS-enabled safe buses.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={`section ${styles.foundationSection}`}>
        <Reveal>
          <div className="section-header">
            <h2 style={{ color: 'white' }}>IIT-NEET Foundation Track</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)' }}>Building the strongest base for India's toughest competitive exams.</p>
          </div>
        </Reveal>
        <div className={styles.foundationGrid}>
          <Reveal delay={0.1}>
            <div className={styles.foundationCard}>
              <h3>Early Start</h3>
              <p>We introduce advanced concepts from an early age, ensuring students develop abstract thinking naturally.</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className={styles.foundationCard}>
              <h3>Specialized Faculty</h3>
              <p>Our foundation courses are taught by experts who specialize in competitive exam methodologies.</p>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className={styles.foundationCard}>
              <h3>Mock Assessments</h3>
              <p>Frequent evaluation through mock tests modeled after real IIT-JEE and NEET formats.</p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.4}>
          <div className={styles.foundationImage}>
            <Image 
              src="/PASSION.JPG.jpeg" 
              alt="IIT-NEET Foundation Classes" 
              fill 
              sizes="(max-width: 1200px) 100vw, 1200px" 
              style={{ objectFit: 'cover' }} 
            />
          </div>
        </Reveal>
      </section>
    </div>
  );
}

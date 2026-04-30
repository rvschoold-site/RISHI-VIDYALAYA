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
            <p>We focus on concept clarity and deep understanding to build strong fundamentals.</p>
          </div>
        </Reveal>
        
        <div className="grid3">
          <Reveal delay={0.1}>
            <div className="card">
              <svg className="icon-float" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              <h3>Concept Mastery</h3>
              <p>Recognized for concept-based learning that prepares students for careers like IIT, NEET, IAS, and IPS.</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="card">
              <svg className="icon-float" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l3 3"></path></svg>
              <h3>Step-by-Step System</h3>
              <p>Our structured learning system ensures every student progresses at their best pace with confidence.</p>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="card">
              <svg className="icon-float" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              <h3>Individual Attention</h3>
              <p>Personalized focus on each student's performance to ensure no one is left behind in their academic journey.</p>
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
                <h3>Early Preparation</h3>
                <p>Structured learning with a clear academic roadmap for IIT JEE and NEET exams starting from middle school.</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className={styles.foundationCard}>
                <h3>Analytical Thinking</h3>
                <p>Developing problem-solving skills and logical reasoning through an integrated program within the regular curriculum.</p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className={styles.foundationCard}>
                <h3>Future Success</h3>
                <p>Building the foundation today for successful careers in engineering, medicine, and research tomorrow.</p>
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
              <h2>Innovation & Space Lab</h2>
              <p>Unique features that set us apart as the best school for future learning.</p>
            </div>
          </Reveal>
          <div className="grid2">
            <div className="card-premium">
              <h3>🤖 AI & Robotics Lab</h3>
              <p>Hands-on learning with real-time projects. Students learn coding, automation, and innovation skills essential for the 21st century.</p>
            </div>
            <div className="card-premium">
              <h3>🚀 Space Lab</h3>
              <p>A unique feature among schools in Dharmavaram. Focusing on space science and astronomy through interactive models and experiments.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="container">
          <Reveal>
            <div className="section-header">
              <h2>Strong Academics (CBSE)</h2>
              <p>Among the top English medium schools in Dharmavaram.</p>
            </div>
          </Reveal>
          <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', padding: 0 }}>
            <li className="list-item-premium">✔ Concept-based teaching methodology</li>
            <li className="list-item-premium">✔ Regular tests and performance tracking</li>
            <li className="list-item-premium">✔ Transparent communication with parents</li>
            <li className="list-item-premium">✔ Consistent focus on top academic results</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

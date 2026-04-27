import React from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Image from 'next/image';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroTextContent}>
            <h1 className="animate-fade-in">A School Where Learning Meets Excellence</h1>
            <p className="animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0 }}>
              Classes from LKG, UKG to Grade 7.
            </p>
            <div className={styles.ctaGroup} style={{ animationDelay: '0.4s', opacity: 0, animation: 'fadeIn 0.6s ease-out forwards' }}>
              <Link href="/admission" className="btn btn-primary btn-pulse" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                Admission Open Now
              </Link>
              <div className="btn btn-outline" style={{ backgroundColor: 'transparent', color: 'white', borderColor: 'white', pointerEvents: 'none', padding: '1rem 2rem', fontSize: '1.1rem' }}>
                Academic Year 2026-27
              </div>
            </div>
            
            <div className={styles.trustBadges}>
              <div className={styles.badge}>
                <span style={{ color: 'var(--accent)' }}>✔</span> CBSE Curriculum
              </div>
              <div className={styles.badge}>
                <span style={{ color: 'var(--accent)' }}>✔</span> IIT & NEET Foundation
              </div>
              <div className={styles.badge}>
                <span style={{ color: 'var(--accent)' }}>✔</span> Residential Facilities
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section" style={{ textAlign: 'center', paddingBottom: 0 }}>
        <Reveal>
          <h2 style={{ fontSize: '2rem', color: 'var(--primary)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.4' }}>
            At Rishi Vidyalaya, we combine academic excellence with holistic development to prepare students for a successful future.
          </h2>
        </Reveal>
      </section>

      {/* Why Choose Us Section */}
      <section className="section">
        <Reveal>
          <div className="section-header">
            <h2>Why Choose RISHI VIDYALAYA?</h2>
          </div>
        </Reveal>
        <div className="grid3">
          <Reveal delay={0.1}>
            <div className="card">
              <svg className="icon-float" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              <h3>AI & Robotics Lab</h3>
              <p>Hands-on experience in future technologies</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="card">
              <svg className="icon-float" style={{ animationDelay: '0.5s', marginBottom: '1rem' }} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
              <h3>NEET & IIT Foundation</h3>
              <p>Strong academic foundation from an early age</p>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="card">
              <svg className="icon-float" style={{ animationDelay: '1s', marginBottom: '1rem' }} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              <h3>Residential & Semi-Residential</h3>
              <p>Secure and structured learning environment</p>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="card">
              <svg className="icon-float" style={{ animationDelay: '0.2s', marginBottom: '1rem' }} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              <h3>Activity-Based Learning</h3>
              <p>Engaging and interactive teaching methods</p>
            </div>
          </Reveal>
          <Reveal delay={0.5}>
            <div className="card">
              <svg className="icon-float" style={{ animationDelay: '0.7s', marginBottom: '1rem' }} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              <h3>Expert Teachers</h3>
              <p>Educators from diverse backgrounds ensuring quality teaching</p>
            </div>
          </Reveal>
          <Reveal delay={0.6}>
            <div className="card">
              <svg className="icon-float" style={{ animationDelay: '1.2s', marginBottom: '1rem' }} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              <h3>CBSE Curriculum</h3>
              <p>A well-structured syllabus for all-round development</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section" style={{ backgroundColor: 'var(--bg-card)', borderRadius: '24px' }}>
        <div className="section-header">
          <h2>Our Vision & Mission</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
          <div>
            <div style={{ marginBottom: 'var(--spacing-xl)' }}>
              <h3 style={{ color: 'var(--accent)', marginBottom: 'var(--spacing-sm)', fontSize: '1.5rem' }}>Vision:</h3>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
                To nurture young minds into confident, compassionate, and globally responsible individuals through holistic education.
              </p>
            </div>
            <div>
              <h3 style={{ color: 'var(--accent)', marginBottom: 'var(--spacing-sm)', fontSize: '1.5rem' }}>Mission:</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                <li style={{ display: 'flex', gap: '1rem' }}><span style={{color:'var(--accent)'}}>•</span><p>Providing a balanced learning environment that fosters creativity, critical thinking, and leadership.</p></li>
                <li style={{ display: 'flex', gap: '1rem' }}><span style={{color:'var(--accent)'}}>•</span><p>Instilling ethical values, discipline, and a passion for lifelong learning.</p></li>
                <li style={{ display: 'flex', gap: '1rem' }}><span style={{color:'var(--accent)'}}>•</span><p>Empowering students to reach their full potential and contribute to society.</p></li>
              </ul>
            </div>
          </div>
          <Reveal delay={0.2}>
            <div style={{ position: 'relative', height: '400px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.2)' }}>
              <Image src="/PURPOSE-1.JPG.jpeg" alt="Rishi Vidyalaya Vision" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Academics & Beyond */}
      <section className="section">
        <div className="section-header">
          <h2>Academics & Beyond</h2>
        </div>
        <div className="grid3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
          <div className="card">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            <h3>CBSE Curriculum</h3>
            <p>A structured and innovative learning approach focusing on core subjects like Mathematics, Science, Social Science, and Languages.</p>
          </div>
          <div className="card">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            <h3>Skill Development</h3>
            <p>Encouraging problem-solving, analytical thinking, and communication skills.</p>
          </div>
          <div className="card">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
            <h3>Sports & Extracurriculars</h3>
            <p>Cricket, Basketball, Badminton, Music, Dance, Drama, Art, and more!</p>
          </div>
          <div className="card">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.334.473A2 2 0 0 1 13.565 19h-3.13a2 2 0 0 1-1.638-1.157l-.334-.473z"></path></svg>
            <h3>Science & AI Labs</h3>
            <p>State-of-the-art facilities for practical learning and innovation.</p>
          </div>
          <div className="card">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
            <h3>Library & Digital Resources</h3>
            <p>A vast collection of books, journals, and e-learning tools to encourage reading and research.</p>
          </div>
          <div className="card">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>
            <h3>Safe Transport</h3>
            <p>GPS-enabled buses with trained staff for a secure journey.</p>
          </div>
          <div className="card">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            <h3>Hostel Facilities</h3>
            <p>Spacious dormitories, nutritious meals, and 24/7 supervision.</p>
          </div>
        </div>
      </section>

      {/* Commitment to Excellence */}
      <section className="section" style={{ backgroundColor: 'var(--primary)', color: 'white', borderRadius: '24px' }}>
        <div className="section-header">
          <h2 style={{ color: 'white' }}>Our Commitment to Excellence</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)' }}>At RISHI VIDYALAYA, every child is given the platform to dream, learn, and grow</p>
        </div>
        <div className="grid3">
          <div style={{ padding: 'var(--spacing-md)' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}><span style={{color:'var(--accent)'}}>✔</span> Continuous Teacher Training</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)' }}>Ensuring top-notch education delivery.</p>
          </div>
          <div style={{ padding: 'var(--spacing-md)' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}><span style={{color:'var(--accent)'}}>✔</span> Student Evaluation System</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)' }}>Regular assessments, feedback, and parent meetings.</p>
          </div>
          <div style={{ padding: 'var(--spacing-md)' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}><span style={{color:'var(--accent)'}}>✔</span> Ethics & Advisory Board</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)' }}>Upholding integrity, discipline, and moral values.</p>
          </div>
        </div>
      </section>

      {/* Excellence Highlights */}
      <section className="section" style={{ textAlign: 'center' }}>
        <h2 style={{ color: 'var(--primary)', fontSize: '2.5rem', marginBottom: 'var(--spacing-sm)' }}>RISHI VIDYALAYA</h2>
        <h3 style={{ color: 'var(--accent)', fontSize: '1.8rem', marginBottom: 'var(--spacing-2xl)' }}>Where Excellence Begins!</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          <span className={`btn btn-outline ${styles.highlightBadge}`}>CBSE Curriculum + IIT & NEET Foundation</span>
          <span className={`btn btn-outline ${styles.highlightBadge}`}>Sports & Extracurriculars</span>
          <span className={`btn btn-outline ${styles.highlightBadge}`}>Residential & Semi-Residential Facilities</span>
          <span className={`btn btn-outline ${styles.highlightBadge}`}>Safe Transport</span>
          <span className={`btn btn-outline ${styles.highlightBadge}`}>AI & Robotics Lab</span>
        </div>
      </section>

      {/* Meet Our Faculty */}
      <section className="section">
        <div style={{ padding: 'var(--spacing-2xl)', backgroundColor: 'var(--bg)', borderRadius: '16px', borderLeft: '4px solid var(--primary)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-2xl)', alignItems: 'center' }}>
          <div>
            <h3 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.8rem' }}>Meet Our Faculty</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>Our team of experienced and highly qualified teachers from across the country bring diverse knowledge and expertise to create a vibrant learning environment.</p>
          </div>
          <Reveal delay={0.2}>
            <div style={{ position: 'relative', height: '300px', borderRadius: '12px', overflow: 'hidden' }}>
              <Image src="/PERFRCTION-1.JPG.jpeg" alt="Our Faculty in Action" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact & Admission CTA */}
      <section id="admission" className="section">
        <div className="section-header">
          <h2 style={{ color: 'var(--accent)' }}>Admissions Open!</h2>
          <p>Give your child the best start in life. Enroll today!</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-3xl)' }}>
          <div>
            <h3 style={{ color: 'var(--primary)', marginBottom: 'var(--spacing-lg)', fontSize: '2rem' }}>Contact Information</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--spacing-xl)' }}>How to get in touch with us.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <h4 style={{ color: 'var(--primary)', marginBottom: '0.25rem' }}>Mailing Address</h4>
                <p>N.S Gate road, Opp: Tidco Houses, Dharmavaram.</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--primary)', marginBottom: '0.25rem' }}>Contact</h4>
                <p>+91 9063466944, 9063466945</p>
                <p>rvschoold@gmail.com</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--primary)', marginBottom: '0.25rem' }}>Website</h4>
                <p>www.rishividyalaya.in</p>
              </div>
            </div>
          </div>
          
          <Reveal delay={0.2}>
            <div style={{ backgroundColor: 'var(--bg-card)', padding: 'var(--spacing-3xl)', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', border: '2px solid var(--accent)' }}>
              <h3 style={{ color: 'var(--primary)', marginBottom: 'var(--spacing-md)', fontSize: '2.5rem' }}>Ready to Apply?</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--spacing-xl)', fontSize: '1.2rem', maxWidth: '400px' }}>Join the Rishi Vidyalaya family today and give your child the foundation they need to succeed.</p>
              
              <Link href="/admission" className="btn btn-primary btn-pulse" style={{ padding: '1rem 3rem', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Fill up our form
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}

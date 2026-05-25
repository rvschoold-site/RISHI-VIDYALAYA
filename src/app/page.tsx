import React from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Image from 'next/image';
import LazyLoad from '@/components/LazyLoad';
import SocialFeed from '@/components/SocialFeed';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <Image
          src="/PROJECT%20BASED%20LEARNING.JPG.jpeg"
          alt="Rishi Vidyalaya Campus"
          fill
          priority
          quality={75}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
          sizes="100vw"
          className={styles.heroBg}
          style={{ objectFit: 'cover' }}
        />
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroTextContent}>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }} className="animate-fade-in">
              <span className="badge-premium-hero">First Time in the Region</span>
              <span className="badge-premium-hero" style={{ borderColor: 'rgba(220,38,38,0.5)', backgroundColor: 'rgba(220,38,38,0.2)' }}>First AC Campus</span>
              <span className="badge-premium-hero">Certified ISO 9001:2015 School</span>
            </div>
            <h1 className="animate-fade-in">Rishi Vidyalaya</h1>
            <h2 className="animate-fade-in" style={{ fontSize: '1.8rem', fontWeight: '700', color: 'white', marginBottom: '0.5rem' }}>
              IIT-NEET Foundation School
            </h2>
            <h3 className="animate-fade-in" style={{ fontSize: '1.25rem', fontWeight: '500', color: 'var(--accent)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              To be Affiliated to CBSE
            </h3>
            <p className="animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0, fontSize: '1.25rem', fontWeight: '400', color: 'rgba(255,255,255,0.95)', marginBottom: '1rem' }}>
              Residential | Semi Residential | Day School
            </p>
            <p className="animate-fade-in" style={{ animationDelay: '0.3s', opacity: 0, fontSize: '1.1rem', maxWidth: '700px', color: 'rgba(255,255,255,0.7)' }}>
              AC Campus | 2 Acres Playground | Space Lab | IIT-NEET Foundation | AI & Robotics
            </p>
            <div className={styles.ctaGroup} style={{ animationDelay: '0.4s', opacity: 0, animation: 'fadeIn 0.6s ease-out forwards', marginTop: '2rem' }}>
              <Link href="/admission" className="btn btn-primary btn-pulse" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                Admission Open 2026-27
              </Link>
              <Link href="/contact" className="btn btn-outline" style={{ backgroundColor: 'transparent', color: 'white', borderColor: 'white', padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                Enquire Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Highlights Bar */}
      <section style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '1.5rem 0' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--accent)', fontSize: '1.5rem' }}>✔</span> <span>AC Smart Classrooms</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--accent)', fontSize: '1.5rem' }}>✔</span> <span>2 Acres Playground</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--accent)', fontSize: '1.5rem' }}>✔</span> <span>Green Hostel Facility</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--accent)', fontSize: '1.5rem' }}>✔</span> <span>Space & Robotics Labs</span>
          </div>
        </div>
      </section>

      {/* Admissions Open Banner Section */}
      <section className="section" style={{ background: 'linear-gradient(135deg, var(--bg-card) 0%, #f1f5f9 100%)', borderRadius: '24px', margin: '3rem auto', padding: '4rem 2rem', boxShadow: '0 10px 30px -15px rgba(0,0,0,0.05)', maxWidth: '1200px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <Reveal>
            <div>
              <span className="badge-premium" style={{ marginBottom: '1rem', display: 'inline-block' }}>Admissions Open 2026-27</span>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                Your Children Can Become High Achievers
              </h2>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.8' }}>
                At Rishi Vidyalaya, we prepare your children to become <strong style={{ color: 'var(--accent)' }}>IIT, NEET, IAS, IPS, CA, and Government Job achievers</strong>. A strong foundation for their future education starts here.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/admission" className="btn btn-primary btn-pulse" style={{ padding: '0.875rem 2rem' }}>
                  Apply Online
                </Link>
                <Link href="/contact" className="btn btn-outline" style={{ padding: '0.875rem 2rem' }}>
                  Enquire Now
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ position: 'relative', height: '350px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}>
              <Image
                src="/PERFORMANCE-1.JPG.jpeg"
                alt="Admissions Open at Rishi Vidyalaya"
                fill
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
                sizes="(max-width: 768px) 100vw, 500px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Academic Excellence Section */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <span className="text-accent" style={{ fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px' }}>Academic Excellence</span>
              <h2>Strong Foundation for a Bright Future</h2>
              <p>Best School in Dharmavaram for Concept-Based Learning</p>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            <Reveal delay={0.1}>
              <div className="card-premium" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <div className="icon-circle">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', color: 'var(--primary)' }}>Back to Basics</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>First time introduced in the region, focusing on deep conceptual clarity.</p>
                  </div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--text)' }}>
                  <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}><span style={{ color: 'var(--accent)' }}>✔</span> <span>First time introduced in the region</span></li>
                  <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}><span style={{ color: 'var(--accent)' }}>✔</span> <span>Strong basics for IIT, Doctor, IAS aspirations</span></li>
                  <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}><span style={{ color: 'var(--accent)' }}>✔</span> <span>Clear concept understanding</span></li>
                  <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}><span style={{ color: 'var(--accent)' }}>✔</span> <span>Step-by-step strong learning approach</span></li>
                  <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}><span style={{ color: 'var(--accent)' }}>✔</span> <span>Individual focus on student skills development</span></li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="card-premium" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <div className="icon-circle">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', color: 'var(--primary)' }}>IIT - NEET Foundation</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>Early preparation with an integrated academic roadmap.</p>
                  </div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--text)' }}>
                  <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}><span style={{ color: 'var(--accent)' }}>✔</span> <span>IIT & NEET competitive exam preparation</span></li>
                  <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}><span style={{ color: 'var(--accent)' }}>✔</span> <span>Proper planning and structured roadmap</span></li>
                  <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}><span style={{ color: 'var(--accent)' }}>✔</span> <span>Analytical thinking & problem-solving skill development</span></li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="card-premium" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <div className="icon-circle">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', color: 'var(--primary)' }}>Strong Academics</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>Rigorous standards to ensure the best results.</p>
                  </div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--text)' }}>
                  <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}><span style={{ color: 'var(--accent)' }}>✔</span> <span>Concept-based teaching</span></li>
                  <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}><span style={{ color: 'var(--accent)' }}>✔</span> <span>Regular tests and progress monitoring</span></li>
                  <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}><span style={{ color: 'var(--accent)' }}>✔</span> <span>Clear communication with parents</span></li>
                  <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}><span style={{ color: 'var(--accent)' }}>✔</span> <span>Focus on best academic results</span></li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Innovation & Future Learning */}
      <section className="section" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <Reveal>
              <div>
                <span className="text-accent" style={{ fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px' }}>Innovation & Future Labs</span>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Leading the Region in Practical Tech</h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
                  We are leading the way as the best school with AI, Robotics, and Space Labs in Dharmavaram, providing students with tools to excel in the digital age.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div style={{ display: 'flex', gap: '1.25rem' }}>
                    <div style={{ color: 'var(--accent)', marginTop: '4px' }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M12 2v9M8 5h8"></path></svg>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>AI & Robotics Lab</h4>
                      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                        <li><span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>✔</span> Real-time projects & practical learning</li>
                        <li><span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>✔</span> Coding, automation & innovation skill development</li>
                        <li><span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>✔</span> First time in the region AI lab</li>
                      </ul>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1.25rem' }}>
                    <div style={{ color: 'var(--accent)', marginTop: '4px' }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2v20M2 12h20"></path></svg>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Space Lab</h4>
                      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                        <li><span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>✔</span> Space science & astronomy concepts</li>
                        <li><span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>✔</span> Models & experiments for easy understanding</li>
                        <li><span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>✔</span> First time in the region</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{ position: 'relative', height: '500px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)' }}>
                <Image 
                  src="/PURPOSE-1.JPG.jpeg" 
                  alt="Innovation at Rishi Vidyalaya" 
                  fill 
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                  style={{ objectFit: 'cover' }} 
                />
                <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', padding: '2rem', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', color: 'white' }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>Digi Fest</h3>
                  <p>A platform for creativity, innovation, and digital presentation skills.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Campus & Infrastructure */}
      <LazyLoad rootMargin="300px 0px">
        <section className="section">
          <div className="container">
            <Reveal>
              <div className="section-header">
                <span className="text-accent" style={{ fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px' }}>Infrastructure</span>
                <h2>World-Class Campus in Dharmavaram</h2>
                <p>Top Residential School with Modern Facilities</p>
              </div>
            </Reveal>

            <div className="grid3" style={{ marginTop: '3rem' }}>
              <Reveal delay={0.1}>
                <div className="card-hover-scale">
                  <div style={{ position: 'relative', height: '240px', borderRadius: '16px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                    <Image 
                      src="/PERFRCTION-1.JPG.jpeg" 
                      alt="2 Acres Playground" 
                      fill 
                      quality={75}
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                      style={{ objectFit: 'cover' }} 
                    />
                  </div>
                  <h3>2 Acres Playground</h3>
                  <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    <li><span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>✔</span> 2 acres play area</li>
                    <li><span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>✔</span> Cricket, football, volleyball & athletics</li>
                    <li><span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>✔</span> Fitness, teamwork & discipline development</li>
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="card-hover-scale">
                  <div style={{ position: 'relative', height: '240px', borderRadius: '16px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                    <Image 
                      src="/PASSION.JPG.jpeg" 
                      alt="AC Smart Classrooms" 
                      fill 
                      quality={75}
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                      style={{ objectFit: 'cover' }} 
                    />
                  </div>
                  <h3>AC Classrooms</h3>
                  <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    <li><span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>✔</span> Comfortable & distraction-free learning</li>
                    <li><span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>✔</span> Smart classes & digital learning support</li>
                    <li><span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>✔</span> Better concentration & productivity</li>
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="card-hover-scale">
                  <div style={{ position: 'relative', height: '240px', borderRadius: '16px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                    <Image 
                      src="/PERFECTION.JPG.jpeg" 
                      alt="Green Campus" 
                      fill 
                      quality={75}
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                      style={{ objectFit: 'cover' }} 
                    />
                  </div>
                  <h3>Green Campus</h3>
                  <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    <li><span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>✔</span> Safe & healthy atmosphere</li>
                    <li><span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>✔</span> Peaceful and clean learning environment</li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </LazyLoad>

      {/* Holistic Development */}
      <LazyLoad rootMargin="300px 0px">
        <section className="section" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
              <div>
                <span className="text-accent" style={{ fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '0.5rem' }}>Beyond Academics</span>
                <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '1.5rem' }}>Holistic Development</h2>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>
                  Preparing students for life, not just for exams. Our programs build discipline, leadership, and responsibility.
                </p>
                <div style={{ marginTop: '2rem' }}>
                  <div style={{ padding: '1.25rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem', fontSize: '1.15rem' }}>Extra & Co-Curricular Activities</h4>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                      <li>• Sports, arts, music & cultural activities</li>
                      <li>• Personality development sessions</li>
                      <li>• Balanced academics + activities</li>
                    </ul>
                  </div>
                  <div style={{ padding: '1.25rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem', fontSize: '1.15rem' }}>Junior Red Cross</h4>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                      <li>• First aid & emergency awareness training</li>
                      <li>• Discipline & responsibility development</li>
                      <li>• Leadership & service mindset</li>
                    </ul>
                  </div>
                  <div style={{ padding: '1.25rem 1rem' }}>
                    <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem', fontSize: '1.15rem' }}>Digi Fest</h4>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                      <li>• Creativity & innovation platform</li>
                      <li>• Technical & cultural exhibitions</li>
                      <li>• Confidence & communication skill development</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', minHeight: '400px' }}>
                <Image 
                  src="/PROJECT%20BASED%20LEARNING-1.JPG.jpeg" 
                  alt="Student Activities" 
                  fill 
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                  style={{ objectFit: 'cover' }} 
                />
              </div>
            </div>
          </div>
        </section>
      </LazyLoad>

      {/* Student Success & Achievements Section */}
      <LazyLoad rootMargin="300px 0px">
        <section className="section" style={{ backgroundColor: 'var(--bg-card)' }}>
          <div className="container">
            <Reveal>
              <div className="section-header">
                <span className="text-accent" style={{ fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px' }}>Aspirations & Success</span>
                <h2>Student Success & Achievements</h2>
                <p>Nurturing talent and building confidence for a successful future</p>
              </div>
            </Reveal>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
              <Reveal delay={0.1}>
                <div className="card-premium" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                  <div>
                    <h3 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.35rem' }}>Academic Achievements</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                      Celebrating consistent academic milestones and recognition at regional and national levels.
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.95rem' }}>
                      <li><span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>✔</span> Academic achievements & recognition</li>
                      <li><span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>✔</span> Talent & confidence encouragement</li>
                      <li><span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>✔</span> Support for successful future</li>
                    </ul>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="card-premium" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                  <div>
                    <h3 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.35rem' }}>First ISO Certified School</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                      Rishi Vidyalaya is the very first school in the region to achieve ISO 9001:2015 certification, verifying our international standards in management and educational quality.
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.95rem' }}>
                      <li><span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>✔</span> First ISO Certified School in region</li>
                      <li><span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>✔</span> Certified ISO 9001:2015 School</li>
                      <li><span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>✔</span> National-level education & service awards</li>
                    </ul>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div style={{ position: 'relative', height: '320px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}>
                  <Image 
                    src="/PERFROMANCE.JPG.jpeg" 
                    alt="Student Achievement and Success" 
                    fill 
                    quality={75}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
                    sizes="(max-width: 768px) 100vw, 400px" 
                    style={{ objectFit: 'cover' }} 
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </LazyLoad>

      {/* Residential & Facilities */}
      <LazyLoad rootMargin="300px 0px">
        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2>Best Residential & Day School Facilities</h2>
              <p>Premium Comfort and Security for Growing Minds</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem', marginTop: '3rem' }}>
              <div style={{ padding: '2.5rem 2rem', backgroundColor: 'var(--bg-card)', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                <h3 style={{ color: 'var(--primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.4rem' }}>
                  <span style={{ display: 'inline-flex', padding: '0.5rem', backgroundColor: 'rgba(220,38,38,0.1)', color: 'var(--accent)', borderRadius: '8px' }}>🏠</span> Hostel Facility
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
                  <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}><span style={{ color: 'var(--accent)' }}>✔</span> <span>Separate hostel campus for boys & girls</span></li>
                  <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}><span style={{ color: 'var(--accent)' }}>✔</span> <span>Safe & dedicated hostel environment</span></li>
                  <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}><span style={{ color: 'var(--accent)' }}>✔</span> <span>Nutritious food & caring supervision</span></li>
                </ul>
              </div>
              <div style={{ padding: '2.5rem 2rem', backgroundColor: 'var(--bg-card)', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                <h3 style={{ color: 'var(--primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.4rem' }}>
                  <span style={{ display: 'inline-flex', padding: '0.5rem', backgroundColor: 'rgba(220,38,38,0.1)', color: 'var(--accent)', borderRadius: '8px' }}>🚌</span> Transportation
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
                  <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}><span style={{ color: 'var(--accent)' }}>✔</span> <span>Safe & reliable transport facility</span></li>
                  <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}><span style={{ color: 'var(--accent)' }}>✔</span> <span>Wide connectivity to nearby areas</span></li>
                  <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}><span style={{ color: 'var(--accent)' }}>✔</span> <span>Hassle-free daily commute for all students</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </LazyLoad>

      {/* Why Choose Us Checklist */}
      <LazyLoad rootMargin="300px 0px">
        <section className="section" style={{ textAlign: 'center', backgroundColor: 'var(--bg-card)' }}>
          <div className="container">
            <h2 style={{ marginBottom: '3rem' }}>Why Choose Rishi Vidyalaya?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', textAlign: 'left', maxWidth: '1000px', margin: '0 auto' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem', background: 'white', borderRadius: '12px' }}>
                <span style={{ color: '#22c55e', fontSize: '1.2rem' }}>✔</span> <strong>Modern Infrastructure</strong>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem', background: 'white', borderRadius: '12px' }}>
                <span style={{ color: '#22c55e', fontSize: '1.2rem' }}>✔</span> <strong>Top IIT & NEET Prep</strong>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem', background: 'white', borderRadius: '12px' }}>
                <span style={{ color: '#22c55e', fontSize: '1.2rem' }}>✔</span> <strong>Leading AI & Robotics</strong>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem', background: 'white', borderRadius: '12px' }}>
                <span style={{ color: '#22c55e', fontSize: '1.2rem' }}>✔</span> <strong>Holistic Development</strong>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem', background: 'white', borderRadius: '12px' }}>
                <span style={{ color: '#22c55e', fontSize: '1.2rem' }}>✔</span> <strong>Safe Hostel & Transport</strong>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem', background: 'white', borderRadius: '12px' }}>
                <span style={{ color: '#22c55e', fontSize: '1.2rem' }}>✔</span> <strong>Strong Basics Today</strong>
              </div>
            </div>

            <div style={{ marginTop: '4rem' }}>
              <h3 style={{ color: 'var(--accent)', fontSize: '2rem', marginBottom: '1rem' }}>Strong Basics Today...</h3>
              <h3 style={{ color: 'var(--primary)', fontSize: '2.2rem', marginBottom: '1.5rem' }}>Successful Future Tomorrow</h3>
              <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>Your child deserves the best school in Dharmavaram for a bright future.</p>
              <Link href="/admission" className="btn btn-primary btn-pulse" style={{ padding: '1.2rem 4rem', fontSize: '1.3rem' }}>
                Apply Now
              </Link>
            </div>
          </div>
        </section>
      </LazyLoad>

      {/* Contact Footer CTA */}
      <section className="section" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', marginTop: '2rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
            <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>📍 N.S Gate Road, Dharmavaram</p>
            <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>
              📧 <a href="mailto:rvschoold@gmail.com" className="text-accent" style={{ textDecoration: 'underline' }}>rvschoold@gmail.com</a> | 🌐 <a href="http://www.rishividyalaya.in" target="_blank" className="text-accent" style={{ textDecoration: 'underline' }}>www.rishividyalaya.in</a>
            </p>
            <p style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--primary)' }}>
              📞 +91-90634 66944 / 45 / 41
            </p>
          </div>
        </div>
      </section>

      <LazyLoad rootMargin="100px 0px">
        <SocialFeed />
      </LazyLoad>
    </div>
  );
}

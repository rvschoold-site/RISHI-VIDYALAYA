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
            <span className="badge-premium animate-fade-in" style={{ marginBottom: '1rem', display: 'inline-block' }}>First Time in the Region</span>
            <h1 className="animate-fade-in">Rishi Vidyalaya</h1>
            <h2 className="animate-fade-in" style={{ fontSize: '1.5rem', fontWeight: '500', color: 'rgba(255,255,255,0.9)', marginBottom: '1.5rem' }}>
              Best School in Dharmavaram | IIT-NEET Foundation School
            </h2>
            <p className="animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0, fontSize: '1.1rem', maxWidth: '700px' }}>
              AC Campus | 2 Acres Playground | Green Hostel | IIT–NEET Foundation | AI & Robotics
            </p>
            <div className={styles.ctaGroup} style={{ animationDelay: '0.4s', opacity: 0, animation: 'fadeIn 0.6s ease-out forwards', marginTop: '2rem' }}>
              <Link href="/admission" className="btn btn-primary btn-pulse" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                Admission Open 2026-27
              </Link>
              <Link href="/contact" className="btn btn-outline" style={{ backgroundColor: 'transparent', color: 'white', borderColor: 'white', padding: '1rem 2rem', fontSize: '1.1rem' }}>
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
            <span style={{ color: 'var(--accent)', fontSize: '1.5rem' }}>✔</span> <span>AI & Robotics Lab</span>
          </div>
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
              <div className="card-premium">
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div className="icon-circle">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                  </div>
                  <div>
                    <h3>Back to Basics Approach</h3>
                    <p>Strong fundamentals for careers like IIT, NEET, IAS, IPS, and government jobs. Focus on concept clarity and deep understanding.</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="card-premium">
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div className="icon-circle">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                  </div>
                  <div>
                    <h3>IIT–NEET Foundation</h3>
                    <p>Early preparation with a structured academic roadmap. Developing analytical thinking and problem-solving skills from middle school.</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="card-premium">
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div className="icon-circle">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  </div>
                  <div>
                    <h3>Individual Attention</h3>
                    <p>Step-by-step learning system tailored for every student. Regular performance tracking and transparent communication with parents.</p>
                  </div>
                </div>
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
                <span className="text-accent" style={{ fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px' }}>Innovation</span>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Future-Ready Learning</h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                  We are leading the way as the best school with AI & Robotics in Dharmavaram, providing students with tools to excel in the digital age.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ color: 'var(--accent)', marginTop: '4px' }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg></div>
                    <div>
                      <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>AI & Robotics Lab</h4>
                      <p>Hands-on learning with real-time projects, coding, and automation.</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ color: 'var(--accent)', marginTop: '4px' }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2v20M2 12h20"></path></svg></div>
                    <div>
                      <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Space Lab</h4>
                      <p>Unique focus on space science and astronomy through models and experiments.</p>
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
                  <p>Cricket, football, volleyball, and athletics. Promoting fitness, teamwork, and discipline.</p>
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
                  <h3>AC Smart Classrooms</h3>
                  <p>Digital learning environment that improves concentration and productivity.</p>
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
                  <p>Eco-friendly, peaceful, and safe environment for healthy learning.</p>
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
                <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '1.5rem' }}>Holistic Development</h2>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>
                  Preparing students for life, not just for exams. Our programs build discipline, leadership, and responsibility.
                </p>
                <div style={{ marginTop: '2rem' }}>
                  <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <h4 style={{ color: 'var(--accent)' }}>Co-Curricular Activities</h4>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>Sports, arts, music, and cultural programs for personality development.</p>
                  </div>
                  <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <h4 style={{ color: 'var(--accent)' }}>Junior Red Cross</h4>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>Building leadership through first aid and emergency awareness training.</p>
                  </div>
                  <div style={{ padding: '1rem' }}>
                    <h4 style={{ color: 'var(--accent)' }}>Top Performing School</h4>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>Celebrating student success and encouraging diverse talents.</p>
                  </div>
                </div>
              </div>
              <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden' }}>
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

      {/* Residential & Facilities */}
      <LazyLoad rootMargin="300px 0px">
        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2>Best Residential & Day School</h2>
              <p>Premium Facilities for Comfort and Growth</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
              <div style={{ padding: '2rem', backgroundColor: 'var(--bg-card)', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)' }}>
                <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Green Hostel Facility</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '0.5rem' }}><span style={{ color: 'var(--accent)' }}>✔</span> Separate green hostel campus</li>
                  <li style={{ marginBottom: '0.5rem' }}><span style={{ color: 'var(--accent)' }}>✔</span> Safe, secure, and well-maintained</li>
                  <li style={{ marginBottom: '0.5rem' }}><span style={{ color: 'var(--accent)' }}>✔</span> Nutritious food & caring supervision</li>
                </ul>
              </div>
              <div style={{ padding: '2rem', backgroundColor: 'var(--bg-card)', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)' }}>
                <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Reliable Transportation</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '0.5rem' }}><span style={{ color: 'var(--accent)' }}>✔</span> Covers Dharmavaram & nearby areas</li>
                  <li style={{ marginBottom: '0.5rem' }}><span style={{ color: 'var(--accent)' }}>✔</span> Safe and convenient daily commute</li>
                  <li style={{ marginBottom: '0.5rem' }}><span style={{ color: 'var(--accent)' }}>✔</span> Trained staff for student safety</li>
                </ul>
              </div>
              <div style={{ padding: '2rem', backgroundColor: 'var(--bg-card)', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)' }}>
                <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Trusted Recognitions</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '0.5rem' }}><span style={{ color: 'var(--accent)' }}>✔</span> First ISO-certified school in region</li>
                  <li style={{ marginBottom: '0.5rem' }}><span style={{ color: 'var(--accent)' }}>✔</span> National-level awards in education</li>
                  <li style={{ marginBottom: '0.5rem' }}><span style={{ color: 'var(--accent)' }}>✔</span> Consistent top academic results</li>
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
              <h3 style={{ color: 'var(--accent)', fontSize: '2rem', marginBottom: '1rem' }}>Successful Future Tomorrow</h3>
              <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Your child deserves the best school in Dharmavaram for a bright future.</p>
              <Link href="/admission" className="btn btn-primary btn-pulse" style={{ padding: '1.2rem 4rem', fontSize: '1.3rem' }}>
                Apply Now
              </Link>
            </div>
          </div>
        </section>
      </LazyLoad>

      {/* Contact Footer CTA */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <p>N.S Gate road, Opp: Tidco Houses, Dharmavaram.</p>
            <p>+91 9063466944, 9063466945 | rvschoold@gmail.com</p>
            <p>www.rishividyalaya.in</p>
          </div>
        </div>
      </section>
      <LazyLoad rootMargin="100px 0px">
        <SocialFeed />
      </LazyLoad>
    </div>
  );
}

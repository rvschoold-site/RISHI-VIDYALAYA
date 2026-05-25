import React from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Image from 'next/image';
import LazyLoad from '@/components/LazyLoad';
import SocialFeed from '@/components/SocialFeed';
import HeroSlideshow from '@/components/HeroSlideshow';
import { 
  BookOpen, 
  Award, 
  Cpu, 
  Check, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <HeroSlideshow />

        <div className={styles.heroOverlay}></div>
        
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroTextContent}>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }} className="animate-fade-in">
                <span className="badge-premium-hero">Certified ISO 9001:2015 School</span>
              </div>
              <h1 className="animate-fade-in">Rishi Vidyalaya</h1>
              <h2 className="animate-fade-in">To be Affiliated to CBSE</h2>
              <h3>Residential | Semi-Residential | Day School</h3>
              <p className="animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0 }}>
                Dharmavaram's premier institution blending core educational fundamentals with future-focused technology and integrated preparation roadmaps.
              </p>
              
              <div className={styles.ctaGroup}>
                <Link href="/admission" className="btn btn-primary btn-pulse" style={{ padding: '1rem 2.5rem', fontSize: '1.05rem' }}>
                  Apply Online 2026-27
                </Link>
                <Link href="/contact" className="btn btn-outline" style={{ backgroundColor: 'transparent', color: 'white', borderColor: 'white', padding: '1rem 2.5rem', fontSize: '1.05rem' }}>
                  Enquire Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Highlights Bar */}
      <section className={styles.highlightsBar}>
        <div className="container">
          <div className={styles.highlightsInner}>
            <div className={styles.highlightItem}>
              <div className={styles.highlightIcon}><Check size={16} /></div>
              <span>Concept-Based Learning</span>
            </div>
            <div className={styles.highlightItem}>
              <div className={styles.highlightIcon}><Check size={16} /></div>
              <span>AC Smart Classrooms</span>
            </div>
            <div className={styles.highlightItem}>
              <div className={styles.highlightIcon}><Check size={16} /></div>
              <span>2 Acres Sports Playground</span>
            </div>
            <div className={styles.highlightItem}>
              <div className={styles.highlightIcon}><Check size={16} /></div>
              <span>AI, Robotics & Space Labs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Academic Pillars */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <span className="badge-premium" style={{ marginBottom: '1rem' }}>Academic Pillars</span>
              <h2>Nurturing Minds For A Bright Future</h2>
              <p>Consistently structured to build deep conceptual clarity, competitive excellence, and digital intelligence.</p>
            </div>
          </Reveal>

          <div className="grid3" style={{ marginTop: '3rem' }}>
            {/* Pillar 1 */}
            <Reveal delay={0.1}>
              <div className={styles.pillarCard}>
                <div className={styles.pillarCardIcon}>
                  <BookOpen size={28} />
                </div>
                <h3>Back to Basics</h3>
                <p>Focusing on robust basic understanding. First time introduced in the region, designed for comprehensive concept retention.</p>
                <ul className={styles.pillarList}>
                  <li><span className={styles.pillarCheck}>✔</span> Concept-based teaching methods</li>
                  <li><span className={styles.pillarCheck}>✔</span> Focus on individual skills development</li>
                  <li><span className={styles.pillarCheck}>✔</span> Encouragement of critical thinking skills</li>
                </ul>
              </div>
            </Reveal>

            {/* Pillar 2 */}
            <Reveal delay={0.2}>
              <div className={styles.pillarCard}>
                <div className={styles.pillarCardIcon}>
                  <Award size={28} />
                </div>
                <h3>IIT-NEET Foundation</h3>
                <p>Integrated competitive coaching structure starting from early grades to prepare students for national level exams.</p>
                <ul className={styles.pillarList}>
                  <li><span className={styles.pillarCheck}>✔</span> Early preparation roadmaps & benchmarks</li>
                  <li><span className={styles.pillarCheck}>✔</span> Strong analytical focus & problems solving</li>
                  <li><span className={styles.pillarCheck}>✔</span> Tailored coaching for high achievements</li>
                </ul>
              </div>
            </Reveal>

            {/* Pillar 3 */}
            <Reveal delay={0.3}>
              <div className={styles.pillarCard}>
                <div className={styles.pillarCardIcon}>
                  <Cpu size={28} />
                </div>
                <h3>Future Innovation</h3>
                <p>Equipping students with modern hands-on tech labs to excel and build creativity in the digital economy.</p>
                <ul className={styles.pillarList}>
                  <li><span className={styles.pillarCheck}>✔</span> First in region AI & Robotics lab projects</li>
                  <li><span className={styles.pillarCheck}>✔</span> Space Lab astronomy models & experiments</li>
                  <li><span className={styles.pillarCheck}>✔</span> Digi Fest showcases for digital presentation</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Vision Split Spotlight */}
      <section className="section" style={{ backgroundColor: 'var(--bg-card)', borderTop: '1px solid rgba(0,0,0,0.02)', borderBottom: '1px solid rgba(0,0,0,0.02)' }}>
        <div className="container">
          <div className={styles.splitGrid}>
            <Reveal>
              <div className={styles.splitContent}>
                <span className="badge-premium" style={{ marginBottom: '1rem', width: 'fit-content' }}>Vision & Philosophy</span>
                <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                  Preparing Children to Become Achievers
                </h2>
                <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
                  At Rishi Vidyalaya, we prepare your children to become <strong>IITians, doctors, civil servants (IAS/IPS), CA professionals, and technology leaders</strong>. Our pedagogy bridges traditional basics with future innovation.
                </p>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: '1.8' }}>
                  We hold the distinction of being the first school in Dharmavaram with fully air-conditioned smart classrooms and ISO 9001:2015 educational standard certification, offering unmatched administrative care.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Link href="/about" className="btn btn-primary" style={{ gap: '0.5rem', display: 'flex', alignItems: 'center' }}>
                    <span>Learn More About Us</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={0.2}>
              <div className={styles.splitImageWrapper}>
                <Image 
                  src="https://rishividalaya.s3.ap-southeast-2.amazonaws.com/gallery/1779703713806-PURPOSE-1.JPG.jpeg" 
                  alt="Digi Fest Innovation at Rishi Vidyalaya" 
                  fill 
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
                  sizes="(max-width: 1024px) 100vw, 500px" 
                  style={{ objectFit: 'cover' }} 
                />
                <div className={styles.splitImageText}>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.25rem' }}>Practical Tech Projects</h4>
                  <p style={{ fontSize: '0.85rem', opacity: 0.9 }}>Digi Fest provides a platform for hands-on creativity and science experiments.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Campus & Infrastructure */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <span className="badge-premium" style={{ marginBottom: '1rem' }}>Campus Infrastructure</span>
              <h2>World-Class Facilities in Dharmavaram</h2>
              <p>Ensuring an inspiring environment where physical health, comfort, and safety are fully prioritized.</p>
            </div>
          </Reveal>

          <div className="grid3" style={{ marginTop: '3rem' }}>
            {/* Facility 1 */}
            <Reveal delay={0.1}>
              <div className={styles.facilityCard}>
                <div className={styles.facilityImageWrapper}>
                  <Image 
                    src="https://rishividalaya.s3.ap-southeast-2.amazonaws.com/gallery/1779703708523-PASSION.JPG.jpeg" 
                    alt="AC Smart Classrooms" 
                    fill 
                    quality={75}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
                    sizes="(max-width: 768px) 100vw, 380px" 
                    style={{ objectFit: 'cover' }} 
                  />
                </div>
                <div className={styles.facilityBody}>
                  <h3>AC Smart Classrooms</h3>
                  <p>Equipped with smart boards and air conditioning to offer distraction-free learning environments.</p>
                  <ul className={styles.facilityList}>
                    <li><span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>✔</span> Digital board classrooms</li>
                    <li><span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>✔</span> Comfortable climate control</li>
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Facility 2 */}
            <Reveal delay={0.2}>
              <div className={styles.facilityCard}>
                <div className={styles.facilityImageWrapper}>
                  <Image 
                    src="https://rishividalaya.s3.ap-southeast-2.amazonaws.com/gallery/1779703703401-ground.JPG" 
                    alt="2 Acres Playground" 
                    fill 
                    quality={75}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
                    sizes="(max-width: 768px) 100vw, 380px" 
                    style={{ objectFit: 'cover' }} 
                  />
                </div>
                <div className={styles.facilityBody}>
                  <h3>2 Acres Play Area</h3>
                  <p>Spacious sports arena for physical fitness activities, cricket, football, athletics, and teamwork development.</p>
                  <ul className={styles.facilityList}>
                    <li><span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>✔</span> Dynamic coaching & fitness training</li>
                    <li><span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>✔</span> Multiple outdoor and indoor games</li>
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Facility 3 */}
            <Reveal delay={0.3}>
              <div className={styles.facilityCard}>
                <div className={styles.facilityImageWrapper}>
                  <Image 
                    src="https://rishividalaya.s3.ap-southeast-2.amazonaws.com/gallery/1779703711717-PERFRCTION-1.JPG.jpeg" 
                    alt="Hostel & Facilities" 
                    fill 
                    quality={75}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
                    sizes="(max-width: 768px) 100vw, 380px" 
                    style={{ objectFit: 'cover' }} 
                  />
                </div>
                <div className={styles.facilityBody}>
                  <h3>Hostel & Transport</h3>
                  <p>Dedicated secure green hostel campus with separate wings for boys/girls and comprehensive bus routes.</p>
                  <ul className={styles.facilityList}>
                    <li><span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>✔</span> Safe residential environment & care</li>
                    <li><span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>✔</span> Wide daily school commute transport</li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Unified Admissions CTA Banner */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className={styles.admissionBanner}>
              <div className={styles.admissionBannerContent}>
                <span className="badge-premium-hero" style={{ marginBottom: '1.5rem' }}>Enroll Now</span>
                <h2>Admissions Open for 2026-27</h2>
                <p>
                  Provide your children with the academic foundation they deserve. Let them learn, innovate, and grow in the region's top concept-based school.
                </p>
                <div className={styles.admissionBannerButtons}>
                  <Link href="/admission" className="btn btn-primary btn-pulse" style={{ padding: '1rem 3rem' }}>
                    Apply For Admission
                  </Link>
                  <Link href="/contact" className="btn btn-outline" style={{ borderColor: 'white', color: 'white', padding: '1rem 3rem' }}>
                    Contact Office
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Location Footer CTA */}
      <section className="section" style={{ borderTop: '1px solid rgba(0,0,0,0.04)', paddingBottom: '3rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <Reveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
              <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>📍 N.S Gate Road, Dharmavaram</p>
              <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>
                📧 <a href="mailto:rvschoold@gmail.com" className="text-accent" style={{ textDecoration: 'underline' }}>rvschoold@gmail.com</a> | 🌐 <a href="http://www.rishividyalaya.in" target="_blank" className="text-accent" style={{ textDecoration: 'underline' }}>www.rishividyalaya.in</a>
              </p>
              <p style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--primary)' }}>
                📞 +91-90634 66944 / 45 / 41
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Social Feed Wall */}
      <LazyLoad rootMargin="100px 0px">
        <SocialFeed />
      </LazyLoad>
    </div>
  );
}

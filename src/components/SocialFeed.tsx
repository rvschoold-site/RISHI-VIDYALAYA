'use client';

import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa6';
import styles from './SocialFeed.module.css';
import Reveal from './Reveal';

export default function SocialFeed() {
  return (
    <section className={styles.socialFeed}>
      <div className={styles.container}>
        <Reveal>
          <div className={styles.header}>
            <h2>Social Media Wall</h2>
            <p>Stay connected with the daily life and achievements at Rishi Vidyalaya directly through our social feeds.</p>
          </div>
        </Reveal>

        <div className={styles.grid}>
          {/* Facebook Embed */}
            <div className={styles.embedCard}>
              <div className={styles.embedHeader}>
                <div className={`${styles.iconCircle} ${styles.facebook}`}>
                  <FaFacebookF />
                </div>
                <h3>Facebook Feed</h3>
              </div>
              <div className={styles.iframeWrapper}>
                <iframe 
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61572273309577&tabs=timeline&width=360&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=776730922422337" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 'none', overflow: 'hidden' }} 
                  scrolling="no" 
                  frameBorder="0" 
                  allowFullScreen={true} 
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="Rishi Vidyalaya Facebook"
                  loading="lazy"
                ></iframe>
              </div>
            </div>

          {/* Instagram Section (Enhanced) */}
          <Reveal delay={0.2}>
            <div className={styles.embedCard}>
              <div className={styles.embedHeader}>
                <div className={`${styles.iconCircle} ${styles.instagram}`}>
                  <FaInstagram />
                </div>
                <h3>Instagram Feed</h3>
              </div>
              <div className={styles.iframeWrapper}>
                <div className={styles.placeholder}>
                  <div style={{ fontSize: '4rem', marginBottom: '1.5rem', opacity: 0.1 }}>📸</div>
                  <p>Follow our daily journey on Instagram. View the latest highlights, events, and student achievements.</p>
                  <a 
                    href="https://www.instagram.com/rishi_vidyalaya?igsh=MXhmdHpkcXZ0NzVpbQ==" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.visitBtn}
                  >
                    Connect on Instagram
                  </a>
                  <div style={{ marginTop: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', width: '100%' }}>
                    {[1,2,3,4,5,6].map(i => (
                      <div key={i} style={{ aspectRatio: '1/1', background: '#f1f5f9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: '#cbd5e1' }}>
                        📸
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

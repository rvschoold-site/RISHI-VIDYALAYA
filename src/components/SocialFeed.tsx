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
          <Reveal delay={0.1}>
            <div className={styles.embedCard}>
              <div className={styles.embedHeader}>
                <div className={`${styles.iconCircle} ${styles.facebook}`}>
                  <FaFacebookF />
                </div>
                <h3>Facebook Feed</h3>
              </div>
              <div className={styles.iframeWrapper}>
                <iframe 
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61572273309577&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 'none', overflow: 'hidden' }} 
                  scrolling="no" 
                  frameBorder="0" 
                  allowFullScreen={true} 
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="Rishi Vidyalaya Facebook"
                ></iframe>
              </div>
            </div>
          </Reveal>

          {/* Instagram Section (Link with Preview) */}
          <Reveal delay={0.2}>
            <div className={styles.embedCard}>
              <div className={styles.embedHeader}>
                <div className={`${styles.iconCircle} ${styles.instagram}`}>
                  <FaInstagram />
                </div>
                <h3>Instagram</h3>
              </div>
              <div className={styles.iframeWrapper}>
                <div className={styles.placeholder}>
                  <div style={{ fontSize: '4rem', marginBottom: '1.5rem', opacity: 0.1 }}>📸</div>
                  <p>Check out our latest photos and stories on Instagram. Follow us to stay updated with campus life!</p>
                  <a 
                    href="https://www.instagram.com/rishi_vidyalaya?igsh=MXhmdHpkcXZ0NzVpbQ==" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.visitBtn}
                  >
                    View Instagram Profile
                  </a>
                  <div style={{ marginTop: '2rem', display: 'flex', gap: '0.5rem' }}>
                    {[1,2,3,4].map(i => (
                      <div key={i} style={{ width: '60px', height: '60px', background: '#f1f5f9', borderRadius: '8px' }}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* YouTube Embed */}
          <Reveal delay={0.3}>
            <div className={styles.embedCard}>
              <div className={styles.embedHeader}>
                <div className={`${styles.iconCircle} ${styles.youtube}`}>
                  <FaYoutube />
                </div>
                <h3>YouTube Channel</h3>
              </div>
              <div className={styles.iframeWrapper}>
                <iframe 
                  src="https://www.youtube.com/embed?listType=user_uploads&list=rishividyalaya" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 'none' }} 
                  allowFullScreen={true}
                  title="Rishi Vidyalaya YouTube"
                ></iframe>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

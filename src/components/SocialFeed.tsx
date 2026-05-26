'use client';

import React from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa6';
import styles from './SocialFeed.module.css';
import Reveal from './Reveal';

/**
 * SocialFeed component that displays embedded Facebook and Instagram feeds.
 * Facebook uses the native Page Plugin iframe.
 * Instagram uses the Elfsight Instagram Feed widget.
 */
export default function SocialFeed() {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);

    // Load Elfsight platform script
    if (!document.querySelector('script[src="https://static.elfsight.com/platform/platform.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://static.elfsight.com/platform/platform.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

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
                {isMounted && (
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
                )}
                {!isMounted && (
                  <div className={styles.placeholder} style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p style={{ color: '#94a3b8' }}>Loading Social Feed...</p>
                  </div>
                )}
              </div>
            </div>

          {/* Instagram Feed via Elfsight */}
          <Reveal delay={0.2}>
            <div className={styles.embedCard}>
              <div className={styles.embedHeader}>
                <div className={`${styles.iconCircle} ${styles.instagram}`}>
                  <FaInstagram />
                </div>
                <h3>Instagram Feed</h3>
              </div>
              <div className={styles.iframeWrapper}>
                {isMounted ? (
                  <div
                    className="elfsight-app-28b885a3-2d05-4bcf-a9c3-7fa0013882c9"
                    data-elfsight-app-lazy
                    style={{ width: '100%', height: '100%' }}
                  ></div>
                ) : (
                  <div className={styles.placeholder} style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p style={{ color: '#94a3b8' }}>Loading Instagram Feed...</p>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}



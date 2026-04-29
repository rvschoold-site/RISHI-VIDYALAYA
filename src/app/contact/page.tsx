'use client';

import React, { useState, useEffect } from 'react';
import styles from './contact.module.css';
import Reveal from '@/components/Reveal';
import { Mail, Phone, MapPin, Globe, MessageSquare, Send } from 'lucide-react';

export default function Contact() {
  const [settings, setSettings] = useState<any>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success) setSettings(data.data);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call for contact message
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const contactCards = [
    {
      icon: <Phone size={24} />,
      title: 'Call Us',
      value: settings.CONTACT_PHONE || '+91 90634 66944',
      link: `tel:${settings.CONTACT_PHONE}`
    },
    {
      icon: <Mail size={24} />,
      title: 'Email Us',
      value: settings.CONTACT_EMAIL || 'rvschoold@gmail.com',
      link: `mailto:${settings.CONTACT_EMAIL}`
    },
    {
      icon: <MapPin size={24} />,
      title: 'Visit Us',
      value: 'N.S Gate road, Opp: Tidco Houses, Dharmavaram',
      link: 'https://maps.google.com'
    }
  ];

  return (
    <div className={styles.contactContainer}>
      <section className="page-hero" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '6rem 0' }}>
        <Reveal>
          <span className="badge-premium" style={{ marginBottom: '1rem', display: 'inline-block' }}>Get In Touch</span>
          <h1 style={{ color: 'white', fontSize: '3.5rem', fontWeight: 800 }}>Contact Rishi Vidyalaya</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
            Have questions? We're here to help you on your educational journey.
          </p>
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.cardGrid}>
            {contactCards.map((card, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <a href={card.link} className={styles.infoCard}>
                  <div className={styles.iconCircle}>{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.value}</p>
                </a>
              </Reveal>
            ))}
          </div>

          <div className={styles.mainWrapper}>
            <div className={styles.formSide}>
              <Reveal>
                <div className={styles.formHeader}>
                  <MessageSquare size={32} className="text-accent" />
                  <h2>Send us a Message</h2>
                  <p>Fill out the form below and our team will get back to you within 24 hours.</p>
                </div>

                {status === 'success' ? (
                  <div className={styles.successMessage}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                    <h3>Message Sent!</h3>
                    <p>Thank you for contacting us. We'll be in touch soon.</p>
                    <button onClick={() => setStatus('idle')} className="btn btn-outline" style={{ marginTop: '1.5rem' }}>Send Another</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label>Your Name</label>
                        <input 
                          type="text" required
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          placeholder="Full Name"
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Email Address</label>
                        <input 
                          type="email" required
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Subject</label>
                      <input 
                        type="text" required
                        value={formData.subject}
                        onChange={e => setFormData({...formData, subject: e.target.value})}
                        placeholder="What is this regarding?"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Message</label>
                      <textarea 
                        rows={5} required
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                        placeholder="Tell us more about your inquiry..."
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={status === 'loading'} style={{ width: '100%', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                      {status === 'loading' ? 'Sending...' : (
                        <>
                          <span>Send Message</span>
                          <Send size={18} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </Reveal>
            </div>

            <div className={styles.mapSide}>
              <Reveal delay={0.3}>
                <div className={styles.mapContainer}>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30917.68608174432!2d77.67670250282521!3d14.386139433364058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb14371bc9bf393%3A0xc8a2201ad23ba3a!2sRishi%20Vidyalaya!5e0!3m2!1sen!2sin!4v1777455733780!5m2!1sen!2sin"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Rishi Vidyalaya Location"
                  ></iframe>
                </div>
                
                <div className={styles.quickContact}>
                  <h3>Quick Support</h3>
                  <p>Our office is open from 9:00 AM to 5:30 PM (Mon-Sat).</p>
                  <div className={styles.socialRow}>
                    <Globe size={18} /> <span>www.rishividyalaya.in</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

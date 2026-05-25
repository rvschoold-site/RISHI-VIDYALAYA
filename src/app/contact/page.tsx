'use client';

import React, { useState, useEffect } from 'react';
import styles from './contact.module.css';
import Reveal from '@/components/Reveal';
import { Mail, Phone, MapPin, Clock, Send, Loader2, CheckCircle } from 'lucide-react';

/**
 * Contact page – clean, professional layout.
 * Info strip → two-column (form + map/details) → office hours.
 */
export default function Contact() {
  const [settings, setSettings] = useState<any>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success) setSettings(data.data);
      })
      .catch(() => {});
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // Simulate sending — replace with real API when ready
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 1200);
  };

  const phone = settings.CONTACT_PHONE || '+91 90634 66944';
  const email = settings.CONTACT_EMAIL || 'rvschoold@gmail.com';

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className="page-hero">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Reach out for admissions, careers, or general inquiries.</p>
      </div>

      {/* Contact Info Strip */}
      <section className={styles.infoStrip}>
        <div className={`container ${styles.infoGrid}`}>
          <Reveal delay={0}>
            <a href={`tel:${phone}`} className={styles.infoItem}>
              <div className={styles.infoIcon}><Phone size={20} /></div>
              <div>
                <span className={styles.infoLabel}>Phone</span>
                <span className={styles.infoValue}>{phone}</span>
              </div>
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <a href={`mailto:${email}`} className={styles.infoItem}>
              <div className={styles.infoIcon}><Mail size={20} /></div>
              <div>
                <span className={styles.infoLabel}>Email</span>
                <span className={styles.infoValue}>{email}</span>
              </div>
            </a>
          </Reveal>
          <Reveal delay={0.2}>
            <a href="https://maps.app.goo.gl/rishividyalaya" target="_blank" rel="noopener noreferrer" className={styles.infoItem}>
              <div className={styles.infoIcon}><MapPin size={20} /></div>
              <div>
                <span className={styles.infoLabel}>Address</span>
                <span className={styles.infoValue}>N.S Gate Road, Opp: Tidco Houses, Dharmavaram</span>
              </div>
            </a>
          </Reveal>
          <Reveal delay={0.3}>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}><Clock size={20} /></div>
              <div>
                <span className={styles.infoLabel}>Office Hours</span>
                <span className={styles.infoValue}>Mon – Sat, 9:00 AM – 5:30 PM</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container">
          <div className={styles.mainGrid}>

            {/* Form */}
            <Reveal>
              <div className={styles.formCard}>
                <h2 className={styles.formTitle}>Send a Message</h2>
                <p className={styles.formSubtitle}>Fill out the form and we'll get back to you within 24 hours.</p>

                {status === 'success' ? (
                  <div className={styles.successBox}>
                    <CheckCircle size={40} />
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out. Our team will respond shortly.</p>
                    <button onClick={() => setStatus('idle')} className={styles.btnOutline}>Send Another</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.row}>
                      <div className={styles.field}>
                        <label htmlFor="name">Full Name *</label>
                        <input id="name" name="name" type="text" required placeholder="Your name" value={formData.name} onChange={handleChange} />
                      </div>
                      <div className={styles.field}>
                        <label htmlFor="email">Email *</label>
                        <input id="email" name="email" type="email" required placeholder="email@example.com" value={formData.email} onChange={handleChange} />
                      </div>
                    </div>
                    <div className={styles.row}>
                      <div className={styles.field}>
                        <label htmlFor="phone">Phone</label>
                        <input id="phone" name="phone" type="tel" placeholder="+91 00000 00000" value={formData.phone} onChange={handleChange} />
                      </div>
                      <div className={styles.field}>
                        <label htmlFor="subject">Subject *</label>
                        <select id="subject" name="subject" required value={formData.subject} onChange={handleChange}>
                          <option value="">Select a topic</option>
                          <option value="Admissions">Admissions</option>
                          <option value="Academics">Academics</option>
                          <option value="Careers">Careers</option>
                          <option value="General">General Inquiry</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="message">Message *</label>
                      <textarea id="message" name="message" rows={5} required placeholder="How can we help you?" value={formData.message} onChange={handleChange} />
                    </div>
                    <button type="submit" className={styles.btnSubmit} disabled={status === 'loading'}>
                      {status === 'loading' ? (
                        <><Loader2 size={18} className="animate-spin" /> Sending...</>
                      ) : (
                        <><Send size={18} /> Send Message</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>

            {/* Map + Details */}
            <div className={styles.rightCol}>
              <Reveal delay={0.2}>
                <div className={styles.mapWrapper}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30917.68608174432!2d77.67670250282521!3d14.386139433364058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb14371bc9bf393%3A0xc8a2201ad23ba3a!2sRishi%20Vidyalaya!5e0!3m2!1sen!2sin!4v1777455733780!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Rishi Vidyalaya Location"
                  />
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className={styles.detailsCard}>
                  <h3>Rishi Vidyalaya</h3>
                  <p>N.S Gate Road, Opp: Tidco Houses,<br />Dharmavaram, Andhra Pradesh</p>
                  <div className={styles.detailRow}>
                    <Phone size={15} /> <span>{phone}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <Mail size={15} /> <span>{email}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <Clock size={15} /> <span>Mon – Sat, 9:00 AM – 5:30 PM</span>
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

'use client';
import React, { useState } from 'react';
import styles from './contact.module.css';
import Reveal from '@/components/Reveal';

export default function Contact() {
  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    email: '',
    phone: '',
    grade: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (formData.parentName.length < 2) newErrors.parentName = 'Parent name is too short';
    if (formData.studentName.length < 2) newErrors.studentName = 'Student name is too short';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (formData.phone.length < 10) newErrors.phone = 'Phone number must be at least 10 digits';
    if (!formData.grade) newErrors.grade = 'Grade is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    if (errors[id]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('loading');
    setErrors({});

    try {
      const res = await fetch('/api/admissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors && Array.isArray(data.errors)) {
          const backendErrors: Record<string, string> = {};
          data.errors.forEach((err: any) => {
            const field = err.path.split('.').pop();
            backendErrors[field] = err.message;
          });
          setErrors(backendErrors);
          throw new Error('Validation failed');
        }
        throw new Error(data.message || 'Failed to submit form');
      }
      
      setStatus('success');
      setFormData({ parentName: '', studentName: '', email: '', phone: '', grade: '' });
    } catch (error: any) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <div className={styles.container}>
      <div className="page-hero">
        <h1>Contact Information</h1>
        <p>How to get in touch with us.</p>
      </div>
      <section className="section">
        <Reveal>
          <div className="section-header">
            <h2>Get in Touch</h2>
            <p>We're here to answer any questions you might have about Rishi Vidyalaya.</p>
          </div>
        </Reveal>
        <div className={styles.contactWrapper}>
          <Reveal delay={0.1}>
            <div className={styles.contactInfo}>
              <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Mailing Address</h2>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <p style={{ margin: 0 }}>N.S Gate road, Opp: Tidco Houses, Dharmavaram.</p>
              </div>
              
              <h2 style={{ color: 'var(--primary)', margin: '1.5rem 0 1rem' }}>Contact Details</h2>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <p style={{ margin: 0 }}>+91 9063466944, +91 9063466945</p>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <p style={{ margin: 0 }}>rvschoold@gmail.com</p>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                <p style={{ margin: 0 }}>www.rishividyalaya.in</p>
              </div>

              <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--accent)' }}>
                <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Admissions Open!</h3>
                <p style={{ margin: 0 }}>Give your child the best start in life. Enroll today!</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className={styles.contactForm}>
            <h2>Admission Form</h2>
            {status === 'success' ? (
              <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#d1fae5', color: '#065f46', borderRadius: '8px' }}>
                <h3 style={{ marginBottom: '1rem', color: '#065f46' }}>Success!</h3>
                <p>Your application inquiry has been submitted. Our team will contact you shortly.</p>
                <button onClick={() => setStatus('idle')} className="btn btn-outline" style={{ marginTop: '1rem', borderColor: '#065f46', color: '#065f46' }}>Submit Another</button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.formGroup}>
                  <label htmlFor="parentName">Parent/Guardian Name</label>
                  <input type="text" id="parentName" value={formData.parentName} onChange={handleChange} placeholder="Parent Name" className={errors.parentName ? styles.inputError : ''} />
                  {errors.parentName && <span className={styles.errorMessage}>{errors.parentName}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="studentName">Student Name</label>
                  <input type="text" id="studentName" value={formData.studentName} onChange={handleChange} placeholder="Student Name" className={errors.studentName ? styles.inputError : ''} />
                  {errors.studentName && <span className={styles.errorMessage}>{errors.studentName}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className={errors.email ? styles.inputError : ''} />
                  {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" value={formData.phone} onChange={handleChange} placeholder="+91 xxxxxxxxxx" className={errors.phone ? styles.inputError : ''} />
                  {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="grade">Grade Applying For</label>
                  <input type="text" id="grade" value={formData.grade} onChange={handleChange} placeholder="e.g. Grade 5" className={errors.grade ? styles.inputError : ''} />
                  {errors.grade && <span className={styles.errorMessage}>{errors.grade}</span>}
                </div>
                {status === 'error' && <p style={{ color: 'var(--accent)', marginTop: '0.5rem', fontSize: '0.9rem' }}>Something went wrong. Please check the fields and try again.</p>}
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={status === 'loading'}>
                  {status === 'loading' ? 'Submitting...' : 'Submit Form'}
                </button>
              </form>
            )}
          </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--bg-card)', borderRadius: '24px' }}>
        <Reveal>
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Find quick answers to common queries.</p>
          </div>
        </Reveal>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Reveal delay={0.1}>
            <div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}><span style={{ color: 'var(--accent)' }}>Q.</span> What are the admission timings?</h3>
              <p style={{ color: 'var(--text-muted)' }}>The school office is open for admissions from 9:00 AM to 5:00 PM, Monday to Saturday.</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}><span style={{ color: 'var(--accent)' }}>Q.</span> Do you provide transport facilities?</h3>
              <p style={{ color: 'var(--text-muted)' }}>Yes, we provide safe, GPS-enabled bus transport facilities across Dharmavaram and surrounding areas.</p>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}><span style={{ color: 'var(--accent)' }}>Q.</span> Is there a hostel facility available?</h3>
              <p style={{ color: 'var(--text-muted)' }}>Yes, we offer both residential and semi-residential facilities with nutritious meals and 24/7 supervision.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import AdmissionForm from '@/components/AdmissionForm';
import styles from './admission.module.css';
import Reveal from '@/components/Reveal';

export const metadata = {
  title: 'Admission | Rishi Vidyalaya',
  description: 'Apply for admission at Rishi Vidyalaya. Enroll your child for excellence.',
};

export default function AdmissionPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <Reveal>
            <span className="badge-premium-hero" style={{ marginBottom: '1rem' }}>Admissions Open 2026-27</span>
            <h1>Start Your Journey with Us</h1>
            <p>Join the Rishi Vidyalaya family and give your child the best foundation for a successful future.</p>
          </Reveal>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className="container">
          <Reveal delay={0.2}>
            <AdmissionForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}

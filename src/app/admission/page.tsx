import React from 'react';
import AdmissionForm from '@/components/AdmissionForm';
import styles from './admission.module.css';

export const metadata = {
  title: 'Admission | Rishi Vidyalaya',
  description: 'Apply for admission at Rishi Vidyalaya. Enroll your child for excellence.',
};

const AdmissionPage = () => {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Start Your Journey with Us</h1>
          <p>Join the Rishi Vidyalaya family and give your child the best foundation for a successful future.</p>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className="container">
          <AdmissionForm />
        </div>
      </section>
    </main>
  );
};

export default AdmissionPage;

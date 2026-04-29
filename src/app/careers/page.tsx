'use client';

import React, { useState } from 'react';
import styles from './careers.module.css';
import Reveal from '@/components/Reveal';

export default function CareersPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    positionType: 'TEACHING',
    positionName: '',
    experience: '',
    qualification: '',
    coverLetter: '',
    subjects: [] as string[],
  });

  const subjectsList = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Social Studies', 
    'English', 'Telugu', 'Hindi', 'Sanskrit', 'Computer Science', 
    'AI & Robotics', 'Physical Education', 'Arts & Crafts', 'Music/Dance'
  ];

  const handleSubjectChange = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };
  const [resume, setResume] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'subjects') {
        (value as string[]).forEach(s => data.append('subjects', s));
      } else {
        data.append(key, value as string);
      }
    });
    if (resume) data.append('resume', resume);

    try {
      const response = await fetch('/api/careers', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Application submitted successfully! We will get back to you soon.' });
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          positionType: 'TEACHING',
          positionName: '',
          experience: '',
          qualification: '',
          coverLetter: '',
          subjects: [],
        });
        setResume(null);
        // Reset file input
        const fileInput = document.getElementById('resume') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        setStatus({ type: 'error', message: result.error || 'Failed to submit application.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'An unexpected error occurred. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.careersContainer}>
      <section className="page-hero">
        <Reveal>
          <h1>Build the Future of Education</h1>
          <p>Join a community of passionate educators and innovators dedicated to shaping the next generation of leaders.</p>
        </Reveal>
      </section>

      <section className="section">
        <div className="grid3">
          <Reveal delay={0.1}>
            <div className="card icon-float">
              <div className={styles.careerIcon}>🎓</div>
              <h3>Teaching Excellence</h3>
              <p>Empower students with knowledge. We seek experts in Mathematics, Sciences, Languages, and Humanities.</p>
              <ul className={styles.careerList}>
                <li>• Subject Matter Experts</li>
                <li>• Foundation Specialists (IIT/NEET)</li>
                <li>• AI & Robotics Mentors</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="card icon-float">
              <div className={styles.careerIcon}>🏛️</div>
              <h3>Operations & Support</h3>
              <p>Be the backbone of our institution. Opportunities in administration, finance, and IT support.</p>
              <ul className={styles.careerList}>
                <li>• Academic Coordinators</li>
                <li>• Admin Executives</li>
                <li>• Front Office Relations</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="card icon-float">
              <div className={styles.careerIcon}>✨</div>
              <h3>Professional Growth</h3>
              <p>We invest in our staff with regular workshops and a supportive environment for career advancement.</p>
              <ul className={styles.careerList}>
                <li>• Performance Bonuses</li>
                <li>• Health Benefits</li>
                <li>• Continuous Learning</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.5)', 
        backdropFilter: 'blur(10px)',
        borderRadius: '40px', 
        boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
        border: '1px solid rgba(255,255,255,0.3)'
      }}>
        <div className={styles.formWrapper}>
          <Reveal>
            <div className="section-header">
              <h2>Submit Your Application</h2>
              <p>Tell us about your skills and why you'd like to join Rishi Vidyalaya.</p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <form onSubmit={handleSubmit} className={styles.careersForm}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="John Doe"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="john@example.com"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Staff Category</label>
                  <select name="positionType" value={formData.positionType} onChange={handleInputChange}>
                    <option value="TEACHING">Teaching Staff</option>
                    <option value="NON_TEACHING">Non-Teaching Staff</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Desired Position</label>
                  <input 
                    type="text" 
                    name="positionName" 
                    value={formData.positionName} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="e.g. Senior Physics Teacher"
                  />
                </div>

                {formData.positionType === 'TEACHING' && (
                  <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                    <label>Subjects of Expertise</label>
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                      gap: '1rem',
                      background: '#F8FAFC',
                      padding: '1.5rem',
                      borderRadius: '14px',
                      marginTop: '0.5rem'
                    }}>
                      {subjectsList.map(subject => (
                        <label key={subject} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                          <input 
                            type="checkbox"
                            checked={formData.subjects.includes(subject)}
                            onChange={() => handleSubjectChange(subject)}
                            style={{ width: '18px', height: '18px', accentColor: 'var(--accent)' }}
                          />
                          {subject}
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div className={styles.formGroup}>
                  <label>Total Experience (Years)</label>
                  <input 
                    type="text" 
                    name="experience" 
                    value={formData.experience} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="e.g. 5 Years"
                  />
                </div>

                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                  <label>Highest Qualification</label>
                  <input 
                    type="text" 
                    name="qualification" 
                    value={formData.qualification} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="e.g. M.Sc Physics, B.Ed"
                  />
                </div>

                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                  <label>Upload Resume (PDF/DOCX)</label>
                  <div className={styles.fileInputWrapper}>
                    <input 
                      type="file" 
                      id="resume" 
                      onChange={handleFileChange} 
                      accept=".pdf,.doc,.docx" 
                      required 
                    />
                    <div className={styles.fileCustomUi}>
                      {resume ? `📄 ${resume.name}` : 'Click to select your resume'}
                    </div>
                  </div>
                </div>

                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                  <label>Brief Cover Letter (Optional)</label>
                  <textarea 
                    name="coverLetter" 
                    value={formData.coverLetter} 
                    onChange={handleInputChange} 
                    rows={4} 
                    placeholder="Tell us a bit about yourself and why you're a good fit..."
                  ></textarea>
                </div>
              </div>

              {status && (
                <div className={`${styles.formStatus} ${styles[status.type]}`}>
                  {status.message}
                </div>
              )}

              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button type="submit" className="btn btn-primary btn-pulse" disabled={loading} style={{ width: '100%', maxWidth: '400px' }}>
                  {loading ? 'Submitting Application...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

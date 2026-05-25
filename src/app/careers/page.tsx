'use client';

import React, { useState } from 'react';
import styles from './careers.module.css';
import Reveal from '@/components/Reveal';
import { 
  GraduationCap, 
  Building, 
  Sparkles, 
  Upload,
  User,
  Mail,
  Phone,
  Briefcase,
  FileText
} from 'lucide-react';

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
      {/* Page Hero */}
      <section className="page-hero">
        <Reveal>
          <h1>Build the Future of Education</h1>
          <p>Join a community of passionate educators and innovators dedicated to shaping the next generation of leaders.</p>
        </Reveal>
      </section>

      {/* Highlights/Benefits */}
      <section className="section">
        <div className="container">
          <div className="grid3">
            <Reveal delay={0.1}>
              <div className="card" style={{ height: '100%' }}>
                <div className={styles.benefitIcon}>
                  <GraduationCap size={28} />
                </div>
                <h3>Teaching Excellence</h3>
                <p>Empower students with basic concepts. We seek mentors in Mathematics, Sciences, Languages, and tech labs.</p>
                <ul className={styles.careerList}>
                  <li>• Subject Matter Specialists</li>
                  <li>• Early IIT/NEET Foundations mentors</li>
                  <li>• AI & Robotics Lab coaches</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="card" style={{ height: '100%' }}>
                <div className={styles.benefitIcon}>
                  <Building size={28} />
                </div>
                <h3>Administration & Care</h3>
                <p>Be the operational pillar. Professional options in front office, student hostel warden-care, and management.</p>
                <ul className={styles.careerList}>
                  <li>• Academic Coordinators</li>
                  <li>• Admissions & Public Relations</li>
                  <li>• Campus Operations Executives</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="card" style={{ height: '100%' }}>
                <div className={styles.benefitIcon}>
                  <Sparkles size={28} />
                </div>
                <h3>Growth Environment</h3>
                <p>We invest in our staff's development through periodic training sessions and clear appraisal milestones.</p>
                <ul className={styles.careerList}>
                  <li>• Professional Development Workshops</li>
                  <li>• Consistent Appraisal Roadmaps</li>
                  <li>• Collaborative & Caring Work Culture</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className={styles.formWrapper}>
            <Reveal>
              <div className="section-header">
                <span className="badge-premium" style={{ marginBottom: '1rem' }}>Apply Today</span>
                <h2>Submit Your Application</h2>
                <p>Tell us about your educational background and why you want to join the Rishi Vidyalaya family.</p>
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
                      placeholder="e.g. Ramesh Kumar"
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
                      placeholder="email@example.com"
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
                      placeholder="10-digit number"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Staff Category</label>
                    <select name="positionType" value={formData.positionType} onChange={handleInputChange}>
                      <option value="TEACHING">Teaching Staff</option>
                      <option value="NON_TEACHING">Non-Teaching Staff</option>
                    </select>
                  </div>

                  <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                    <label>Desired Designation</label>
                    <input 
                      type="text" 
                      name="positionName" 
                      value={formData.positionName} 
                      onChange={handleInputChange} 
                      required 
                      placeholder="e.g. Senior Mathematics Teacher"
                    />
                  </div>

                  {formData.positionType === 'TEACHING' && (
                    <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                      <label>Subjects of Expertise</label>
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
                        gap: '0.75rem',
                        background: '#f8fafc',
                        padding: '1.25rem',
                        borderRadius: '14px',
                        border: '1px solid #e2e8f0',
                        marginTop: '0.25rem'
                      }}>
                        {subjectsList.map(subject => (
                          <label key={subject} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', color: '#475569' }}>
                            <input 
                              type="checkbox"
                              checked={formData.subjects.includes(subject)}
                              onChange={() => handleSubjectChange(subject)}
                              style={{ width: '16px', height: '16px', accentColor: 'var(--accent)', cursor: 'pointer' }}
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

                  <div className={styles.formGroup}>
                    <label>Highest Qualification</label>
                    <input 
                      type="text" 
                      name="qualification" 
                      value={formData.qualification} 
                      onChange={handleInputChange} 
                      required 
                      placeholder="e.g. M.Sc, B.Ed"
                    />
                  </div>

                  <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                    <label>Upload Resume (PDF / DOCX)</label>
                    <div className={styles.fileInputWrapper}>
                      <input 
                        type="file" 
                        id="resume" 
                        onChange={handleFileChange} 
                        accept=".pdf,.doc,.docx" 
                        required 
                      />
                      <div className={styles.fileCustomUi}>
                        <Upload size={18} style={{ marginRight: '0.5rem' }} />
                        {resume ? `📄 ${resume.name}` : 'Click to select your resume file'}
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
                      placeholder="Describe why you want to join us..."
                    ></textarea>
                  </div>
                </div>

                {status && (
                  <div className={`${styles.formStatus} ${styles[status.type]}`}>
                    {status.message}
                  </div>
                )}

                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                  <button type="submit" className="btn btn-primary btn-pulse" disabled={loading} style={{ width: '100%', maxWidth: '350px' }}>
                    {loading ? 'Submitting Application...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

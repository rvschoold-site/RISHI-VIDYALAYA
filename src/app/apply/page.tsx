'use client';

import React, { useState } from 'react';
import styles from './apply.module.css';
import Reveal from '@/components/Reveal';

type ApplyType = 'admission' | 'career';

export default function ApplyPage() {
  const [type, setType] = useState<ApplyType>('admission');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Career Form State
  const [careerData, setCareerData] = useState({
    fullName: '',
    email: '',
    phone: '',
    positionType: 'teaching',
    positionName: '',
    experience: '',
    qualification: '',
    coverLetter: '',
    subjects: [] as string[],
    resume: null as File | null
  });

  // Admission Form State
  const [admissionData, setAdmissionData] = useState({
    parentName: '',
    studentName: '',
    email: '',
    phone: '',
    grade: '',
    previousSchool: '',
    address: ''
  });

  const subjectsList = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Social Studies', 
    'English', 'Telugu', 'Hindi', 'Sanskrit', 'Computer Science', 
    'AI & Robotics', 'Physical Education', 'Arts & Crafts', 'Music/Dance'
  ];

  const handleSubjectChange = (subject: string) => {
    setCareerData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const handleAdmissionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(admissionData)
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        setError(data.error || 'Submission failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCareerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!careerData.resume) {
      setError('Please upload your resume');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      Object.entries(careerData).forEach(([key, value]) => {
        if (key === 'subjects' && Array.isArray(value)) {
          value.forEach(s => formData.append('subjects', s));
        } else if (key === 'resume' && value instanceof File) {
          formData.append('resume', value);
        } else if (value !== null && value !== undefined) {
          formData.append(key, String(value));
        }
      });

      const res = await fetch('/api/careers', {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        setError(data.error || 'Submission failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
        <Reveal>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🎉</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Application Submitted!</h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Thank you for reaching out to Rishi Vidyalaya. Our team will review your application and get back to you shortly.
          </p>
          <button onClick={() => window.location.href = '/'} className="btn btn-primary">Back to Home</button>
        </Reveal>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '6rem 0' }}>
      <Reveal>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Join Rishi Vidyalaya</h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
            Whether you are a parent seeking excellence for your child or a professional looking to inspire future generations, your journey starts here.
          </p>
        </div>
      </Reveal>

      <div className={styles.tabContainer}>
        <button 
          className={`${styles.tab} ${type === 'admission' ? styles.tabActive : ''}`}
          onClick={() => { setType('admission'); setError(null); }}
        >
          🎓 For Students (Admissions)
        </button>
        <button 
          className={`${styles.tab} ${type === 'career' ? styles.tabActive : ''}`}
          onClick={() => { setType('career'); setError(null); }}
        >
          💼 For Professionals (Careers)
        </button>
      </div>

      <div className={styles.formWrapper}>
        {type === 'admission' ? (
          <form className={styles.form} onSubmit={handleAdmissionSubmit}>
            <div className={styles.sectionHeader}>
              <h2>Student Admission Inquiry</h2>
              <p>Apply for the Academic Year 2026-27. We focus on concept-based learning and IIT-NEET foundation from early grades.</p>
            </div>
            
            <div className={styles.grid}>
              <div className={styles.field}>
                <label>Parent/Guardian Name</label>
                <input 
                  type="text" required
                  value={admissionData.parentName}
                  onChange={e => setAdmissionData({...admissionData, parentName: e.target.value})}
                  placeholder="Full Name"
                />
              </div>
              <div className={styles.field}>
                <label>Student Name</label>
                <input 
                  type="text" required
                  value={admissionData.studentName}
                  onChange={e => setAdmissionData({...admissionData, studentName: e.target.value})}
                  placeholder="Child's Full Name"
                />
              </div>
              <div className={styles.field}>
                <label>Email Address</label>
                <input 
                  type="email" required
                  value={admissionData.email}
                  onChange={e => setAdmissionData({...admissionData, email: e.target.value})}
                  placeholder="email@example.com"
                />
              </div>
              <div className={styles.field}>
                <label>Phone Number</label>
                <input 
                  type="tel" required
                  value={admissionData.phone}
                  onChange={e => setAdmissionData({...admissionData, phone: e.target.value})}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div className={styles.field}>
                <label>Seeking Admission for Grade</label>
                <select 
                  required
                  value={admissionData.grade}
                  onChange={e => setAdmissionData({...admissionData, grade: e.target.value})}
                >
                  <option value="">Select Grade</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i+1} value={`Grade ${i+1}`}>Grade {i+1}</option>
                  ))}
                  <option value="Kindergarten">Kindergarten</option>
                </select>
              </div>
              <div className={styles.field}>
                <label>Previous School Name</label>
                <input 
                  type="text"
                  value={admissionData.previousSchool}
                  onChange={e => setAdmissionData({...admissionData, previousSchool: e.target.value})}
                  placeholder="Last attended school"
                />
              </div>
            </div>
            
            <div className={styles.field} style={{ marginTop: '1rem' }}>
              <label>Residential Address</label>
              <textarea 
                rows={3}
                value={admissionData.address}
                onChange={e => setAdmissionData({...admissionData, address: e.target.value})}
                placeholder="Complete address"
              ></textarea>
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}
            <button type="submit" disabled={loading} className="btn btn-primary" style={{ marginTop: '2rem', width: '100%', padding: '1rem' }}>
              {loading ? 'Submitting...' : 'Submit Admission Inquiry'}
            </button>
          </form>
        ) : (
          <form className={styles.form} onSubmit={handleCareerSubmit}>
            <div className={styles.sectionHeader}>
              <h2>Career Application</h2>
              <p>Be part of a vision that blends traditional basics with modern technology. We are looking for passionate educators and staff.</p>
            </div>

            <div className={styles.grid}>
              <div className={styles.field}>
                <label>Full Name</label>
                <input 
                  type="text" required
                  value={careerData.fullName}
                  onChange={e => setCareerData({...careerData, fullName: e.target.value})}
                />
              </div>
              <div className={styles.field}>
                <label>Email Address</label>
                <input 
                  type="email" required
                  value={careerData.email}
                  onChange={e => setCareerData({...careerData, email: e.target.value})}
                />
              </div>
              <div className={styles.field}>
                <label>Position Type</label>
                <select 
                  value={careerData.positionType}
                  onChange={e => setCareerData({...careerData, positionType: e.target.value})}
                >
                  <option value="teaching">Teaching Staff</option>
                  <option value="non-teaching">Non-Teaching Staff</option>
                  <option value="administration">Administration</option>
                </select>
              </div>
              <div className={styles.field}>
                <label>Designation/Post</label>
                <input 
                  type="text" required
                  value={careerData.positionName}
                  onChange={e => setCareerData({...careerData, positionName: e.target.value})}
                  placeholder="e.g. Senior Math Teacher"
                />
              </div>
            </div>

            {careerData.positionType === 'teaching' && (
              <div className={styles.subjectsSection}>
                <label style={{ fontWeight: 700, display: 'block', marginBottom: '1rem' }}>Subjects of Expertise</label>
                <div className={styles.subjectsGrid}>
                  {subjectsList.map(subject => (
                    <label key={subject} className={styles.checkboxLabel}>
                      <input 
                        type="checkbox"
                        checked={careerData.subjects.includes(subject)}
                        onChange={() => handleSubjectChange(subject)}
                      />
                      <span>{subject}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.grid} style={{ marginTop: '1.5rem' }}>
              <div className={styles.field}>
                <label>Total Experience (Years)</label>
                <input 
                  type="text" required
                  value={careerData.experience}
                  onChange={e => setCareerData({...careerData, experience: e.target.value})}
                />
              </div>
              <div className={styles.field}>
                <label>Highest Qualification</label>
                <input 
                  type="text" required
                  value={careerData.qualification}
                  onChange={e => setCareerData({...careerData, qualification: e.target.value})}
                />
              </div>
            </div>

            <div className={styles.field} style={{ marginTop: '1.5rem' }}>
              <label>Resume / CV (PDF/DOCX/Image)</label>
              <div className={styles.fileInputWrapper}>
                <input 
                  type="file" 
                  required 
                  accept=".pdf,.doc,.docx,image/*"
                  onChange={e => setCareerData({...careerData, resume: e.target.files?.[0] || null})}
                />
                <div className={styles.fileCustomUi}>
                  {careerData.resume ? `📄 ${careerData.resume.name}` : 'Click to select your resume'}
                </div>
              </div>
            </div>

            <div className={styles.field} style={{ marginTop: '1.5rem' }}>
              <label>Cover Letter (Optional)</label>
              <textarea 
                rows={4}
                value={careerData.coverLetter}
                onChange={e => setCareerData({...careerData, coverLetter: e.target.value})}
                placeholder="Briefly describe why you want to join us"
              ></textarea>
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}
            <button type="submit" disabled={loading} className="btn btn-primary" style={{ marginTop: '2rem', width: '100%', padding: '1rem' }}>
              {loading ? 'Uploading & Submitting...' : 'Submit Application'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

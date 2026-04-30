'use client';
import React, { useState } from 'react';
import styles from './gallery.module.css';
import Reveal from '@/components/Reveal';
import Image from 'next/image';

const images = [
  { id: 1, title: 'Hands-on Activity', url: '/HANDS%20ON%20ACTIVITY%20(PROJECT%20BASED%20LEARNING).JPG.jpeg' },
  { id: 2, title: 'Passion', url: '/PASSION.JPG.jpeg' },
  { id: 3, title: 'Passion Activity', url: '/PASSION-1.JPG.jpeg' },
  { id: 4, title: 'Perfection', url: '/PERFECTION.JPG.jpeg' },
  { id: 5, title: 'Perfection Class', url: '/PERFRCTION-1.JPG.jpeg' },
  { id: 6, title: 'Perfection Activity', url: '/PERFECTION-%202.JPG.jpeg' },
  { id: 7, title: 'Perfection Learning', url: '/PERFECTION-3.JPG.jpeg' },
  { id: 8, title: 'Perfection Engagement', url: '/PERFECTION-4.JPG.jpeg' },
  { id: 9, title: 'Performance', url: '/PERFROMANCE.JPG.jpeg' },
  { id: 10, title: 'Performance Event', url: '/PERFORMANCE-1.JPG.jpeg' },
  { id: 11, title: 'Project Based Learning', url: '/PROJECT%20BASED%20LEARNING.JPG.jpeg' },
  { id: 12, title: 'Project Activities', url: '/PROJECT%20BASED%20LEARNING-1.JPG.jpeg' },
  { id: 13, title: 'Purpose', url: '/PURPOSE.JPG.jpeg' },
  { id: 14, title: 'Purpose Event', url: '/PURPOSE-1.JPG.jpeg' },
];

export default function Gallery() {
  const [dynamicImages, setDynamicImages] = React.useState<any[]>([]);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setDynamicImages(data);
        }
      })
      .catch(err => console.error('Failed to fetch gallery:', err))
      .finally(() => setLoading(false));
  }, []);

  const displayImages = dynamicImages.length > 0 ? dynamicImages : images;

  return (
    <div className={styles.container}>
      <div className="page-hero">
        <h1>Campus Gallery</h1>
        <p>A glimpse into life at Rishi Vidyalaya.</p>
      </div>
      <section className="section">
        <div className={styles.gridGallery}>
          {displayImages.map((img, index) => (
            <Reveal key={img._id || img.id} delay={index * 0.1}>
              <div className={styles.galleryItem} onClick={() => setSelectedImage(img.url)}>
                <Image 
                  src={img.url} 
                  alt={img.title} 
                  fill 
                  quality={75}
                  priority={index < 4}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.image} 
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
                  style={{ objectFit: 'cover' }}
                />
                <div className={styles.overlay}>
                  <span>{img.title}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className={styles.lightbox} onClick={() => setSelectedImage(null)}>
          <div className={styles.lightboxClose}>&times;</div>
          <Image 
            src={selectedImage} 
            alt="Enlarged view" 
            fill 
            quality={85}
            sizes="100vw"
            className={styles.lightboxImage} 
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
            style={{ objectFit: 'contain' }}
          />
        </div>
      )}
    </div>
  );
}

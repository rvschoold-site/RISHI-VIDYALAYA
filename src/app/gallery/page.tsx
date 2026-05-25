'use client';
import React, { useState } from 'react';
import styles from './gallery.module.css';
import Reveal from '@/components/Reveal';
import Image from 'next/image';

const S3_BASE = 'https://rishividalaya.s3.ap-southeast-2.amazonaws.com/gallery';

const images = [
  { id: 1, title: 'Hands-on Activity', url: `${S3_BASE}/1779703706293-HANDS_ON_ACTIVITY_(PROJECT_BASED_LEARNING).JPG.jpeg` },
  { id: 2, title: 'Passion', url: `${S3_BASE}/1779703708523-PASSION.JPG.jpeg` },
  { id: 3, title: 'Passion Activity', url: `${S3_BASE}/1779703707840-PASSION-1.JPG.jpeg` },
  { id: 4, title: 'Perfection', url: `${S3_BASE}/1779703710632-PERFECTION.JPG.jpeg` },
  { id: 5, title: 'Perfection Class', url: `${S3_BASE}/1779703711717-PERFRCTION-1.JPG.jpeg` },
  { id: 6, title: 'Perfection Activity', url: `${S3_BASE}/1779703709048-PERFECTION-_2.JPG.jpeg` },
  { id: 7, title: 'Perfection Learning', url: `${S3_BASE}/1779703709593-PERFECTION-3.JPG.jpeg` },
  { id: 8, title: 'Perfection Engagement', url: `${S3_BASE}/1779703710117-PERFECTION-4.JPG.jpeg` },
  { id: 9, title: 'Performance', url: `${S3_BASE}/1779703712227-PERFROMANCE.JPG.jpeg` },
  { id: 10, title: 'Performance Event', url: `${S3_BASE}/1779703711160-PERFORMANCE-1.JPG.jpeg` },
  { id: 11, title: 'Project Based Learning', url: `${S3_BASE}/1779703713281-PROJECT_BASED_LEARNING.JPG.jpeg` },
  { id: 12, title: 'Project Activities', url: `${S3_BASE}/1779703712755-PROJECT_BASED_LEARNING-1.JPG.jpeg` },
  { id: 13, title: 'Purpose', url: `${S3_BASE}/1779703714320-PURPOSE.JPG.jpeg` },
  { id: 14, title: 'Purpose Event', url: `${S3_BASE}/1779703713806-PURPOSE-1.JPG.jpeg` },
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

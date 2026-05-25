'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styles from '@/app/page.module.css';

interface FeaturedImage {
  _id: string;
  url: string;
  title: string;
}

const DEFAULT_IMAGE = 'https://rishividalaya.s3.ap-southeast-2.amazonaws.com/gallery/1779703713281-PROJECT_BASED_LEARNING.JPG.jpeg';
const SLIDE_INTERVAL = 5000; // 5 seconds

/**
 * HeroSlideshow component that fetches featured gallery images
 * and displays them as a smooth crossfade slideshow behind the hero section.
 * Falls back to a single static image if no featured images exist.
 */
export default function HeroSlideshow() {
  const [images, setImages] = useState<FeaturedImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Fetch featured images on mount
  useEffect(() => {
    fetch('/api/gallery?featured=true')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setImages(data);
        }
      })
      .catch(err => console.error('Failed to fetch featured images:', err))
      .finally(() => setLoaded(true));
  }, []);

  // Auto-advance slides
  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(nextSlide, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [images.length, nextSlide]);

  // If no featured images, show default
  const slides = images.length > 0
    ? images.map(img => img.url)
    : [DEFAULT_IMAGE];

  return (
    <>
      {/* Stacked slides with crossfade */}
      {slides.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={images[index]?.title || 'Rishi Vidyalaya Campus'}
          className={`${styles.heroSlide} ${index === currentIndex ? styles.heroSlideActive : ''}`}
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      ))}

      {/* Slide indicator dots */}
      {slides.length > 1 && (
        <div className={styles.heroIndicators}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${styles.heroIndicatorDot} ${index === currentIndex ? styles.heroIndicatorDotActive : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </>
  );
}

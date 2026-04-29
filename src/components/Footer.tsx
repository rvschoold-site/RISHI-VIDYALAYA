import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerBrand}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <Image src="/logo.png" alt="Rishi Vidyalaya Logo" width={400} height={200} className={styles.footerLogo} />
          </div>
          <div className={styles.socialLinks}>
            <Link 
              href="https://www.facebook.com/share/18NrMNiN1E/?mibextid=wwXIfr" 
              target="_blank" 
              className={styles.socialIcon} 
              aria-label="Facebook"
            >
              <FaFacebookF size={18} />
            </Link>
            <Link 
              href="https://www.instagram.com/rishi_vidyalaya?igsh=MXhmdHpkcXZ0NzVpbQ==" 
              target="_blank" 
              className={styles.socialIcon} 
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </Link>
            <Link 
              href="https://youtube.com/@rishividyalaya?si=UvrMNUWvgr1Gegyc" 
              target="_blank" 
              className={styles.socialIcon} 
              aria-label="YouTube"
            >
              <FaYoutube size={20} />
            </Link>
            <Link 
              href="https://wa.me/qr/6GRQUTSM4MF4N1" 
              target="_blank" 
              className={styles.socialIcon} 
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={20} />
            </Link>
          </div>
        </div>

        <div className={styles.footerLinks}>
          <h3>Quick Links</h3>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/academics">Academics & Beyond</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/careers">Careers</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className={styles.footerContact}>
          <h3>Contact Us</h3>
          <p><strong>Address:</strong><br />N.S Gate road, Opp: Tidco Houses, Dharmavaram.</p>
          <p><strong>Phone:</strong><br />+91 9063466944, +91 9063466945</p>
          <p><strong>Email:</strong><br />rvschoold@gmail.com</p>
        </div>

        <div className={styles.footerMap}>
          <h3>Our Location</h3>
          <div className={styles.mapFrame}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30917.68608174432!2d77.67670250282521!3d14.386139433364058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb14371bc9bf393%3A0xc8a2201ad23ba3a!2sRishi%20Vidyalaya!5e0!3m2!1sen!2sin!4v1777455733780!5m2!1sen!2sin"
              width="100%" 
              height="150" 
              style={{ border: 0, borderRadius: '12px' }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Rishi Vidyalaya Map"
            ></iframe>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Rishi Vidyalaya. All rights reserved.</p>
      </div>
    </footer>
  );
}

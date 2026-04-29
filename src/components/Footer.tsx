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
          <p><strong>Phone:</strong><br />+91 9063466944,+91 9063466945</p>
          <p><strong>Email:</strong><br />rvschoold@gmail.com</p>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Rishi Vidyalaya. All rights reserved.</p>
      </div>
    </footer>
  );
}

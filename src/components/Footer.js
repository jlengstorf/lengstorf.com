import React from 'react';
import Link from 'gatsby-link';
import styles from '../styles/footer.module.css';

export default () => (
  <footer className={styles.footer}>
    <Link to="/" className={styles.link}>
      Home
    </Link>
    <Link to="/blog" className={styles.link}>
      Blog
    </Link>
    <Link to="/about" className={styles.link}>
      About
    </Link>
    <Link to="/speaking" className={styles.link}>
      Speaking
    </Link>
    <Link to="/contact" className={styles.link}>
      Contact
    </Link>
    <Link to="/disclaimer" className={styles.link}>
      Disclaimer
    </Link>
    <span className={styles.copyright}>All content © Jason Lengstorf</span>
  </footer>
);

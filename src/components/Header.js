import React from 'react';
import { Link } from 'gatsby';
import styles from '../styles/header.module.css';
import logo from '../images/jl-logo.svg';

const topLevelNav = [
  {
    href: '/blog',
    label: 'Blog',
  },
  {
    href: '/about',
    label: 'About',
  },
  {
    href: '/speaking',
    label: 'Speaking',
    extraClass: styles.navLinkHiddenSmall,
  },
  {
    href: '/newsletter',
    label: 'Newsletter',
  },
];

export default () => (
  <header className={styles.header} role="banner">
    <a
      href="#content"
      id="skip-navigation"
      className={`screen-reader-text ${styles.skipToContent}`}
    >
      Skip to Content
    </a>
    <nav className={styles.nav}>
      <Link to="/" className={`${styles.navLink} ${styles.logo}`}>
        <img
          className={styles.logoImage}
          src={logo}
          alt="Jason Lengstorf"
          // This keeps the logo from flashing at full-width on fresh loads.
          style={{ maxWidth: '42px' }}
        />
      </Link>
      {topLevelNav.map(({ href, label, extraClass = '' }) => (
        <Link
          key={label}
          to={href}
          className={`${styles.navLink} ${extraClass} text-sharp`}
          activeClassName={styles.navLinkActive}
        >
          {label}
        </Link>
      ))}
    </nav>
  </header>
);

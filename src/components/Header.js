import React from 'react';
import Link from 'gatsby-link';
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
    href: '/contact',
    label: 'Contact',
  },
];

export default () => (
  <header className={styles.header} role="banner">
    <Link to="#content" id="skip-navigation" className="screen-reader-text">
      Skip Navigation
    </Link>
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
      {topLevelNav.map(({ href, label }) => (
        <Link
          key={label}
          to={href}
          className={`${styles.navLink} text-sharp`}
          activeClassName={styles.navLinkActive}
        >
          {label}
        </Link>
      ))}
    </nav>
  </header>
);

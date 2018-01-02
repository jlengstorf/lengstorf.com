import React from 'react';
import Link from 'gatsby-link';
import styles from '../styles/tag-link.module.css';

export default ({ tag }) => (
  <Link to={`/blog/tag/${tag}`} className={styles.link}>
    {tag}
  </Link>
);

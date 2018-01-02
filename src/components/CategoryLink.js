import React from 'react';
import Link from 'gatsby-link';
import config from '../config';
import styles from '../styles/category-link.module.css';

export default ({ category, block }) => (
  <Link
    to={`/blog/category/${category}`}
    className={`${styles.link} ${block && styles['link--block']}`}
  >
    {config.categories[category]
      ? config.categories[category].display
      : category}
  </Link>
);

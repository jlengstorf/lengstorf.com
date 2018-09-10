import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styles from '../styles/tag-link.module.css';

const Tag = ({ tag }) => (
  <Link to={`/blog/tag/${tag}`} className={styles.link}>
    {tag}
  </Link>
);

Tag.propTypes = {
  tag: PropTypes.string.isRequired,
};

export default Tag;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import config from '../config';
import styles from '../styles/category-link.module.css';

const CategoryLink = ({ category, block }) => (
  <Link
    to={`/blog/category/${category}`}
    className={`${styles.link} ${block && styles.linkBlock}`}
  >
    {config.categories[category]
      ? config.categories[category].display
      : category}
  </Link>
);

CategoryLink.propTypes = {
  category: PropTypes.string.isRequired,
  block: PropTypes.bool,
};

CategoryLink.defaultProps = {
  block: false,
};

export default CategoryLink;

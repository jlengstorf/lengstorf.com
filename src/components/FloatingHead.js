import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import styles from '../styles/floating-head.module.css';

const FloatingHead = ({ thumb, className }) => (
  <aside className={`${className} ${styles.floatingHead}`}>
    <Img
      className={styles.floatingHeadImage}
      style={{ display: `inherit` }}
      alt="Jason Lengstorf."
      sizes={thumb.sizes}
    />
  </aside>
);

FloatingHead.propTypes = {
  className: PropTypes.string.isRequired,
  thumb: PropTypes.shape({
    sizes: PropTypes.any,
  }).isRequired,
};

export default FloatingHead;

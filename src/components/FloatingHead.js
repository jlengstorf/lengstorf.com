/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import config from '../config';
import styles from '../styles/floating-head.module.css';

const FloatingHead = ({ thumb, className }) => (
  <aside className={`${className} ${styles.wrapper}`}>
    <Img
      className={styles.image}
      style={{ display: `inherit` }}
      alt="Jason Lengstorf."
      sizes={thumb.sizes}
    />
    <h3 className={styles.heading}>About the Author</h3>
    <p
      className={styles.text}
      dangerouslySetInnerHTML={{ __html: config.author.minibio }}
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

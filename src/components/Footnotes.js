/* eslint react/no-danger: "off" */
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/footnotes.module.css';

const Footnotes = ({ isActive, isHidden, number, content, handleClose }) => (
  <aside
    hidden={isHidden}
    className={`${styles.footnoteDisplay} ${
      isActive ? styles.footnoteDisplayActive : ''
    }`}
  >
    <div className={styles.footnoteTextWrap} data-footnote-number={number}>
      <div
        className={styles.footnoteText}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <a href="#" className={styles.footnoteClose} onClick={handleClose}>
        close
      </a>
    </div>
  </aside>
);

Footnotes.propTypes = {
  isActive: PropTypes.bool,
  isHidden: PropTypes.bool,
  number: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};

Footnotes.defaultProps = {
  isActive: false,
  isHidden: true,
};

export default Footnotes;

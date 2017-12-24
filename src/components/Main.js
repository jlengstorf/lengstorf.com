import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/main.module.css';

const Main = ({ children, isHomePage, blog }) => (
  <main
    role="main"
    id="content"
    className={`${styles.main} ${isHomePage ? styles.mainHome : ''} ${
      blog ? styles.mainBlog : ''
    }`}
  >
    {children}
  </main>
);

Main.propTypes = {
  children: PropTypes.node.isRequired,
  isHomePage: PropTypes.bool,
  blog: PropTypes.bool,
};

Main.defaultProps = {
  isHomePage: false,
  blog: false,
};

export default Main;

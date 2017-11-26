import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/main.module.css';

const Main = ({ children, isHomePage }) => (
  <main
    role="main"
    id="content"
    className={`${styles.main} ${isHomePage ? styles.mainHome : ''}`}
  >
    {children}
  </main>
);

Main.propTypes = {
  children: PropTypes.node.isRequired,
  isHomePage: PropTypes.bool,
};

Main.defaultProps = {
  isHomePage: false,
};

export default Main;

import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/main.module.css';

const Main = ({ children, className }) => (
  <main role="main" id="content" className={className || styles.main}>
    {children}
  </main>
);

Main.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Main.defaultProps = {
  className: '',
};

export default Main;

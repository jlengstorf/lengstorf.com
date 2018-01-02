import React from 'react';
// import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import OptIn from '../components/OptIn';
import styles from '../styles/page.module.css';

const Newsletter = () => (
  <Layout title="Get exclusive content delivered directly to your inbox">
    <h1>I send out a newsletter sometimes.</h1>
    <p>
      If you like my content and want to read more of it, then you’ve come to
      the right place, my friend:{' '}
      <strong>I send out a newsletter whenever I write something new.</strong>
    </p>
    <p>
      In addition to letting you know when I’ve published new content on my
      site,{' '}
      <strong>
        I occasionally send out shorter thoughts and ideas
        <em>only to subscribers</em>. If you’re big on exclusive content, this
        might be fun for you.
      </strong>
    </p>
    <OptIn group="DEFAULT" button="Join Now" />
    <p className={styles['opt-in-notice']}>
      Note: I will never share your email or spam you with nonsense. Because I’m
      not a dick.
    </p>
  </Layout>
);

export default Newsletter;

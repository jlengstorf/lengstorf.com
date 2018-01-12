/* eslint react/no-danger: "off" */
import React from 'react';
import Layout from '../components/Layout';
import styles from '../styles/page.module.css';

const getError = () => {
  const defaultError = {
    status: 400,
    title: 'Unknown Error',
    detail: 'Something went wrong, but I’m not exactly sure what it was.',
    type: 'Unknown_Error',
  };

  if (typeof window !== 'undefined') {
    const queryString = window.location.search;
    const encoded = queryString.split('=')[1];
    const err = encoded ? JSON.parse(atob(encoded)) : defaultError;

    return err;
  }

  // For SSR and cases where no error was supplied, send the default error.
  return defaultError;
};

const Error = () => {
  const err = getError();

  return (
    <Layout title="There was an error.">
      <h1 className={styles.heading}>Well, shit. Something went wrong.</h1>
      <section>
        <p>
          It looks like there was a problem with your form submission. Here’s
          the error that came back:
        </p>
        <blockquote>
          <p>
            <strong>{err.title}</strong> — {err.detail}{' '}
            <small>[{err.status}]</small>
          </p>
        </blockquote>
        <p>
          Try hitting the back button in your browser and trying again with the
          above error corrected. If that doesn’t work, or if you feel like the
          error above doesn’t make sense,{' '}
          <a href="mailto:jason@lengstorf.com">email me</a> (include the error
          message!) and we’ll figure it out.
        </p>
      </section>
    </Layout>
  );
};

export default Error;

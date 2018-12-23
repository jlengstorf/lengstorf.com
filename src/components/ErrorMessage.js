import React from 'react';

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

export default () => {
  const err = getError();
  return (
    <blockquote>
      <p>
        <strong>{err.title}</strong> — {err.detail}{' '}
        <small>[{err.status}]</small>
      </p>
    </blockquote>
  );
};

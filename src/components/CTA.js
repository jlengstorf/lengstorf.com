/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

export default ({
  content,
  className,
  link,
  button,
  heading = 'What to do next.',
}) => (
  <div className={className}>
    <h2>{heading}</h2>
    <div dangerouslySetInnerHTML={{ __html: content }} />
    <p>
      <a className="js--open-popover" href={link}>
        {button}
      </a>
    </p>
  </div>
);

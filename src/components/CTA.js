import React from 'react';
import PropTypes from 'prop-types';

const CTA = ({ type }) => <div>CTA: {type}</div>;

CTA.propTypes = {
  type: PropTypes.string,
};

CTA.defaultProps = {
  type: 'default',
};

export default CTA;

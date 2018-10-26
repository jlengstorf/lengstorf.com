/* eslint react/no-danger: "off" */
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import styled from 'react-emotion';
import { colors } from '../config/styles';

const FootnoteDisplay = styled('aside')`
  position: fixed;
  bottom: -320px;
  left: 0;
  right: 0;
  padding: 1.5rem 1.5rem 30px;
  background-color: ${colors.lightest};
  border-top: 1px solid ${colors.lightest};
  transition: 250ms bottom ease-in-out;
  z-index: 9;

  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    border-top: 2px solid ${colors.purple};
    border-bottom: 1px solid ${colors.grayAlpha};
  }

  ::after {
    content: '';
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    height: 30px;
    background-image: linear-gradient(
      to top,
      ${colors.lightest} 15%,
      transparent 100%
    );
  }
`;

const active = css`
  bottom: 0;
`;

const TextWrap = styled('div')`
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 650px;
  position: relative;

  ::before {
    content: attr(data-footnote-number);
    display: block;
    width: 1rem;
    height: 1rem;
    margin: 0 0 1rem;
    background-color: ${colors.purple};
    border: 0;
    border-radius: 50%;
    color: ${colors.lightest};
    font-size: 0.625rem;
    font-weight: 500;
    line-height: 1rem;
    text-align: center;
  }
`;

const Text = styled('div')`
  max-height: 240px;
  font-size: 90%;
  padding-bottom: 30px;
  overflow-y: scroll;
`;

const Close = styled('a')`
  border-radius: 0.5rem;
  color: ${colors.gray};
  font-size: 0.625rem;
  font-variant: small-caps;
  letter-spacing: 0.05em;
  line-height: 1;
  margin: 0;
  padding: 0 0.25rem 0.2rem;
  position: absolute;
  right: 0;
  text-decoration: none;
  top: 0;

  ::after {
    content: '×';
    margin-left: 0.25rem;
    font-size: 115%;
  }

  :active,
  :focus,
  :hover {
    border-radius: 0.5rem;
  }
`;

const Footnotes = ({ isActive, isHidden, number, content, handleClose }) => (
  <FootnoteDisplay hidden={isHidden} className={` ${isActive ? active : ''}`}>
    <TextWrap data-footnote-number={number}>
      <Text dangerouslySetInnerHTML={{ __html: content }} />
      <Close href="#" onClick={handleClose}>
        close
      </Close>
    </TextWrap>
  </FootnoteDisplay>
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

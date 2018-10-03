import React from 'react';
import { css } from 'emotion';
import styled from 'react-emotion';
import { Link } from 'gatsby';
import { colors } from '../config/styles';

const Footer = styled('footer')`
  font-size: 0.75rem;
  padding-bottom: 2rem;
  text-align: center;
`;

const footerTextStyles = css`
  color: ${colors.gray};
  display: inline-block;
  margin: 0 0.25rem;
  padding: 0.25rem;
`;

const Copyright = styled('span')`
  ${footerTextStyles};
  display: block;
  margin-top: 0.5rem;
`;

const FooterLink = styled(Link)`
  ${footerTextStyles};
  text-decoration: none;

  :active,
  :hover,
  :focus {
    background-color: ${colors.purple};
    border-radius: 0.25rem;
    color: ${colors.lightest};
    outline: 0;
  }
`;

export default () => (
  <Footer>
    <FooterLink to="/">Home</FooterLink>
    <FooterLink to="/blog">Blog</FooterLink>
    <FooterLink to="/about">About</FooterLink>
    <FooterLink to="/speaking">Speaking</FooterLink>
    <FooterLink to="/contact">Contact</FooterLink>
    <FooterLink to="/disclaimer">Disclaimer</FooterLink>
    <Copyright>All content © Jason Lengstorf</Copyright>
  </Footer>
);

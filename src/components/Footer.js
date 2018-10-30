import React from 'react';
import { css } from 'emotion';
import styled from 'react-emotion';
import { Link } from 'gatsby';
import { colors, media } from '../config/styles';

const Footer = styled('footer')`
  font-size: 0.75rem;
  padding-bottom: 2rem;
  text-align: center;

  @media ${media.medium} {
    @supports (display: flex) {
      display: flex;
      text-align: left;
    }
  }
`;

const footerTextStyles = css`
  color: ${colors.textLight};
  display: inline-block;
  margin: 0 0.25rem;
  padding: 0.25rem;
`;

const Copyright = styled('div')`
  ${footerTextStyles};
  display: block;
  margin-top: 0.5rem;

  @media ${media.medium} {
    display: inline-block;
    margin-top: 0;

    @supports (display: flex) {
      margin-left: 0;
      margin-right: auto;
      order: 1;
    }
  }
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

  @media ${media.medium} {
    @supports (display: flex) {
      order: 2;

      &:last-of-type {
        margin-right: 0;
      }
    }
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

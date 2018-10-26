import React from 'react';
import { css } from 'emotion';
import styled from 'react-emotion';
import { Link } from 'gatsby';
import logo from '../images/jl-logo.svg';
import { animation, colors, fonts, media } from '../config/styles';

const Header = styled('header')`
  background-color: ${colors.lightest};
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;

  ::before,
  ::after {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    height: 1px;
    width: calc(100% - 30px);
    z-index: 1;
  }

  ::before {
    top: calc(100% - 1px);
    background-color: ${colors.purple};
  }

  ::after {
    top: 100%;
    background-color: ${colors.grayAlpha};
  }
`;

const SkipToContent = styled('a')`
  transition: none;

  :focus,
  :active,
  :hover {
    clip: auto;
    width: auto;
    height: auto;
    background-color: ${colors.lightest};
    border: 2px solid ${colors.darkest};
    border-radius: 0;
    color: ${colors.darkest};
    padding: 0.5rem 1rem;
    z-index: 5000;
  }
`;

const Nav = styled('nav')`
  display: flex;
  justify-content: flex-start;
  margin: 0;
  position: relative;
  z-index: 5;
`;

const NavLink = styled(Link)`
  border: 2px solid transparent;
  border-radius: 0;
  color: ${colors.darkest};
  font-family: ${fonts.heading};
  font-weight: 900;
  line-height: 1.25;
  margin: 0;
  padding: calc(0.5rem - 2px) 0.25rem;
  text-decoration: none;
  text-transform: uppercase;
  transition-property: color;

  @media ${media.small} {
    padding-left: 0.625rem;
    padding-right: 0.625rem;
  }

  :focus,
  :active,
  :hover {
    background-color: transparent;
    border-radius: 0;
    color: ${colors.purpleDark};
  }

  :focus {
    border-color: ${colors.darkest};
  }
`;

const LogoLink = styled(NavLink)`
  border: 0;
  margin-right: 0.5rem;
  min-width: 42px;
  position: relative;
  width: 42px;
  z-index: 10;

  @media ${media.small} {
    padding: 0;
  }

  ::after {
    background-color: ${colors.lightest};
    border: 6px solid ${colors.darkest};
    border-radius: 50%;
    content: '';
    height: 54px;
    left: -17px;
    opacity: 0;
    position: absolute;
    top: -15px;
    transition: opacity ${animation.transitionTime} linear;
    width: 54px;
    z-index: 1;
  }

  :focus,
  :active,
  :hover {
    outline: 0;
  }

  :focus {
    ::after {
      opacity: 1;
    }
  }
`;

const Logo = styled('img')`
  padding: 0;
  position: absolute;
  width: 42px;
  z-index: 2;
`;

// Helper classes.
const activeClass = css`
  color: ${colors.purple};
`;

const hiddenSmall = css`
  display: none;

  @media (min-width: 414px) {
    display: inline-block;
  }
`;

const topLevelNav = [
  {
    href: '/blog',
    label: 'Blog',
  },
  {
    href: '/about',
    label: 'About',
  },
  {
    href: '/speaking',
    label: 'Speaking',
    extraClass: hiddenSmall,
  },
  {
    href: '/newsletter',
    label: 'Newsletter',
  },
];

export default () => (
  <Header role="banner">
    <SkipToContent
      href="#content"
      id="skip-navigation"
      className="screen-reader-text"
    >
      Skip to Content
    </SkipToContent>
    <Nav>
      <LogoLink to="/">
        <Logo
          src={logo}
          alt="Jason Lengstorf"
          // This keeps the logo from flashing at full-width on fresh loads.
          style={{ maxWidth: '42px' }}
        />
      </LogoLink>
      {topLevelNav.map(({ href, label, extraClass = '' }) => (
        <NavLink
          key={label}
          to={href}
          className={`${extraClass} text-sharp`}
          activeClassName={activeClass}
        >
          {label}
        </NavLink>
      ))}
    </Nav>
  </Header>
);

import React from 'react';
import Helmet from 'react-helmet';
import Header from './Header';
import Main from './Main';

export default ({ children, title, isHomePage = false }) => [
  <Helmet
    key="app-head"
    titleTemplate="%s · Jason Lengstorf"
    defaultTitle="Jason Lengstorf"
  >
    <meta charSet="utf-8" />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <title>{title}</title>

    {/* Favicon stuff from realfavicongenerator.net */}
    <meta name="apple-mobile-web-app-title" content="lengstorf.com" />
    <meta name="application-name" content="lengstorf.com" />
    <meta name="theme-color" content="#c800ec" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#c800ec" />

    {/* Hosted webfonts because I can’t self-host Mallory 😭 */}
    <link rel="stylesheet" href="https://use.typekit.net/fnr1orp.css" />
  </Helmet>,
  <Header key="app-header" />,
  <Main key="app-main" isHomePage={isHomePage}>
    {children}
  </Main>,
];

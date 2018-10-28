/* eslint-disable no-unused-expressions */
import { injectGlobal } from 'emotion';

export const colors = {
  darkest: '#1e0d2b',
  lightest: '#fff',
  lightestTransparent: 'rgba(255, 255, 255, 0)',
  lightestAlpha: 'rgba(255, 255, 255, 0.97)',
  purple: '#c700eb',
  purpleDark: '#b200d1',
  heading: '#1e0d2b',
  text: '#685d71',
  textLight: '#776d7f',
  textDark: '#463652',
  gray: '#7f7e7e',
  grayLightest: '#f5f5f5',
  grayAlpha: 'rgba(214, 209, 230, 0.5)',
  grayAlphaExtra: 'rgba(214, 209, 230, 0.25)',
};

const defaultFontStack = [
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Helvetica',
  'Arial',
  'sans-serif',
  'Apple Color Emoji',
  'Segoe UI Emoji',
  'Segoe UI Symbol',
];

export const fonts = {
  sizeSm: '16px',
  sizeMd: '18px',
  default: defaultFontStack.join(', '),
  heading: ['mallory', ...defaultFontStack].join(', '),
};

export const animation = {
  transitionTime: '150ms',
};

export const media = {
  vertSmall: '(min-width: 370px) and (min-height: 650px)',
  small: '(min-width: 480px)',
  medium: '(min-width: 700px)',
  large: '(min-width: 960px)',
};

export const reset = () => {
  injectGlobal`
    body {
      margin: 0 auto;
      max-width: 90%;

      @supports (display: flex) {
        align-items: center;
        display: flex;
        justify-content: center;
        min-height: 100vh;
      }
    }

    * {
      box-sizing: border-box;
      margin: 0;
    }

    * + * { margin-top: 1rem; }
`;
};

export const typography = () => {
  injectGlobal`
    html,
    body {
      color: ${colors.text};
      font-family: ${fonts.default};
      font-size: ${fonts.sizeSm};
      line-height: 1.45;
      text-decoration-skip: ink;

      @media ${media.medium} {
        font-size: ${fonts.sizeMd};
      }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: ${colors.heading};
      font-family: ${fonts.heading};
      font-weight: 900;
      line-height: 1.1;
      margin-top: 1.5rem;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      &:first-child {
        margin-top: 0;
      }

      & + p {
        margin-top: 0.5rem;
      }
    }

    h2 {
      font-size: 1.5625rem;
    }
    h3 {
      font-size: 1.25rem;
    }
    h4 {
      font-size: 1.125rem;
    }
    h5 {
      font-size: 1rem;
    }
    h6 {
      font-size: 0.875rem;
    }

    h4,
    h5,
    h6 {
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    h3,
    h6 {
      font-weight: 600;
    }

    h4,
    h5 {
      font-weight: normal;
    }

    ol,
    ul {
      padding-left: 1.25rem;
    }

    li {
      margin-top: 0.5rem;
    }

    strong {
      color: ${colors.textDark};
    }

    a strong {
      color: inherit;
    }

    a {
      background-color: transparent;
      color: ${colors.purpleDark};
      padding: 0 0.125rem;
      transition: all ${animation.transitionTime} linear;

      &:focus,
      &:active,
      &:hover {
        background-color: ${colors.purple};
        border-radius: 0.25rem;
        color: ${colors.lightest};
        outline: 0;
        text-decoration: none;
      }
    }

    /* Footnotes are auto-generated, so a little bit of nonsense is required. */
    sup {
      margin: 0 0.125em;
      line-height: 1;
    }

    blockquote {
      border-bottom: 1px solid ${colors.purple};
      border-top: 1px solid ${colors.purple};
      clear: both;
      color: ${colors.textLight};
      font-size: 1.125rem;
      font-style: italic;
      overflow: hidden;
      padding: 1rem 10px;

      @media ${media.medium} {
        margin-left: -20px;
        margin-right: -20px;
        padding-left: 20px;
        padding-right: 20px;
      }
    }

    blockquote > p:last-child strong:only-child:not(.no-attribution) {
      display: block;
      color: ${colors.gray};
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 600;
      text-align: right;

      &::before {
        content: '– ';
      }
    }

    blockquote > p:last-child strong:only-child a {
      border-color: ${colors.gray};
      color: inherit;

      :hover,
      :active,
      :focus {
        border-color: ${colors.purple};
        color: ${colors.purpleDark};
      }
    }

    abbr {
      border-bottom: 1px dotted ${colors.gray};
      cursor: help;
      text-decoration: none;
    }
`;
};

export const buttons = () => {
  injectGlobal`
    .btn {
      background: ${colors.purple};
      border: 1px solid ${colors.lightest};
      box-shadow: 2px 2px 0 ${colors.grayAlphaExtra};
      border-radius: 4px;
      color: ${colors.lightest};
      display: block;
      font-family: ${fonts.heading};
      font-size: 1.5625rem;
      font-weight: 900;
      margin: 0 auto;
      max-width: 320px;
      padding: 0.25rem;
      text-align: center;
      text-decoration: none;
      text-transform: uppercase;
      transition: background-color ${animation.transitionTime} linear;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      &--small {
        display: inline-block;
        font-size: 1rem;
        margin-left: 0;
        max-width: 100%;
        padding: 0.5rem 1.5rem 0.325rem;
      }

      :hover,
      :active,
      :focus {
        background-color: ${colors.darkest};
        outline: none;
      }
    }
`;
};

export const footnotes = () => {
  injectGlobal`
    .footnote-ref {
      display: inline-block;
      height: 14px;
      width: 14px;
      background-color: ${colors.gray};
      border: 0;
      border-radius: 50%;
      color: ${colors.lightest};
      font-size: 9px;
      font-style: normal;
      font-weight: 500;
      line-height: 14px;
      text-align: center;
      text-decoration: none;
      transition: background-color ${animation.transitionTime} linear;

      &:hover,
      &:active,
      &:focus {
        background-color: ${colors.purple};
        border-radius: 50%;
        color: ${colors.lightest};
        border: 0;
        outline: none;
      }
    }

    .footnotes {
      display: none;
    }

    .footnote-image {
      display: block;
      max-width: 100%;
    }

    .footnote-backref {
      display: none;
    }

    @media ${media.medium} {
      .footnote-image--right {
        float: right;
        max-width: 45%;
        margin: 1rem 0 1rem 2rem;
      }
    }
`;
};

export const images = () => {
  injectGlobal`
    .gatsby-image-outer-wrapper { width: 100%; }
    .gatsby-image-wrapper img { margin-top: 0; }

    .figure {
      width: 100%;

      &--left,
      &--right {
        max-width: 300px;
        margin-left: auto;
        margin-right: auto;
      }

      & img {
        border: 1px solid ${colors.grayAlpha};
        height: auto;
        width: 100%;
      }

      &--no-border img { border: none; }

      @media ${media.medium} {
        &--center,
        &--left,
        &--right {
          margin-left: -20px;
          margin-right: -20px;
        }

        &--center {
          max-width: calc(100% + 40px);
          width: auto;
        }

        &--left,
        &--right { margin-bottom: 20px; }

        &--left {
          float: left;
          margin-right: 30px;
        }

        &--right {
          float: right;
          margin-left: 30px;
        }

        &--right &__caption { text-align: right; }
      }

      &__image-wrap {
        border: 1px solid ${colors.grayAlpha};
        margin-bottom: 0;
      }

      &__image-link { border: 0; }

      &__caption {
        margin-top: 0.5rem;
        padding: 0 0 0.5rem;
        border-bottom: 1px solid ${colors.grayAlpha};
        color: ${colors.gray};
        font-size: 0.875rem;
        line-height: 1rem;

        @media ${media.medium} {
          padding-left: 20px;
          padding-right: 20px;
        }

        blockquote & { border-bottom: none; }
        &:empty { display: none; }
      }

      &__attribution {
        display: block;
        margin-top: 0.25rem;
        color: ${colors.gray};
        font-size: 9px;
        font-weight: bold;
        letter-spacing: 0.05em;
        text-transform: uppercase;
      }

      &__attribution-link {
        display: inline-block;
        color: inherit;
        font-size: 11px;
        font-weight: normal;
        padding: 0.125rem 0.25rem;
        text-decoration: none;

        &:active,
        &:hover,
        &:focus {
          background-color: ${colors.purple};
          border-radius: 0.25rem;
          color: ${colors.lightest};
          outline: 0;
        }
      }
    }

`;
};

export const social = () => {
  injectGlobal`
    /* Override element inline styles 😭 */
    .twitter-tweet-rendered,
    .instagram-media-rendered {
      margin: 1.25rem auto !important;
    }

    .tweetable__link {
      display: block;
      margin-top: 0;
      font-size: 0.75rem;
      font-weight: 700;
      text-align: right;
      text-decoration: none;
      text-transform: uppercase;

      :hover,
      :active,
      :focus {
        text-decoration: underline;
      }
    }
`;
};

export const utilities = () => {
  injectGlobal`
    .screen-reader-text {
      clip: rect(0 0 0 0);
      overflow: hidden;
      position: absolute;
      height: 1px;
      width: 1px;
    }

    .text-sharp {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
`;
};

export default {
  animation,
  colors,
  fonts,
  media,
  typography,
};

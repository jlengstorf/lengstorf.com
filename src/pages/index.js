/* eslint-disable react/no-danger */
import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import WithPopover from '../components/WithPopover';
import { animation, colors, fonts, media } from '../config/styles';
import downArrow from '../images/down-arrow.svg';

/**
 * Browser workaround to avoid a bug where scrollTop doesn’t work.
 * @return {Element}  the scrollable root element
 */
const getScrollableElement = () =>
  document.body.scrollTop ? document.body : document.documentElement;

/**
 * Easing, using sinusoidal math (or some shit).
 *
 * I know; this makes my head hurt, too. Math is hard. This formula was copied
 * (I reformatted for legibility) from here: <http://gizma.com/easing/#sin3>
 *
 * @param  {Number} elapsed how much time has elapsed already
 * @param  {Number} start   the starting position
 * @param  {Number} change  the desired step size
 * @param  {Number} length  the duration length
 * @return {Number}         the new position based on the easing formula
 */
const easeInOutSine = (elapsed, start, change, length) =>
  (-change / 2) * (Math.cos((Math.PI * elapsed) / length) - 1) + start;

// Sets up a loop that executes for the length of time set in duration
const animateScroll = (
  element,
  elapsedTime,
  { position, stepSize, increment, duration, callback = () => {} },
) => {
  const nextTime = elapsedTime + increment;

  // Set the new element position using an easing formula.
  // eslint-disable-next-line no-param-reassign
  element.scrollTop = easeInOutSine(nextTime, position, stepSize, duration);

  if (nextTime < duration) {
    setTimeout(() => {
      animateScroll(element, nextTime, {
        position,
        stepSize,
        increment,
        duration,
        callback,
      });
    }, increment);
  } else {
    callback();
  }
};

const scrollToLocation = (element, targetPos, duration) =>
  new Promise(resolve => {
    animateScroll(element, 0, {
      position: element.scrollTop,
      stepSize: targetPos - element.scrollTop,
      increment: 20,
      callback: resolve,
      duration,
    });
  });

const getTopOffset = () => 54;

const scrollToContent = event => {
  event.preventDefault();
  const content = document.getElementById('home-content');
  const rootElement = getScrollableElement();
  const targetOffset = content.offsetTop - getTopOffset();

  scrollToLocation(rootElement, targetOffset, 750);
};

const handleClick = handlerFn => event => {
  event.preventDefault();
  handlerFn();
};

const Main = styled(Layout)`
  margin: 3rem auto 6rem;

  @media ${media.medium} {
    margin-top: 4rem;
    width: 57ch;
  }

  @media ${media.large} {
    @supports (display: grid) {
      display: grid;
      grid-auto-flow: column;
      grid-column-gap: 2rem;
      grid-template: repeat(2, auto) / 1fr repeat(2, calc(27.5ch - 1rem)) 1fr;
      max-width: 100%;
      width: 960px;
    }
  }
`;

const Hero = styled('div')`
  @media ${media.large} {
    @supports (display: grid) {
      align-items: center;
      display: flex;
      grid-column: span 2;
      margin: 0;
      min-height: 85vh;
      padding-bottom: 2rem;
    }
  }
`;

const Start = styled('div')`
  text-align: center;

  @media ${media.large} {
    @supports (display: grid) {
      align-items: center;
      display: flex;
      flex-direction: column;
      grid-column: 3 / span 2;
      justify-content: center;
      margin: 0;
      min-height: 85vh;
      padding-bottom: 2rem;
    }
  }
`;

const Image = styled(Img)`
  margin: 8vh auto 0;
  max-width: 400px;
  width: 100%;

  @media ${media.large} {
    @supports (display: grid) {
      margin-top: 0;
    }
  }
`;

const Heading = styled('h1')`
  font-size: 7.825vw;
  margin-left: auto;
  margin-right: auto;
  max-width: 420px;
  text-align: center;

  @media ${media.small} {
    font-size: 2.375rem;
  }

  @media ${media.vertSmall} {
    margin-bottom: 0.75rem;
    margin-top: 1.5rem;
  }

  @media ${media.medium} {
    font-size: 2rem;
  }
`;

const Benefits = styled('ul')`
  display: none;
  margin: 0 0 0.5rem;
  max-width: 320px;

  @media ${media.large} {
    @supports (display: grid) {
      display: block;
    }
  }
`;

const Button = styled('button')`
  background-color: ${colors.purple};
  border: 1px solid ${colors.lightest};
  border-radius: 0.25rem;
  box-shadow: 2px 2px 0 ${colors.grayAlphaExtra};
  color: ${colors.lightest};
  cursor: pointer;
  display: block;
  font-family: ${fonts.heading};
  font-size: 1.5rem;
  font-weight: 900;
  line-height: 1.5;
  margin-left: auto;
  margin-right: auto;
  max-width: 300px;
  padding: 0.25rem 0.5rem 0.125rem;
  text-transform: uppercase;
  transition: background-color ${animation.transitionTime} linear;
  width: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  :hover,
  :focus,
  :active {
    background-color: ${colors.darkest};
    outline: none;
  }
`;

const ScrollLink = styled('a')`
  border: 2px solid transparent;
  border-radius: 0.25rem;
  color: ${colors.gray};
  display: inline-block;
  font-size: 0.75rem;
  letter-spacing: 0.125em;
  margin-top: 0.5rem;
  padding: 0.25rem 0.5rem;
  text-align: center;
  text-decoration: none;

  @media ${media.medium} {
    margin-top: 0.75rem;
  }

  ::after {
    background-image: url(${downArrow});
    background-repeat: no-repeat;
    background-size: contain;
    content: '';
    display: block;
    height: 12px;
    margin: 0.125rem auto 0;
    width: 40px;
  }

  :focus,
  :active,
  :hover {
    background-color: transparent;
    color: currentColor;
    border-color: ${colors.purple};
  }

  @media ${media.large} {
    @supports (display: grid) {
      display: none;
    }
  }
`;

const Content = styled('div')`
  margin-top: 4rem;

  @media ${media.large} {
    @supports (display: grid) {
      grid-column: 2 / span 2;
      grid-row-start: 2;
      margin-top: 0;
    }
  }
`;

const Index = ({ data: { heroImage, page, popoverImages } }) => (
  <WithPopover
    heading={page.childMarkdownRemark.frontmatter.popover.heading}
    imageArr={popoverImages.edges}
    benefits={page.childMarkdownRemark.frontmatter.popover.benefits}
    button={page.childMarkdownRemark.frontmatter.popover.button}
    group={page.childMarkdownRemark.frontmatter.popover.group}
    source="/"
    render={openPopover => (
      <Main>
        <Hero>
          <Image
            // style={{ display: `inherit` }}
            alt="There’s more to life than hustle and grind."
            sizes={heroImage.childImageSharp.fluid}
          />
        </Hero>
        <Start>
          <Heading>You can be a success without the sacrifice.</Heading>
          <Benefits>
            <li>
              Stop burnout <em>before</em> it starts.
            </li>
            <li>Reclaim hours of every day.</li>
            <li>Get more done in less time.</li>
            <li>Spend more time on the things that matter most.</li>
          </Benefits>
          <Button onClick={handleClick(openPopover)}>Learn How</Button>
          <ScrollLink href="#home-content" onClick={scrollToContent}>
            scroll for more
          </ScrollLink>
        </Start>
        <Content
          id="home-content"
          dangerouslySetInnerHTML={{ __html: page.childMarkdownRemark.html }}
        />
      </Main>
    )}
  />
);

Index.propTypes = {
  data: PropTypes.shape({
    heroImage: PropTypes.any,
  }).isRequired,
};

export default Index;

export const query = graphql`
  query {
    heroImage: file(relativePath: { eq: "images/more-to-life-lengstorf.png" }) {
      childImageSharp {
        fluid(maxWidth: 400, traceSVG: { color: "#e7e3e8" }) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
    page: file(relativePath: { eq: "pages/home.md" }) {
      childMarkdownRemark {
        frontmatter {
          popover {
            heading
            benefits
            button
            group
          }
        }
        html
      }
    }
    popoverImages: allFile(
      filter: { relativePath: { regex: "/images/popover/" } }
    ) {
      edges {
        node {
          name
          childImageSharp {
            fluid(maxWidth: 660, traceSVG: { color: "#e7e3e8" }) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`;

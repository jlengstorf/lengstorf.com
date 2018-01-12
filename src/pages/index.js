/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import WithPopover from '../components/WithPopover';
import styles from '../styles/index.module.css';

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
  -change / 2 * (Math.cos(Math.PI * elapsed / length) - 1) + start;

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

const Index = ({ data: { page, popoverImages, heroImage } }) => (
  <WithPopover
    heading={page.frontmatter.popover.heading}
    imageArr={popoverImages.edges}
    benefits={page.frontmatter.popover.benefits}
    button={page.frontmatter.popover.button}
    group={page.frontmatter.popover.group}
    source={page.fields.slug}
    render={openPopover => (
      <Layout className={styles.main}>
        <div className={styles.hero}>
          <Img
            style={{ display: `inherit` }}
            className={`${styles.image}`}
            alt="There’s more to life than hustle and grind."
            sizes={heroImage.sizes}
          />
        </div>
        <div className={styles.start}>
          <h1 className={styles.heading}>
            You can be a success without the sacrifice.
          </h1>
          <ul className={styles.benefits}>
            <li>
              Stop burnout <em>before</em> it starts.
            </li>
            <li>Reclaim hours of every day.</li>
            <li>Get more done in less time.</li>
            <li>Spend more time on the things that matter most.</li>
          </ul>
          <button onClick={handleClick(openPopover)} className={styles.button}>
            Learn How
          </button>
          <a
            href="#home-content"
            onClick={scrollToContent}
            className={styles.scrollLink}
          >
            scroll for more
          </a>
        </div>
        <div
          id="home-content"
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: page.html }}
        />
      </Layout>
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
  query HomeQuery {
    heroImage: imageSharp(id: { regex: "/more-to-life-lengstorf/" }) {
      sizes(maxWidth: 400, traceSVG: { color: "#e7e3e8" }) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
    page: markdownRemark(id: { regex: "/pages/home/" }) {
      frontmatter {
        popover {
          heading
          benefits
          button
          group
        }
      }
      fields {
        slug
      }
      html
    }
    popoverImages: allImageSharp(
      filter: { id: { regex: "/popover/.*.jpg/" } }
    ) {
      edges {
        node {
          id
          sizes(maxWidth: 660, traceSVG: { color: "#e7e3e8" }) {
            ...GatsbyImageSharpSizes_tracedSVG
          }
        }
      }
    }
  }
`;

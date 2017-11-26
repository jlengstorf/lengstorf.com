import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
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
  { position, stepSize, increment, duration, callback = () => {} }
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

const Index = ({ data }) => (
  <Layout isHomePage>
    <Img
      style={{ display: `inherit` }}
      className={`${styles.mainImage}`}
      alt="There’s more to life than hustle and grind."
      sizes={data.heroImage.sizes}
    />
    <h1 className={`heading ${styles.mainHeading}`}>
      You can be a success without the sacrifice.
    </h1>
    <Link to="/page-2/" className="btn">
      Learn How
    </Link>

    <a
      href="#home-content"
      onKeyPress={event => {
        if (event.key === 'Enter') {
          scrollToContent(event);
        }
      }}
      onClick={scrollToContent}
      className={styles.scrollLink}
    >
      scroll for more
    </a>
    <div id="home-content" className={styles.mainContent}>
      <h2 className={styles.subHeading}>This is a subheading!</h2>
      <p>
        Spicy jalapeno bacon ipsum dolor amet nisi consequat anim irure ex kevin
        quis beef sed pig tail veniam beef ribs. Fugiat shank labore, prosciutto
        sausage est ut veniam corned beef. Eu short ribs sunt doner, chicken
        dolore picanha jowl pork loin capicola shankle officia tri-tip.
      </p>
      <h3>This is a really long heading at level 3</h3>
      <p>
        Kielbasa ribeye ipsum dolor pancetta adipisicing. Buffalo et culpa
        turkey shank tail proident id ea sed filet mignon chicken dolore duis
        adipisicing. Excepteur jowl ground round, chicken quis corned beef
        cillum esse doner reprehenderit salami shoulder nulla minim. Ea dolore
        sed strip steak.
      </p>
      <h4>This is heading level 4</h4>
      <p>
        Kielbasa ribeye ipsum dolor pancetta adipisicing. Buffalo et culpa
        turkey shank tail proident id ea sed filet mignon chicken dolore duis
        adipisicing. Excepteur jowl ground round, chicken quis corned beef
        cillum esse doner reprehenderit salami shoulder nulla minim. Ea dolore
        sed strip steak.
      </p>
      <h5>This is heading level 5</h5>
      <p>
        Kielbasa ribeye ipsum dolor pancetta adipisicing. Buffalo et culpa
        turkey shank tail proident id ea sed filet mignon chicken dolore duis
        adipisicing. Excepteur jowl ground round, chicken quis corned beef
        cillum esse doner reprehenderit salami shoulder nulla minim. Ea dolore
        sed strip steak.
      </p>
      <h6>This is heading level 6</h6>
      <p>
        Kielbasa ribeye ipsum dolor pancetta adipisicing. Buffalo et culpa
        turkey shank tail proident id ea sed filet mignon chicken dolore duis
        adipisicing. Excepteur jowl ground round, chicken quis corned beef
        cillum esse doner reprehenderit salami shoulder nulla minim. Ea dolore
        sed strip steak.
      </p>
      <p>
        Salami swine occaecat, sausage bacon flank exercitation sirloin alcatra
        id in pancetta. Qui excepteur laborum fatback, ut swine proident
        prosciutto lorem. Consequat boudin cupim officia elit reprehenderit.
        Andouille ad bacon qui, ipsum landjaeger venison in adipisicing cupim.
      </p>
      <p>
        Dolore beef shank irure picanha reprehenderit qui culpa hamburger
        alcatra pork chop. Salami short ribs sunt deserunt aliquip in elit,
        sausage cupim beef ribs. Prosciutto ut biltong cupidatat lorem. Nulla
        elit ea, swine shankle cow short loin. Chuck tail proident ham, aliquip
        tri-tip est sirloin velit picanha.
      </p>
      <p>
        Frankfurter aute pork dolore flank buffalo sirloin tongue landjaeger
        shoulder aliqua burgdoggen boudin. Kevin ad ut, tri-tip dolore
        incididunt anim tongue non drumstick. Sunt capicola tempor pork belly
        meatball jowl. Sirloin veniam reprehenderit strip steak buffalo dolor
        jowl ad. Shankle anim salami non meatball buffalo. Ham hock incididunt
        buffalo, sirloin tongue officia enim tempor drumstick ipsum exercitation
        commodo dolor.
      </p>
      <p>
        Picanha pork sirloin, leberkas quis filet mignon commodo prosciutto.
        Quis aliqua cupidatat hamburger tri-tip cupim. Aliquip anim swine
        sirloin officia proident, cillum dolor in pork exercitation non. Aliquip
        tempor reprehenderit, shoulder leberkas et non cupidatat dolore shank
        duis consectetur sint flank.
      </p>
    </div>
  </Layout>
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
  }
`;

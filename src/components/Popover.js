import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import Img from 'gatsby-image';
import crypto from 'crypto';
import OptIn from './OptIn';
import config from '../config';
import styles from '../styles/popover.module.css';

const getBenefitHash = benefit =>
  crypto
    .createHash('md5')
    .update(benefit)
    .digest('hex');

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
};

const handleOnDirectClick = handlerFn => event => {
  if (event.target.classList.contains(styles.overlay)) {
    event.preventDefault();
    handlerFn();
  }
};

const handleEnter = (hideClass, inputSelector) => node => {
  node.classList.remove(hideClass);
  document.querySelector(inputSelector).focus();
};

const handleExited = hideClass => node => node.classList.add(hideClass);

const Popover = ({
  visible,
  closeFn,
  heading,
  image,
  benefits,
  button,
  group,
  source,
}) => (
  <Transition
    in={visible}
    timeout={config.transitionSpeed}
    onEnter={handleEnter(styles.overlayHidden, `.${styles.formWrap} input`)}
    onExited={handleExited(styles.overlayHidden)}
  >
    {state => (
      // Adding a “click the background to close” functionality as a convenience
      // to mouse users. The close button is available for screen reader and
      // keyboard users, so I’m ignoring these a11y linter rules.
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
      <div
        className={`${styles.overlay} ${styles.overlayHidden}`}
        style={transitionStyles[state]}
        onClick={handleOnDirectClick(closeFn)} // TODO make sure this only fires on direct clicks
      >
        <div className={styles.popover}>
          <div className={styles.imageWrap}>
            <Img className={styles.image} sizes={image.sizes} alt="" />
          </div>
          <div className={styles.textWrap}>
            <h2 className={styles.heading}>{heading}</h2>
            <div className="popover__text">
              <ul>
                {benefits.map(benefit => (
                  <li
                    key={`benefit-${getBenefitHash(benefit)}`}
                    dangerouslySetInnerHTML={{ __html: benefit }}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.formWrap}>
            <OptIn button={button} group={group} source={source} />
            <p className={styles['opt-in-notice']}>
              Note: I will never share your email or spam you with nonsense.
              Because I’m not a dick.
            </p>
          </div>
        </div>
        <button className={styles.closeBtn} onClick={closeFn}>
          close
        </button>
      </div>
    )}
  </Transition>
);

Popover.propTypes = {
  closeFn: PropTypes.func.isRequired,
  heading: PropTypes.string,
  benefits: PropTypes.arrayOf(PropTypes.string).isRequired,
  button: PropTypes.string,
  group: PropTypes.string.isRequired,
  image: PropTypes.shape({ file: PropTypes.any }).isRequired,
  source: PropTypes.string,
  visible: PropTypes.bool,
};

Popover.defaultProps = {
  heading: 'What’s next?',
  button: 'Get It Now',
  source: null,
  visible: false,
};

export default Popover;

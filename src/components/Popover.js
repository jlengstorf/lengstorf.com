/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { injectGlobal } from 'emotion';
import { Transition } from 'react-transition-group';
import Img from 'gatsby-image';
import crypto from 'crypto';
import OptIn from './OptIn';
import config from '../config';
import { animation, colors, media } from '../config/styles';

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
  if (event.target.classList.contains('js--overlay')) {
    event.preventDefault();
    handlerFn();
  }
};

const handleEnter = (hideClass, inputSelector) => node => {
  node.classList.remove(hideClass);
  document.querySelector(inputSelector).focus();
};

const handleExited = hideClass => node => node.classList.add(hideClass);

// TODO fix hidden class thing
injectGlobal`
  .js--overlay-hidden {
    display: none;
    height: 0;
    left: -1;
    pointer-events: none;
    position: absolute;
    top: -1;
    width: 0;
    z-index: -1;
  }
`;

const Overlay = styled('div')`
  align-items: center;
  background: ${colors.lightestAlpha};
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  margin: 0;
  opacity: 0;
  overflow-y: auto;
  position: fixed;
  top: 0;
  transition: opacity ${animation.transitionTime} linear;
  width: 100vw;
  z-index: 1000;
`;

const PopoverContainer = styled('div')`
  margin: 2rem 0;
  max-width: 90%;
  width: 65ch;

  @supports (display: grid) {
    @media ${media.medium} {
      display: grid;
      grid-gap: 1rem 2rem;
      grid-template: repeat(2, auto) / auto 220px;
    }
  }
`;

const ImageWrap = styled('div')`
  @supports (display: grid) {
    @media ${media.medium} {
      align-items: center;
      display: flex;
      grid-column-start: 2;
      grid-row-start: 1;
      margin: 0;
    }
  }
`;

const Image = styled(Img)`
  border: 4px solid ${colors.grayAlpha};
  border-radius: 50%;
  display: none;
  margin: 0 auto;
  max-width: 150px;
  width: 100%;

  @media ${media.vertSmall} {
    display: block;
  }

  @supports (display: grid) {
    @media ${media.medium} {
      display: block;
      max-width: 250px;
    }
  }
`;

const TextWrap = styled('div')`
  @supports (display: grid) {
    @media ${media.medium} {
      grid-column-start: 1;
      grid-row-start: 1;
      margin: 0;
    }
  }
`;

const Heading = styled('h2')`
  font-size: 5.25vw;
  margin-top: 0.5rem;
  text-transform: uppercase;

  @media ${media.medium} {
    font-size: 1.75rem;
  }

  @supports (display: grid) {
    @media ${media.medium} {
      font-size: 1.25rem;
    }
  }
`;

const FormWrap = styled('div')`
  @supports (display: grid) {
    @media ${media.medium} {
      grid-row-start: 2;
      grid-column: span 2;
      margin: 0;
    }
  }
`;

const OptInNotice = styled('p')`
  color: ${colors.textLighter};
  font-size: 0.75rem;
  font-style: italic;
  margin-top: 0.75rem;
  text-align: center;
`;

const CloseButton = styled('button')`
  background: transparent;
  border: none;
  color: ${colors.gray};
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: lighter;
  letter-spacing: 0.1em;
  margin: 0;
  position: absolute;
  text-transform: uppercase;
  top: 0.5rem;
  right: 0.5rem;

  ::after {
    content: '×';
    font-size: 115%;
    margin-left: 4px;
  }
`;

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
    timeout={150}
    onEnter={handleEnter('js--overlay-hidden', '.js--form-wrap input')}
    onExited={handleExited('js--overlay-hidden')}
  >
    {state => (
      // Adding a “click the background to close” functionality as a convenience
      // to mouse users. The close button is available for screen reader and
      // keyboard users, so I’m ignoring these a11y linter rules.
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
      <Overlay
        className="js--overlay-hidden js--overlay"
        style={transitionStyles[state]}
        onClick={handleOnDirectClick(closeFn)} // TODO make sure this only fires on direct clicks
      >
        <PopoverContainer>
          <ImageWrap>
            <Image fluid={image.childImageSharp.fluid} alt="" />
          </ImageWrap>
          <TextWrap>
            <Heading>{heading}</Heading>
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
          </TextWrap>
          <FormWrap className="js--form-wrap">
            <OptIn button={button} group={group} source={source} />
            <OptInNotice>
              Note: I will never share your email or spam you with nonsense.
              Because I’m not a dick.
            </OptInNotice>
          </FormWrap>
        </PopoverContainer>
        <CloseButton onClick={closeFn}>close</CloseButton>
      </Overlay>
    )}
  </Transition>
);

Popover.propTypes = {
  closeFn: PropTypes.func.isRequired,
  heading: PropTypes.string,
  benefits: PropTypes.arrayOf(PropTypes.string).isRequired,
  button: PropTypes.string,
  group: PropTypes.string.isRequired,
  image: PropTypes.shape({ childImageSharp: PropTypes.any }).isRequired,
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

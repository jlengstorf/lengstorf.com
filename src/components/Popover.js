/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Img from 'gatsby-image';
import Overlay from './Overlay/Overlay';
import OptIn from './OptIn';
import { colors, media } from '../config/styles';

const PopoverContainer = styled('div')`
  margin: 2rem 0;
  max-width: 90%;
  pointer-events: all;
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
  <Overlay
    onEntered={() => document.querySelector(`${FormWrap} input`).focus()}
    hidePopover={closeFn}
    visible={visible}
  >
    <PopoverContainer>
      <ImageWrap>
        <Image fluid={image.childImageSharp.fluid} alt="" />
      </ImageWrap>
      <TextWrap>
        <Heading>{heading}</Heading>
        <ul>
          {benefits.map(benefit => (
            <li
              key={`benefit-${benefit}`}
              dangerouslySetInnerHTML={{ __html: benefit }}
            />
          ))}
        </ul>
      </TextWrap>
      <FormWrap>
        <OptIn button={button} group={group} source={source} />
        <OptInNotice>
          Note: I will never share your email or spam you with nonsense. Because
          I’m not a dick.
        </OptInNotice>
      </FormWrap>
    </PopoverContainer>
  </Overlay>
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

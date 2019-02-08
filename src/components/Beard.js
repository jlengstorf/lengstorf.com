import React from 'react';
import styled from '@emotion/styled';
import { media } from 'gatsby-theme-jason-blog';
import Beard from '../images/jason-lengstorf-beard.svg';

const BeardImage = styled('img')`
  display: block;
  margin: 5rem auto 1.5rem;

  @media ${media.vertSmall} {
    margin-top: 15vh;
  }

  @media ${media.large} {
    margin-top: 8rem;
  }
`;

export default () => (
  <BeardImage
    src={Beard}
    alt="Silhouette of Jason Lengstorf’s glasses and beard."
  />
);

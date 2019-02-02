import React from 'react';
import styled from '@emotion/styled';
import { graphql, StaticQuery } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import { media } from '../config/styles';

const Wrapper = styled('div')`
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

const Image = styled(GatsbyImage)`
  margin: 8vh auto 0;
  max-width: 400px;
  width: 100%;

  @media ${media.large} {
    @supports (display: grid) {
      margin-top: 0;
    }
  }
`;

export default () => (
  <StaticQuery
    query={graphql`
      query {
        heroImage: file(
          relativePath: { eq: "images/more-to-life-lengstorf.png" }
        ) {
          childImageSharp {
            fluid(maxWidth: 400, traceSVG: { color: "#e7e3e8" }) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    `}
    render={({ heroImage }) => (
      <Wrapper>
        <Image
          alt="There’s more to life than hustle and grind."
          fluid={heroImage.childImageSharp.fluid}
        />
      </Wrapper>
    )}
  />
);

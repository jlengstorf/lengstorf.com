/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Img from 'gatsby-image';
import { colors, media } from '../config/styles';
import { graphql, StaticQuery } from 'gatsby';

const Wrapper = styled('aside')`
  color: ${colors.gray};
  display: none;
  font-size: 0.625rem;
  text-align: center;

  @media ${media.large} {
    display: block;
  }
`;

const Image = styled(Img)`
  display: block;
  border: 1px solid ${colors.grayAlpha};
  border-radius: 50%;
  margin-left: auto;
  margin-right: auto;
  max-width: 120px;
`;

const Heading = styled('h3')`
  font-size: 0.875rem;
  margin-top: 0.75rem;
`;

const Text = styled('p')`
  margin-top: 0.25rem;
`;

const FloatingHead = ({ className }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            author {
              minibio
            }
          }
        }
        author: file(relativePath: { regex: "/jason-lengstorf-square/" }) {
          childImageSharp {
            fluid(maxWidth: 690, traceSVG: { color: "#e7e3e8" }) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    `}
    render={data => (
      <Wrapper className={className}>
        <Image
          alt="Jason Lengstorf."
          fluid={data.author.childImageSharp.fluid}
        />
        <Heading>About the Author</Heading>
        <Text
          dangerouslySetInnerHTML={{
            __html: data.site.siteMetadata.author.minibio,
          }}
        />
      </Wrapper>
    )}
  />
);

FloatingHead.propTypes = {
  className: PropTypes.string.isRequired,
};

export default FloatingHead;

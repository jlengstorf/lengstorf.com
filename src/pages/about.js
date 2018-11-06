/* eslint react/no-danger: "off" */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { graphql } from 'gatsby';
import SEO from '../components/SEO/SEO';
import Layout from '../components/Layout';
import OptIn from '../components/OptIn';
import OptInNotice from '../components/OptInNotice';
import Beard from '../images/jason-lengstorf-beard.svg';
import { media } from '../config/styles';

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

const Heading = styled('h1')`
  font-size: 1.5625rem;
  font-weight: 900;
  line-height: 1;
  margin: 0.5rem 0 0.25rem;
  text-align: center;
`;

const Subheading = styled('h2')`
  font-size: 1.25rem;
  font-weight: 900;
  line-height: 1;
  margin-top: 0.5rem;
  text-align: center;
`;

const OfficialBio = styled('div')`
  margin-bottom: 5rem;
  margin-top: 3rem;
`;

const Lede = styled('p')`
  font-size: 110%;
  margin-top: 0.25rem;
`;

const About = ({ data }) => (
  <Layout title={data.page.childMarkdownRemark.frontmatter.title}>
    <SEO pageData={data.page} />
    <BeardImage
      src={Beard}
      alt="Silhouette of Jason Lengstorf’s glasses and beard."
    />
    <Heading>I’m Jason Lengstorf.</Heading>
    <Subheading>
      Developer. Designer. Speaker. Friendly{' '}
      <span role="img" aria-label="Bear">
        🐻
      </span>
      .
    </Subheading>
    <OfficialBio>
      <p>
        <strong>
          <small>Super Official Third Person Bio™:</small>
        </strong>
      </p>
      <Lede>{data.page.childMarkdownRemark.frontmatter.bio}</Lede>
    </OfficialBio>
    <section
      dangerouslySetInnerHTML={{ __html: data.page.childMarkdownRemark.html }}
    />
    <OptIn
      button={data.page.childMarkdownRemark.frontmatter.optin.button}
      group={data.page.childMarkdownRemark.frontmatter.optin.group}
      source="/about/"
    />
    <OptInNotice>
      Note: I will never share your email or spam you with nonsense. Because I’m
      not a dick.
    </OptInNotice>
  </Layout>
);

About.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      childMarkdownRemark: PropTypes.shape({
        frontmatter: PropTypes.any.isRequired,
        html: PropTypes.string.isRequired,
      }),
    }).isRequired,
  }).isRequired,
};

export const query = graphql`
  query {
    page: file(relativePath: { eq: "pages/about.md" }) {
      childMarkdownRemark {
        html
        frontmatter {
          title
          bio
          optin {
            group
            button
          }
        }
      }
    }
  }
`;

export default About;

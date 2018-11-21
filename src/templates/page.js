/* eslint react/no-danger: "off" */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { graphql } from 'gatsby';
import SEO from '../components/SEO/SEO';
import Layout from '../components/Layout';
import OptIn from '../components/OptIn';
import OptInNotice from '../components/OptInNotice';
import ContentWithFootnotes from '../components/ContentWithFootnotes';

const ContentArea = styled('section')`
  > p:first-of-type {
    font-size: 110%;
  }
`;

const Page = ({ data: { page, image } }) => {
  const postImage =
    image && image.seo && image.seo.fluid && image.seo.fluid.src
      ? image.seo.fluid.src
      : null;

  return (
    <Layout title={page.childMdx.frontmatter.title}>
      <SEO postData={page} postImage={postImage} />
      <h1>{page.childMdx.frontmatter.title}</h1>
      <ContentWithFootnotes
        render={() => <ContentArea>{page.childMdx.code.body}</ContentArea>}
      />
      {page.childMdx.frontmatter.optin &&
        page.childMdx.frontmatter.optin.button && [
          <OptIn
            key={`optin-${page.childMdx.internal.contentDigest}`}
            button={page.childMdx.frontmatter.optin.button}
            group={page.childMdx.frontmatter.optin.group}
            source={page.name}
          />,
          <OptInNotice key={`notice-${page.childMdx.internal.contentDigest}`}>
            Note: I will never share your email or spam you with nonsense.
            Because I’m not a dick.
          </OptInNotice>,
        ]}
    </Layout>
  );
};

Page.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      childMdx: PropTypes.shape({
        frontmatter: PropTypes.shape({
          title: PropTypes.string.isRequired,
          optin: PropTypes.shape({
            button: PropTypes.string.isRequired,
            group: PropTypes.string.isRequired,
          }),
        }).isRequired,
        html: PropTypes.string.isRequired,
      }).isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export const query = graphql`
  query($slug: String!, $image: String!) {
    page: file(name: { eq: $slug }) {
      name
      childMdx {
        code {
          body
        }
        frontmatter {
          title
          description
          optin {
            button
            group
          }
        }
        internal {
          contentDigest
        }
      }
    }
    image: file(absolutePath: { eq: $image }) {
      seo: childImageSharp {
        fluid {
          src
        }
      }
    }
  }
`;

export default Page;

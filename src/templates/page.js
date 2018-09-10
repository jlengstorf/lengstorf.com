/* eslint react/no-danger: "off" */
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import OptIn from '../components/OptIn';
import ContentWithFootnotes from '../components/ContentWithFootnotes';
import styles from '../styles/page.module.css';

const Page = ({ data: { page } }) => (
  <Layout title={page.childMarkdownRemark.frontmatter.title}>
    <h1>{page.childMarkdownRemark.frontmatter.title}</h1>
    <ContentWithFootnotes
      render={() => (
        <section
          className={styles['content-area']}
          dangerouslySetInnerHTML={{ __html: page.childMarkdownRemark.html }}
        />
      )}
    />
    {page.childMarkdownRemark.frontmatter.optin &&
      page.childMarkdownRemark.frontmatter.optin.button && [
        <OptIn
          key={`optin-${page.childMarkdownRemark.internal.contentDigest}`}
          button={page.childMarkdownRemark.frontmatter.optin.button}
          group={page.childMarkdownRemark.frontmatter.optin.group}
          source={page.name}
        />,
        <p
          key={`notice-${page.childMarkdownRemark.internal.contentDigest}`}
          className={styles['opt-in-notice']}
        >
          Note: I will never share your email or spam you with nonsense. Because
          I’m not a dick.
        </p>,
      ]}
  </Layout>
);

Page.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      childMarkdownRemark: PropTypes.shape({
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
  query($slug: String!) {
    page: file(name: { eq: $slug }) {
      name
      childMarkdownRemark {
        html
        frontmatter {
          title
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
  }
`;

export default Page;

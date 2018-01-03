/* eslint react/no-danger: "off" */
import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import OptIn from '../components/OptIn';
import ContentWithFootnotes from '../components/ContentWithFootnotes';
import styles from '../styles/page.module.css';

const Page = ({ data: { page } }) => (
  <Layout title={page.frontmatter.title}>
    <h1>{page.frontmatter.title}</h1>
    <ContentWithFootnotes
      render={() => (
        <section
          className={styles['content-area']}
          dangerouslySetInnerHTML={{ __html: page.html }}
        />
      )}
    />
    {page.frontmatter.optin &&
      page.frontmatter.optin.button && [
        <OptIn
          key={`optin-${page.internal.contentDigest}`}
          button={page.frontmatter.optin.button}
          group={page.frontmatter.optin.group}
        />,
        <p
          key={`notice-${page.internal.contentDigest}`}
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
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        optin: PropTypes.shape({
          button: PropTypes.string.isRequired,
          group: PropTypes.string.isRequired,
        }),
      }).isRequired,
      html: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export const query = graphql`
  query PageQuery($slug: String!) {
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
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
`;

export default Page;

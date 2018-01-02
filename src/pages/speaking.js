/* eslint react/no-danger: "off" */
import React from 'react';
import PropTypes from 'prop-types';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import styles from '../styles/page.module.css';

const Speaking = ({ data }) => [
  <SEO key={`seo-${data.page.internal.contentDigest}`} postData={data.page} />,
  <Layout
    key={`main-${data.page.internal.contentDigest}`}
    title={data.page.frontmatter.title}
  >
    <h1>{data.page.frontmatter.title}</h1>
    <section
      className={styles['content-area']}
      dangerouslySetInnerHTML={{ __html: data.page.html }}
    />
  </Layout>,
];

Speaking.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      frontmatter: PropTypes.any.isRequired,
      html: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export const query = graphql`
  query SpeakingQuery {
    page: markdownRemark(id: { regex: "/pages/speaking/" }) {
      internal {
        contentDigest
      }
      html
      frontmatter {
        title
        description
      }
    }
  }
`;

export default Speaking;

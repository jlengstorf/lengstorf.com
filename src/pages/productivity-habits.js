/* eslint react/no-danger: "off" */
import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import OptIn from '../components/OptIn';
import styles from '../styles/page.module.css';

const ProductivityHabits = ({ data }) => (
  <Layout title={data.page.frontmatter.title}>
    <h1>{data.page.frontmatter.title}</h1>
    <section
      className={styles['content-area']}
      dangerouslySetInnerHTML={{ __html: data.page.html }}
    />
    <OptIn {...data.page.frontmatter} />
  </Layout>
);

ProductivityHabits.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      frontmatter: PropTypes.any.isRequired,
      html: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export const query = graphql`
  query ProductivityHabitsQuery {
    page: markdownRemark(id: { regex: "/pages/productivity-habits/" }) {
      html
      frontmatter {
        title
        group
        button
      }
    }
  }
`;

export default ProductivityHabits;

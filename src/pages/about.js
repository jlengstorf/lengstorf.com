/* eslint react/no-danger: "off" */
import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import OptIn from '../components/OptIn';
import Beard from '../images/jason-lengstorf-beard.svg';
import styles from '../styles/page.module.css';

const About = ({ data }) => (
  <Layout title={data.page.frontmatter.title}>
    <img
      src={Beard}
      alt="Silhouette of Jason Lengstorf’s glasses and beard."
      className={styles.beardImage}
    />
    <h1 className={styles['heading--centered']}>I’m Jason Lengstorf.</h1>
    <h2 className={styles.subheading}>
      Developer. Designer. Speaker. Friendly{' '}
      <span role="img" aria-label="Bear">
        🐻
      </span>.
    </h2>
    <div className={styles['official-bio']}>
      <p>
        <strong>
          <small>Super Official Third Person Bio™:</small>
        </strong>
      </p>
      <p className={styles.lede} style={{ marginTop: '0.25rem' }}>
        {data.page.frontmatter.bio}
      </p>
    </div>
    <section dangerouslySetInnerHTML={{ __html: data.page.html }} />
    <OptIn
      button={data.page.frontmatter.optin.button}
      group={data.page.frontmatter.optin.group}
      source="/about/"
    />
    <p className={styles['opt-in-notice']}>
      Note: I will never share your email or spam you with nonsense. Because I’m
      not a dick.
    </p>
  </Layout>
);

About.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      frontmatter: PropTypes.any.isRequired,
      html: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export const query = graphql`
  query AboutQuery {
    page: markdownRemark(id: { regex: "/pages/about/" }) {
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
`;

export default About;

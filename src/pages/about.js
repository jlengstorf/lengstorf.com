import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import Beard from '../images/jason-lengstorf-beard.svg';
import styles from '../styles/about.module.css';

const About = ({ data }) => (
  <Layout title="About">
    <img
      src={Beard}
      alt="Silhouette of Jason Lengstorf’s glasses and beard."
      className={styles.beardImage}
    />
    <h1 className="heading">
      I’m Jason Lengstorf. Developer. Designer. Speaker. Friendly{' '}
      <span role="img" aria-label="Bear">
        🐻
      </span>.
    </h1>
    <p>
      This should be about 25 words of intro description. This should be about
      25 words of intro description. This should be about 25 words of intro
      description.
    </p>
    <Img
      className="image--full-width"
      style={{ display: `inherit` }}
      alt="Jason Lengstorf in Tokyo."
      sizes={data.jasonImage.sizes}
    />
  </Layout>
);

About.propTypes = {
  data: PropTypes.shape({
    jasonImage: PropTypes.any.isRequired,
  }).isRequired,
};

export default About;

export const query = graphql`
  query AboutQuery {
    jasonImage: imageSharp(id: { regex: "/jason-lengstorf/" }) {
      sizes(maxWidth: 690, traceSVG: { color: "#e7e3e8" }) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
  }
`;

/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import styles from '../styles/floating-head.module.css';
import { graphql, StaticQuery } from 'gatsby';

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
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    `}
    render={data => (
      <aside className={`${className} ${styles.wrapper}`}>
        <Img
          className={styles.image}
          style={{ display: `inherit` }}
          alt="Jason Lengstorf."
          fluid={data.author.childImageSharp.fluid}
        />
        <h3 className={styles.heading}>About the Author</h3>
        <p
          className={styles.text}
          dangerouslySetInnerHTML={{
            __html: data.site.siteMetadata.author.minibio,
          }}
        />
      </aside>
    )}
  />
);

FloatingHead.propTypes = {
  className: PropTypes.string.isRequired,
};

export default FloatingHead;

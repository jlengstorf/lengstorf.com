import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

export default ({
  align = 'center',
  src,
  alt,
  caption,
  creditType = 'Credit',
  creditLink = null,
  credit,
}) => (
  <StaticQuery
    // This seems like a really bad idea — we’re loading all available images
    // and filtering them _every time_. However, it’s the only thing I could
    // think of that allows fluid images in MDX. 😱
    query={graphql`
      {
        allFile(filter: { relativePath: { regex: "/.*.(jpg|png)$/" } }) {
          totalCount
          edges {
            node {
              relativePath
              childImageSharp {
                fluid(maxWidth: 400, traceSVG: { color: "#e7e3e8" }) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const images = data.allFile.edges.map(({ node }) => node);
      const { childImageSharp: imgData } =
        images.find(img => img.relativePath.includes(src)) || {};

      if (!imgData || !imgData.fluid) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`The image ${src} was not found.`);
        }

        return null;
      }

      return (
        <figure className={`figure figure--${align}`}>
          <Image fluid={imgData.fluid} alt={alt} />
          {caption && (
            <figcaption className="figure__caption">
              <span dangerouslySetInnerHTML={{ __html: caption }} />
              {credit && (
                <small className="figure__attribution">
                  {creditType}:
                  {creditLink ? (
                    <a className="figure__attribution-link" href={creditLink}>
                      {credit}
                    </a>
                  ) : (
                    <span className="figure__attribution-link">{credit}</span>
                  )}
                </small>
              )}
            </figcaption>
          )}
        </figure>
      );
    }}
  />
);

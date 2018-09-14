/* eslint react/no-danger: "off" */
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import PostMeta from '../components/PostMeta';
import FloatingHead from '../components/FloatingHead';
import ContentWithFootnotes from '../components/ContentWithFootnotes';
import CTA from '../components/CTA';
import WithPopover from '../components/WithPopover';
import styles from '../styles/blog.module.css';

const getTitle = frontmatter => frontmatter.seo_title || frontmatter.title;

export default class BlogPost extends React.Component {
  // static propTypes = {
  //   data: PropTypes.shape({
  //     markdownRemark: PropTypes.any,
  //   }).isRequired,
  //   pageContext: PropTypes.shape({
  //     slug: PropTypes.string.isRequired,
  //   }).isRequired,
  // };

  render() {
    const {
      data: { postData, image, offer, popoverImages },
    } = this.props;
    const postID = postData.internal.contentDigest;

    const postImage =
      image && image.seo && image.seo.fluid && image.seo.fluid.src;
    if (!postImage) {
      throw Error(`Missing image for ${this.props.pageContext.slug}`);
    }

    return [
      <SEO
        key={`seo-${postID}`}
        postImage={postImage}
        postData={postData}
        isBlogPost
      />,
      <WithPopover
        key={`layout-${postID}`}
        heading={offer.childMarkdownRemark.frontmatter.popover.heading}
        imageArr={popoverImages.edges}
        benefits={offer.childMarkdownRemark.frontmatter.popover.benefits}
        button={offer.childMarkdownRemark.frontmatter.popover.button}
        group={offer.childMarkdownRemark.frontmatter.popover.group}
        source={`/${postData.childMarkdownRemark.frontmatter.slug}/`}
        render={() => (
          <Layout
            title={getTitle(postData.childMarkdownRemark.frontmatter)}
            className={styles.main}
          >
            <article className={styles.blog}>
              <header className={styles.header}>
                <h1 className={styles.heading}>
                  {postData.childMarkdownRemark.frontmatter.title}
                </h1>
              </header>
              <PostMeta
                className={styles.meta}
                thumb={image.thumb}
                categories={postData.childMarkdownRemark.frontmatter.category}
                tags={postData.childMarkdownRemark.frontmatter.tag}
              />
              <ContentWithFootnotes
                className={styles.article}
                render={() => (
                  <section
                    dangerouslySetInnerHTML={{
                      __html: postData.childMarkdownRemark.html,
                    }}
                  />
                )}
              />
              <CTA
                content={offer.childMarkdownRemark.html}
                button={offer.childMarkdownRemark.frontmatter.button}
                link={offer.childMarkdownRemark.frontmatter.link}
                className={styles.cta}
              />
              <FloatingHead />
            </article>
          </Layout>
        )}
      />,
    ];
  }
}

export const pageQuery = graphql`
  query($imageRegex: String!, $offer: String!, $relativePath: String!) {
    postData: file(relativePath: { eq: $relativePath }) {
      internal {
        contentDigest
      }
      childMarkdownRemark {
        html
        frontmatter {
          title
          description
          category
          tag
          datePublished: date(formatString: "YYYY-MM-DDTHH:mm:ssZ")
          images
          seo_title
          slug
          cta
        }
      }
    }
    offer: file(relativePath: { regex: $offer }) {
      childMarkdownRemark {
        html
        frontmatter {
          button
          link
          popover {
            heading
            benefits
            button
            group
          }
        }
      }
    }
    image: file(relativePath: { regex: $imageRegex }) {
      seo: childImageSharp {
        fluid(maxWidth: 1380) {
          src
        }
      }
      thumb: childImageSharp {
        fluid(maxWidth: 690, traceSVG: { color: "#e7e3e8" }) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
    popoverImages: allFile(
      filter: { relativePath: { regex: "/images/popover/" } }
    ) {
      edges {
        node {
          name
          childImageSharp {
            fluid(maxWidth: 660, traceSVG: { color: "#e7e3e8" }) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`;

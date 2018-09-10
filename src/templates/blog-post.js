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
  static propTypes = {
    data: PropTypes.shape({
      markdownRemark: PropTypes.any,
    }).isRequired,
    pageContext: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const {
      data: { postData, imageSharp, offer, thumb, author, popoverImages },
    } = this.props;
    const postID = postData.internal.contentDigest;

    const postImage = imageSharp && imageSharp.sizes && imageSharp.sizes.src;
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
        heading={offer.frontmatter.popover.heading}
        imageArr={popoverImages.edges}
        benefits={offer.frontmatter.popover.benefits}
        button={offer.frontmatter.popover.button}
        group={offer.frontmatter.popover.group}
        source={`/${postData.frontmatter.slug}/`}
        render={() => (
          <Layout
            title={getTitle(postData.frontmatter)}
            className={styles.main}
          >
            <article className={styles.blog}>
              <header className={styles.header}>
                <h1 className={styles.heading}>{postData.frontmatter.title}</h1>
              </header>
              <PostMeta
                className={styles.meta}
                thumb={thumb}
                categories={postData.frontmatter.category}
                tags={postData.frontmatter.tag}
              />
              <ContentWithFootnotes
                className={styles.article}
                render={() => (
                  <section
                    dangerouslySetInnerHTML={{ __html: postData.html }}
                  />
                )}
              />
              <CTA
                content={offer.html}
                button={offer.frontmatter.button}
                link={offer.frontmatter.link}
                className={styles.cta}
              />
              <FloatingHead className={styles.floatingHead} thumb={author} />
            </article>
          </Layout>
        )}
      />,
    ];
  }
}

// export const pageQuery = graphql`
//   query BlogPostBySlug($slug: String!, $imageRegex: String!, $offer: String!) {
//     postData: markdownRemark(fields: { slug: { eq: $slug } }) {
//       internal {
//         contentDigest
//       }
//       html
//       frontmatter {
//         title
//         description
//         category
//         tag
//         # Used for schema.org
//         datePublished: date(formatString: "YYYY-MM-DDTHH:mm:ssZ")
//         images
//         seo_title
//         slug
//         cta
//       }
//       fields {
//         slug
//       }
//     }
//     offer: markdownRemark(id: { regex: $offer }) {
//       html
//       frontmatter {
//         button
//         link
//         popover {
//           heading
//           benefits
//           button
//           group
//         }
//       }
//     }
//     imageSharp(id: { regex: $imageRegex }) {
//       sizes(maxWidth: 1380) {
//         src
//       }
//     }
//     author: imageSharp(id: { regex: "/jason-lengstorf-square/" }) {
//       sizes(maxWidth: 690, traceSVG: { color: "#e7e3e8" }) {
//         ...GatsbyImageSharpSizes_tracedSVG
//       }
//     }
//     thumb: imageSharp(id: { regex: $imageRegex }) {
//       sizes(maxWidth: 690, traceSVG: { color: "#e7e3e8" }) {
//         ...GatsbyImageSharpSizes_tracedSVG
//       }
//     }
//     popoverImages: allImageSharp(
//       filter: { id: { regex: "/popover/.*.jpg/" } }
//     ) {
//       edges {
//         node {
//           id
//           sizes(maxWidth: 660, traceSVG: { color: "#e7e3e8" }) {
//             ...GatsbyImageSharpSizes_tracedSVG
//           }
//         }
//       }
//     }
//   }
// `;

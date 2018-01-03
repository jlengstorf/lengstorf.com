/* eslint react/no-danger: "off" */
import React from 'react';
import PropTypes from 'prop-types';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import PostMeta from '../components/PostMeta';
import FloatingHead from '../components/FloatingHead';
import ContentWithFootnotes from '../components/ContentWithFootnotes';
import CTA from '../components/CTA';
import Popover from '../components/Popover';
import styles from '../styles/blog.module.css';

const getTitle = frontmatter => frontmatter.seo_title || frontmatter.title;

const getPopoverData = (data, images) => ({
  ...data,
  image: images[`popoverImage${data.group}`],
});

export default class BlogPost extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      markdownRemark: PropTypes.any,
    }).isRequired,
    pathContext: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    showPopover: false,
  };

  openPopover = () =>
    this.setState(prevState => ({ ...prevState, showPopover: true }));
  closePopover = () =>
    this.setState(prevState => ({ ...prevState, showPopover: false }));

  render() {
    const {
      data: {
        postData,
        imageSharp,
        offer,
        thumb,
        author,
        popoverImageTRAVEL,
        popoverImageWORKHAPPY,
        popoverImagePRODUCTIVE,
        popoverImageDEFAULT,
      },
    } = this.props;
    const postID = postData.internal.contentDigest;
    const popoverProps = getPopoverData(offer.frontmatter.popover, {
      popoverImageDEFAULT,
      popoverImagePRODUCTIVE,
      popoverImageTRAVEL,
      popoverImageWORKHAPPY,
    });

    const postImage = imageSharp && imageSharp.sizes && imageSharp.sizes.src;
    if (!postImage) {
      console.error(`Missing image for ${this.props.pathContext.slug}`);
    }

    return [
      <SEO
        key={`seo-${postID}`}
        postImage={postImage}
        postData={postData}
        isBlogPost
      />,
      <Layout
        key={`layout-${postID}`}
        title={getTitle(postData.frontmatter)}
        blog
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
              <section dangerouslySetInnerHTML={{ __html: postData.html }} />
            )}
          />
          <CTA
            content={offer.html}
            button={offer.frontmatter.button}
            link={offer.frontmatter.link}
            className={styles.cta}
            clickHandler={this.openPopover}
          />
          <FloatingHead className={styles.floatingHead} thumb={author} />
        </article>
      </Layout>,
      <Popover
        key={`popover-${postID}`}
        {...popoverProps}
        visible={this.state.showPopover}
        closeFn={this.closePopover}
      />,
    ];
  }
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $imageRegex: String!, $offer: String!) {
    postData: markdownRemark(fields: { slug: { eq: $slug } }) {
      internal {
        contentDigest
      }
      html
      frontmatter {
        title
        description
        category
        tag
        # Used for schema.org
        datePublished: date(formatString: "YYYY-MM-DDTHH:mm:ssZ")
        images
        seo_title
        slug
        cta
      }
    }
    offer: markdownRemark(id: { regex: $offer }) {
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
    imageSharp(id: { regex: $imageRegex }) {
      sizes(maxWidth: 1380) {
        src
      }
    }
    author: imageSharp(id: { regex: "/jason-lengstorf-square/" }) {
      sizes(maxWidth: 690, traceSVG: { color: "#e7e3e8" }) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
    thumb: imageSharp(id: { regex: $imageRegex }) {
      sizes(maxWidth: 690, traceSVG: { color: "#e7e3e8" }) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
    popoverImageWORKHAPPY: imageSharp(
      id: { regex: "/jason-marisa-barcelona/" }
    ) {
      sizes(maxWidth: 660, traceSVG: { color: "#e7e3e8" }) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
    popoverImageTRAVEL: imageSharp(id: { regex: "/jason-marisa-flags/" }) {
      sizes(maxWidth: 660, traceSVG: { color: "#e7e3e8" }) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
    popoverImagePRODUCTIVE: imageSharp(
      id: { regex: "/jason-marisa-barcelona/" }
    ) {
      sizes(maxWidth: 660, traceSVG: { color: "#e7e3e8" }) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
    popoverImageDEFAULT: imageSharp(id: { regex: "/jason-tokyo/" }) {
      sizes(maxWidth: 660, traceSVG: { color: "#e7e3e8" }) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
  }
`;

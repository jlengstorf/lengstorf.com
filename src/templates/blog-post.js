/* eslint react/no-danger: "off" */
import React from 'react';
import PropTypes from 'prop-types';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import Footnotes from '../components/Footnotes';
import CTA from '../components/CTA';
import styles from '../styles/blog.module.css';

const getTitle = frontmatter => frontmatter.seo_title || frontmatter.title;

export default class BlogPost extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      markdownRemark: PropTypes.any,
    }).isRequired,
  };

  state = {
    footnoteNumber: 1,
    footnoteContent: '',
    footnoteActive: false,
  };

  footnoteClose = () => {
    this.setState({
      footnoteActive: false,
      footnoteNumber: 0,
      footnoteContent: '',
    });
  };

  handleFootnoteClose = event => {
    event.preventDefault();

    this.footnoteClose();
  };

  handleLinkClicks = event => {
    if (event.target.classList.contains('footnote-ref')) {
      event.preventDefault();

      if (this.state.footnoteActive) {
        this.footnoteClose();
        return;
      }

      const footnoteLink = event.target;
      const targetID = new URL(footnoteLink.href).hash;

      // Remove any non-numeric characters and force to a number value with `+`.
      const footnoteNumber = +targetID.replace(/\D*/, '');
      const footnoteContent = document.querySelector(targetID).innerHTML;

      this.setState({
        footnoteActive: true,
        footnoteNumber,
        footnoteContent,
      });
    }
  };

  render() {
    const { data: { markdownRemark: postData, imageSharp } } = this.props;
    const postID = postData.internal.contentDigest;

    // TODO get the rest of the images in place.
    const postImage = imageSharp && imageSharp.sizes && imageSharp.sizes.src;
    if (!postImage) {
      console.log(`TODO: Add image for ${this.props.pathContext.slug}`);
    }

    return [
      <SEO
        key={`seo-${postID}`}
        postImage={postImage}
        postData={postData}
        isBlogPost
      />,
      <Layout key={`layout-${postID}`} title={getTitle(postData.frontmatter)}>
        <article>
          <header>
            <h1 className={styles.blogHeading}>{postData.frontmatter.title}</h1>
          </header>
          <section
            onClick={this.handleLinkClicks}
            dangerouslySetInnerHTML={{ __html: postData.html }}
          />
          <CTA type={postData.frontmatter.cta} />
        </article>
        <Footnotes
          isActive={this.state.footnoteActive}
          number={this.state.footnoteNumber}
          content={this.state.footnoteContent}
          handleClose={this.handleFootnoteClose}
        />
      </Layout>,
    ];
  }
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $imageRegex: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      internal {
        contentDigest
      }
      html
      frontmatter {
        title
        # Used for schema.org
        datePublished: date(formatString: "YYYY-MM-DDTHH:mm:ssZ")
        images
        seo_title
        slug
        cta
      }
    }
    imageSharp(id: { regex: $imageRegex }) {
      sizes(maxWidth: 1380) {
        src
      }
    }
  }
`;

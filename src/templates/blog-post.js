/* eslint react/no-danger: "off" */
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'react-emotion';
import SEO from '../components/SEO/SEO';
import Layout from '../components/Layout';
import PostMeta from '../components/PostMeta';
import FloatingHead from '../components/FloatingHead';
import ContentWithFootnotes from '../components/ContentWithFootnotes';
import CTA from '../components/CTA';
import WithPopover from '../components/WithPopover';
import { media } from '../config/styles';

const getTitle = frontmatter => frontmatter.seo_title || frontmatter.title;

const BlogLayout = styled(Layout)`
  margin: 5rem auto 6rem;

  @media ${media.medium} {
    max-width: 100%;
    width: 57ch;
  }

  @media ${media.large} {
    @supports (display: grid) {
      width: calc(160px + 2rem + 57ch);
    }
  }
`;

const Blog = styled('article')`
  margin-bottom: 5rem;

  @media ${media.large} {
    @supports (display: grid) {
      display: grid;
      grid-auto-flow: column;
      grid-column-gap: 2rem;
      grid-template: repeat(2, auto) / 170px 1fr;
    }
  }
`;

const Header = styled('header')`
  @media ${media.large} {
    @supports (display: grid) {
      grid-column-start: 2;
    }
  }
`;

const Content = styled(ContentWithFootnotes)`
  @media ${media.large} {
    @supports (display: grid) {
      grid-column-start: 2;
    }
  }
`;

const CallToAction = styled(CTA)`
  @media ${media.large} {
    @supports (display: grid) {
      grid-column-start: 2;
    }
  }
`;

const Meta = styled(PostMeta)`
  @media ${media.large} {
    @supports (display: grid) {
      grid-column-start: 1;
      grid-row-start: 2;
    }
  }
`;

const Author = styled(FloatingHead)`
  @media ${media.large} {
    @supports (display: grid) {
      grid-column-start: 1;
      grid-row-start: 3;
      margin-top: 2rem;
    }
  }
`;

const BlogHeading = styled('h1')`
  font-size: 1.6rem;

  @media ${media.medium} {
    font-size: 1.875rem;
  }
`;

export default class BlogPost extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      postData: PropTypes.any,
      image: PropTypes.any,
      offer: PropTypes.any,
      popoverImages: PropTypes.any,
    }).isRequired,
    pageContext: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
  };

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
          <BlogLayout
            title={getTitle(postData.childMarkdownRemark.frontmatter)}
          >
            <Blog>
              <Header>
                <BlogHeading>
                  {postData.childMarkdownRemark.frontmatter.title}
                </BlogHeading>
              </Header>
              <Meta
                thumb={image.thumb}
                categories={postData.childMarkdownRemark.frontmatter.category}
                tags={postData.childMarkdownRemark.frontmatter.tag}
              />
              <Content
                render={() => <section>{postData.childMdx.code.body}</section>}
              />
              <CallToAction
                content={offer.childMarkdownRemark.html}
                button={offer.childMarkdownRemark.frontmatter.button}
                link={offer.childMarkdownRemark.frontmatter.link}
              />
              <Author />
            </Blog>
          </BlogLayout>
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
      childMdx {
        code {
          body
        }
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
      childMdx {
        code {
          body
        }
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
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
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
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`;

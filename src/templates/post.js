import React, { useMemo } from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import styled from 'react-emotion';
import SEO from '../components/SEO/SEO';
import Layout from '../components/Layout';
import PostMeta from '../components/PostMeta';
import FloatingHead from '../components/FloatingHead';
import ContentArea from '../components/ContentArea';
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

export default ({ data: { post, offer, image } }) => {
  if (
    !offer ||
    !offer.childMarkdownRemark ||
    !offer.childMarkdownRemark.frontmatter
  ) {
    throw Error(`Missing offer details for ${post.frontmatter.slug}`);
  }

  const {
    childMarkdownRemark: {
      html,
      frontmatter: { popover, button, link },
    },
  } = offer;

  // Prevent rerenders when footnotes/popovers change.
  const content = useMemo(() => <MDXRenderer>{post.code.body}</MDXRenderer>);

  return (
    <React.Fragment>
      <SEO
        frontmatter={post.frontmatter}
        postImage={image.seo.fluid.src}
        isBlogPost
      />
      <WithPopover
        heading={popover.heading}
        benefits={popover.benefits}
        button={popover.button}
        group={popover.group}
        source={`/${post.frontmatter.slug}/`}
        render={() => (
          <BlogLayout title={getTitle(post.frontmatter)}>
            <Blog>
              <Header>
                <BlogHeading>{post.frontmatter.title}</BlogHeading>
              </Header>
              <Meta
                thumb={image.thumb}
                categories={post.frontmatter.category}
                tags={post.frontmatter.tag}
              />
              <Content render={() => <ContentArea>{content}</ContentArea>} />
              <CallToAction content={html} button={button} link={link} />
              <Author />
            </Blog>
          </BlogLayout>
        )}
      />
    </React.Fragment>
  );
};

export const pageQuery = graphql`
  query($slug: String!, $imageRegex: String!, $offer: String!) {
    post: mdx(frontmatter: { slug: { eq: $slug } }) {
      code {
        scope
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
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
  }
`;

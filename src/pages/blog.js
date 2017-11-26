import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Layout from '../components/Layout';

const Blog = ({ data }) => (
  <Layout title="Blog">
    <h1>Blog</h1>
    <p>This will be the blog page.</p>
    {data.posts.edges.map(({ node: post }) => (
      <div key={post.id}>
        <h2>
          <Link to={`/${post.frontmatter.slug}`}>{post.frontmatter.title}</Link>
        </h2>
        <p>
          {post.frontmatter.description
            ? post.frontmatter.description
            : post.excerpt}
        </p>
      </div>
    ))}
  </Layout>
);

Blog.propTypes = {
  data: PropTypes.shape({
    posts: PropTypes.any.isRequired,
  }).isRequired,
};

export const query = graphql`
  query BlogQuery {
    posts: allMarkdownRemark(
      limit: 20
      skip: 0
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { publish: { ne: false } } }
    ) {
      totalCount
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          id
          frontmatter {
            title
            slug
            description
            date(formatString: "MMMM DD, YYYY")
            images
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;

export default Blog;

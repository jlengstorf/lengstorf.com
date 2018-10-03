const path = require('path');
const template = require('lodash.template');

const getUnique = (field, posts) =>
  posts.reduce((uniques, { node: post }) => {
    const values = post.childMarkdownRemark.frontmatter[field];

    return uniques.concat(values.filter(val => !uniques.includes(val)));
  }, []);

const groupPostsByUnique = (field, posts) => {
  const uniqueValues = getUnique(field, posts);

  return uniqueValues.reduce(
    (grouped, unique) => ({
      ...grouped,
      [unique]: posts.filter(({ node: post }) =>
        post.childMarkdownRemark.frontmatter[field].includes(unique),
      ),
    }),
    {},
  );
};

// Add paginated blog preview pages. Here’s how it works:
//
// 1.  We map over all the posts and — when we get to a post that starts
//     a page — we slice the appropriate number of posts into a group.
//     For all the other posts, we return `null`. This gives us
//     something like `[[{post, ...}, null, null, {post, ...}, ...]]`
// 2.  Next, we filter out all `null` entries.
// 3.  Finally, we create a new page for each post group.
//
// Adapted from https://github.com/pixelstew/gatsby-paginate
const paginate = (
  { pathTemplate, createPage, component, type, value },
  posts,
) =>
  posts
    // 1
    .map(
      (post, index, allPosts) =>
        index % 10 === 0 ? allPosts.slice(index, index + 10) : null,
    )
    // 2
    .filter(item => item)
    // 3
    .forEach((postGroup, index, allGroups) => {
      const isFirstPage = index === 0;
      const currentPage = index + 1;
      const totalPages = allGroups.length;
      const getPath = template(pathTemplate);

      createPage({
        path: getPath({ pageNumber: isFirstPage ? '' : currentPage }),
        component,
        context: {
          postGroup,
          type,
          value,
          currentPage,
          totalPages,
          isFirstPage,
          isLastPage: currentPage === totalPages,
          linkBase: getPath({ pageNumber: '' }),
        },
      });
    });

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  // The /hire-me page no longer exists, so send to contact instead.
  createRedirect({
    fromPath: '/hire-me',
    toPath: '/contact',
    isPermanent: true,
    redirectInBrowser: true,
  });

  // The /cost-of-living page no longer exists, so send to the blog instead.
  createRedirect({
    fromPath: '/cost-of-living',
    toPath: '/cost-of-living-remotely',
    isPermanent: true,
    redirectInBrowser: true,
  });

  const templates = {
    page: path.resolve('src/templates/page.js'),
    post: path.resolve('src/templates/blog-post.js'),
    previews: path.resolve('src/templates/previews.js'),
  };

  const result = await graphql(`
    {
      pages: allFile(filter: { relativeDirectory: { eq: "pages" } }) {
        edges {
          node {
            name
            childMarkdownRemark {
              frontmatter {
                generate
              }
            }
          }
        }
      }
      posts: allFile(
        filter: { relativePath: { glob: "posts/**/*.md" } }
        sort: { fields: relativePath, order: DESC }
      ) {
        edges {
          node {
            id
            relativePath
            childMarkdownRemark {
              frontmatter {
                title
                description
                slug
                images
                cta
                category
                tag
              }
            }
          }
        }
      }
    }
  `);

  const pages = result.data.pages.edges;
  const posts = result.data.posts.edges;

  pages
    .filter(
      ({ node: page }) =>
        page.childMarkdownRemark.frontmatter.generate !== false,
    )
    .forEach(({ node: page }) => {
      createPage({
        path: page.name,
        component: templates.page,
        context: {
          slug: page.name,
        },
      });
    });

  posts.forEach(({ node: post }) => {
    if (!post.childMarkdownRemark.frontmatter.slug) {
      throw Error('All posts require a `slug` field in the frontmatter.');
    }

    const { slug } = post.childMarkdownRemark.frontmatter;

    // If an image was supplied, let’s grab it.
    const image =
      post.childMarkdownRemark.frontmatter.images &&
      post.childMarkdownRemark.frontmatter.images[0];

    // Add the offer type
    const offer = `/offers/${post.childMarkdownRemark.frontmatter.cta ||
      'default'}/`;

    createPage({
      path: slug,
      component: templates.post,
      context: {
        imageRegex: `/${image}/`,
        slug,
        offer,
        relativePath: post.relativePath,
      },
    });
  });

  const paginationDefaults = { createPage, component: templates.previews };

  const allPosts = result.data.posts.edges.filter(
    ({ node }) => node.childMarkdownRemark.frontmatter.publish !== false,
  );

  const createPages = (type, postArray) => {
    const groupedPosts = groupPostsByUnique(type, postArray);

    Object.entries(groupedPosts).forEach(data => {
      const typeValue = data[0];
      const postGroup = data[1];

      paginate(
        {
          ...paginationDefaults,
          pathTemplate: `/blog/${type}/${typeValue}/<%= pageNumber %>`,
          type,
          value: typeValue,
        },
        postGroup,
      );
    });
  };

  createPages('tag', allPosts);
  createPages('category', allPosts);

  paginate(
    {
      ...paginationDefaults,
      pathTemplate: '/blog/<%= pageNumber %>',
      type: 'all',
      value: null,
    },
    allPosts,
  );

  // Create an alias for the first page of blog listings.
  createRedirect({
    fromPath: '/blog/1',
    toPath: '/blog/',
    isPermanent: true,
    redirectInBrowser: true,
  });
};

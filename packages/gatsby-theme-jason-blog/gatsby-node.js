const path = require('path');
const template = require('lodash.template');

const getUnique = (field, posts) =>
  posts.reduce((uniques, post) => {
    const values = post.childMdx.frontmatter[field];

    return uniques.concat(values.filter(val => !uniques.includes(val)));
  }, []);

const groupPostsByUnique = (field, posts) => {
  const uniqueValues = getUnique(field, posts);

  return uniqueValues.reduce(
    (grouped, unique) => ({
      ...grouped,
      [unique]: posts.filter(post =>
        post.childMdx.frontmatter[field].includes(unique),
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
      (_, index, allPosts) =>
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

// This is a shortcut so MDX can import components without gross relative paths.
// Example: import { Figure } from '$components';
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      alias: { $components: path.resolve(__dirname, "src/components") }
    }
  });
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: "@babel/plugin-proposal-export-default-from"
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  const result = await graphql(`
    {
      posts: allFile(
        filter: { relativePath: { glob: "posts/**/*.{md,mdx}" } }
        sort: { fields: relativePath, order: DESC }
      ) {
        edges {
          node {
            id
            childMdx {
              code {
                scope
              }
              frontmatter {
                publish
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

  const posts = result.data.posts.edges
    .map(({ node }) => node)
    .filter(post => post.childMdx.frontmatter.publish !== false);

  posts.forEach(post => {
    if (!post.childMdx || !post.childMdx.frontmatter || !post.childMdx.frontmatter.slug) {
      console.log(post); // eslint-disable-line no-console
      throw Error('All posts require a `slug` field in the frontmatter.');
    }

    const { slug, images, cta = 'default' } = post.childMdx.frontmatter;

    const image = images && images[0];

    createPage({
      path: slug,
      component: require.resolve('./src/templates/post.js'),
      context: {
        imageRegex: `/${image}/`,
        offer: `/offers/${cta}/`,
        slug,
      }
    })
  });

  const paginationDefaults = {
    createPage,
    component: require.resolve('./src/templates/previews.js')
  };

  const allPosts = posts.filter(
    post => post.childMdx.frontmatter.publish !== false,
  );

  const createPages = (type, postArray) => {
    const groupedPosts = groupPostsByUnique(type, postArray);

    Object.entries(groupedPosts).forEach(([typeValue, postGroup]) => {
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

  // Create an alias for the first page of blog listings.
  createRedirect({
    fromPath: '/blog/1',
    toPath: '/blog/',
    isPermanent: true,
    redirectInBrowser: true,
  });
};

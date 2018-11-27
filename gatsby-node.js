const path = require('path');
const template = require('lodash.template');
const componentWithMDXScope = require('gatsby-mdx/component-with-mdx-scope');

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

const createPostsMDX = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const templates = {
    post: path.resolve('src/templates/mdx-post.js')
  };

  const result = await graphql(`
    {
      posts: allFile(
        filter: { relativePath: { glob: "posts/**/*.md" } }
        sort: { fields: relativePath, order: DESC }
      ) {
        edges {
          node {
            id
            relativePath
            childMdx {
              code {
                scope
              }
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

  const posts = result.data.posts.edges.map(({ node }) => node);

  posts.forEach(post => {
    if (!post.childMdx || !post.childMdx.frontmatter || !post.childMdx.frontmatter.slug) {
      console.log(post);
      throw Error('All posts require a `slug` field in the frontmatter.');
    }

    const { slug, images, cta = 'default' } = post.childMdx.frontmatter;

    const image = images && images[0];

    createPage({
      path: `mdx/${slug}`,
      component: componentWithMDXScope(
        templates.post,
        post.childMdx.code.scope,
      ),
      context: {
        imageRegex: `/${image}/`,
        offer: `/offers/${cta}/`,
        relativePath: post.relativePath,
        slug,
      }
    })
  });
}

exports.createPages = async ({ graphql, actions }) => {
  createPostsMDX({ graphql, actions });

  const { createRedirect } = actions;

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

  // const templates = {
  //   page: path.resolve('src/templates/page.js'),
  //   post: path.resolve('src/templates/blog-post.js'),
  //   previews: path.resolve('src/templates/previews.js'),
  // };

  // const result = await graphql(`
  //   {
  //     posts: allFile(
  //       filter: { relativePath: { glob: "posts/**/*.md" } }
  //       sort: { fields: relativePath, order: DESC }
  //     ) {
  //       edges {
  //         node {
  //           id
  //           relativePath
  //           childMarkdownRemark {
  //             frontmatter {
  //               title
  //               description
  //               slug
  //               images
  //               cta
  //               category
  //               tag
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // `);

  // const posts = result.data.posts.edges;

  // posts.forEach(({ node: post }) => {
  //   if (!post.childMarkdownRemark.frontmatter.slug) {
  //     throw Error('All posts require a `slug` field in the frontmatter.');
  //   }

  //   const { slug, images, cta = 'default' } = post.childMarkdownRemark.frontmatter;

  //   // If an image was supplied, let’s grab it.
  //   const image = images && images[0];

  //   createPage({
  //     path: slug,
  //     component: templates.post,
  //     context: {
  //       imageRegex: `/${image}/`,
  //       offer: `/offers/${cta}/`,
  //       relativePath: post.relativePath,
  //       slug,
  //     },
  //   });
  // });

  // const paginationDefaults = { createPage, component: templates.previews };

  // const allPosts = posts.filter(
  //   ({ node }) => node.childMarkdownRemark.frontmatter.publish !== false,
  // );

  // const createPages = (type, postArray) => {
  //   const groupedPosts = groupPostsByUnique(type, postArray);

  //   Object.entries(groupedPosts).forEach(([typeValue, postGroup]) => {
  //     paginate(
  //       {
  //         ...paginationDefaults,
  //         pathTemplate: `/blog/${type}/${typeValue}/<%= pageNumber %>`,
  //         type,
  //         value: typeValue,
  //       },
  //       postGroup,
  //     );
  //   });
  // };

  // createPages('tag', allPosts);
  // createPages('category', allPosts);

  // paginate(
  //   {
  //     ...paginationDefaults,
  //     pathTemplate: '/blog/<%= pageNumber %>',
  //     type: 'all',
  //     value: null,
  //   },
  //   allPosts,
  // );

  // Create an alias for the first page of blog listings.
  createRedirect({
    fromPath: '/blog/1',
    toPath: '/blog/',
    isPermanent: true,
    redirectInBrowser: true,
  });
};

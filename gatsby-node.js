const path = require('path');
// const template = require('lodash.template');
// const config = require('./src/config');

// const getUnique = (field, posts) =>
//   posts.reduce((uniques, { node: post }) => {
//     const values = post.frontmatter[field];

//     return uniques.concat(values.filter(val => !uniques.includes(val)));
//   }, []);

// const groupPostsByUnique = (field, posts) => {
//   const uniqueValues = getUnique(field, posts);

//   return uniqueValues.reduce(
//     (grouped, unique) => ({
//       ...grouped,
//       [unique]: posts.filter(({ node: post }) =>
//         post.frontmatter[field].includes(unique),
//       ),
//     }),
//     {},
//   );
// };

// // Add paginated blog preview pages. Here’s how it works:
// //
// // 1.  We map over all the posts and — when we get to a post that starts
// //     a page — we slice the appropriate number of posts into a group.
// //     For all the other posts, we return `null`. This gives us
// //     something like `[[{post, ...}, null, null, {post, ...}, ...]]`
// // 2.  Next, we filter out all `null` entries.
// // 3.  Finally, we create a new page for each post group.
// //
// // Adapted from https://github.com/pixelstew/gatsby-paginate
// const paginate = (
//   { pathTemplate, createPage, component, type, value },
//   posts,
// ) =>
//   posts
//     // 1
//     .map(
//       (post, index, allPosts) =>
//         index % config.postsPerPage === 0
//           ? allPosts.slice(index, index + config.postsPerPage)
//           : null,
//     )
//     // 2
//     .filter(item => item)
//     // 3
//     .forEach((postGroup, index, allGroups) => {
//       const isFirstPage = index === 0;
//       const currentPage = index + 1;
//       const totalPages = allGroups.length;
//       const getPath = template(pathTemplate);

//       createPage({
//         path: getPath({ pageNumber: isFirstPage ? '' : currentPage }),
//         component,
//         context: {
//           postGroup,
//           type,
//           value,
//           currentPage,
//           totalPages,
//           isFirstPage,
//           isLastPage: currentPage === totalPages,
//           linkBase: getPath({ pageNumber: '' }),
//         },
//       });
//     });

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions;
//   let slug;

//   if (node.internal.type === `MarkdownRemark`) {
//     const fileNode = getNode(node.parent);
//     const parsedFilePath = path.parse(fileNode.relativePath);

//     if (parsedFilePath.name !== `index` && parsedFilePath.dir !== ``) {
//       slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
//     } else if (parsedFilePath.dir === ``) {
//       slug = `/${parsedFilePath.name}/`;
//     } else {
//       slug = `/${parsedFilePath.dir}/`;
//     }

//     // Add slug as a field on the node.
//     createNodeField({ node, name: `slug`, value: slug });
//   }
// };

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
    previews: path.resolve('src/templates/blog.js'),
  };

  const result = await graphql(`
  {
    pages: allFile(filter: { relativeDirectory: { eq: "pages"} }) {
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
  }
  `);

  const pages = result.data.pages.edges;
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

  // return new Promise((resolve, reject) => {

  // Query for all markdown "nodes" and for the slug we previously created.
  // resolve(
  //   graphql(
  //     `
  //       {
  //         pages: allFile(filter: { relativeDirectory: { eq: "pages"} }) {
  //           edges {
  //             node {
  //               name
  //             }
  //           }
  //         }
  //         posts: allMarkdownRemark(
  //           sort: { fields: [frontmatter___date], order: DESC }
  //           filter: {
  //             fileAbsolutePath: { glob: "**/posts/**" }
  //             frontmatter: { publish: { ne: false } }
  //           }
  //         ) {
  //           edges {
  //             node {
  //               id
  //               frontmatter {
  //                 title
  //                 slug
  //                 description
  //                 date(formatString: "MMMM DD, YYYY")
  //                 images
  //                 publish
  //                 category
  //                 tag
  //                 cta
  //               }
  //               fields {
  //                 slug
  //               }
  //               excerpt
  //             }
  //           }
  //         }
  //       }
  //     `,
  // ).then(result => {
  //   if (result.errors) {
  //     console.log(result.errors);
  //     reject(result.errors);
  //   }

  // const pages = result.data.pages.edges;
  // pages.forEach(({ node: page }) => {
  //   createPage({
  //     path: page.fields.slug,
  //     component: templates.page,
  //     context: {
  //       slug: page.fields.slug,
  //     },
  //   });
  // });

  // const paginationDefaults = { createPage, component: blogPreviews };

  // const allPosts = result.data.posts.edges.filter(
  //   ({ node }) => node.frontmatter.publish !== false,
  // );

  // const postsByCategory = groupPostsByUnique('category', allPosts);
  // const postsByTag = groupPostsByUnique('tag', allPosts);

  // Object.entries(postsByCategory).forEach(catData => {
  //   const category = catData[0];
  //   const posts = catData[1];

  //   paginate(
  //     {
  //       ...paginationDefaults,
  //       pathTemplate: `/blog/category/${category}/<%= pageNumber %>`,
  //       type: 'category',
  //       value: category,
  //     },
  //     posts,
  //   );
  // });

  // Object.entries(postsByTag).forEach(tagData => {
  //   const tag = tagData[0];
  //   const posts = tagData[1];

  //   paginate(
  //     {
  //       ...paginationDefaults,
  //       pathTemplate: `/blog/tag/${tag}/<%= pageNumber %>`,
  //       type: 'tag',
  //       value: tag,
  //     },
  //     posts,
  //   );
  // });

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

  // Create blog posts pages.
  // allPosts.forEach(({ node }) => {
  //   // If the post defined its own slug, use that.
  //   const postPath = node.frontmatter.slug || node.fields.slug;

  //   // If an image was supplied, let’s grab it.
  //   const image = node.frontmatter.images && node.frontmatter.images[0];

  //   // Add the offer type
  //   const offer = `/offers/${node.frontmatter.cta || 'default'}/`;

  //   createPage({
  //     path: postPath,
  //     component: blogPost,
  //     context: {
  //       imageRegex: `/${image}/`,
  //       slug: node.fields.slug,
  //       offer,
  //     },
  //   });
  // });
  // }),
  // );
  // });
};

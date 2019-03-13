require('dotenv').config();

const buildAlgoliaSearchIndex =
  process.env.BUILD_ALGOLIA_INDEX && process.env.BRANCH === 'master'
  ? [
      {
        resolve: 'gatsby-plugin-algolia',
        options: {
          appId: process.env.ALGOLIA_APP_ID,
          apiKey: process.env.ALGOLIA_API_KEY,
          indexName: process.env.ALGOLIA_INDEX_NAME,
          queries: [
            {
              query: `
            {
              allMdx(filter: {
                frontmatter: {
                  slug: {ne: null},
                  publish: {ne: false}
                }
              }) {
                edges {
                  node {
                    frontmatter {
                      slug
                      title
                      seo_title
                      description
                      images
                    }
                    rawBody
                  }
                }
              }
            }
          `,
              transformer: ({ data }) =>
                data.allMdx.edges.reduce((records, { node }) => {
                  const {
                    slug,
                    title,
                    seo_title: alt,
                    description,
                  } = node.frontmatter;

                  const base = { slug, title, alt, description };
                  const chunks = node.rawBody.split('\n\n');

                  return [
                    ...records,
                    ...chunks.map((text, index) => ({
                      ...base,
                      objectID: `${slug}-${index}`,
                      text,
                    })),
                  ];
                }, []),
            },
          ],
        },
      },
    ]
  : [];

module.exports = {
  siteMetadata: {
    title: 'Jason Lengstorf · There’s more to life than hustle & grind.',
    description: `
      Jason Lengstorf is a developer advocate, senior engineer, and occasional
      designer. He builds highly productive teams and communities through better
      communication, systems, processes,  and balance. He lives in
      Portland, Oregon.
    `,
    siteUrl: 'https://lengstorf.com',
    image: 'https://lengstorf.com/images/jason-lengstorf.jpg',
    author: {
      name: 'Jason Lengstorf',
      minibio: `
      <strong>Jason Lengstorf</strong> is a lead developer & architect at Gatsby.
      He’s a frequent <a href="/speaking">speaker</a>, occasional
      <a href="https://dribbble.com/jlengstorf">designer</a>, and an advocate of
      building better balance via efficiency. He lives in Portland, Oregon.
    `,
    },
    organization: {
      name: 'Jason Lengstorf',
      url: 'https://lengstorf.com',
      logo: 'https://lengstorf.com/android-chrome-512x512.png',
    },
    social: {
      twitter: '@jlengstorf',
      fbAppID: '',
    },
    categories: [
      {
        slug: 'acting-like-a-grown-up',
        name: 'Acting Like a Grown-Up',
      },
      {
        slug: 'finding-direction',
        name: 'Finding Direction',
      },
      {
        slug: 'happiness',
        name: 'Building Happiness',
      },
      {
        slug: 'motivation',
        name: 'Staying Motivated',
      },
      {
        slug: 'remote-productivity',
        name: 'Remote Productivity',
      },
      {
        slug: 'remote-work',
        name: 'Living & Working Remotely',
      },
      {
        slug: 'storytelling',
        name: 'Storytelling',
      },
      {
        slug: 'impact',
        name: 'Creating an Impact',
      },

      // Code post categories
      {
        slug: 'devops',
        name: 'DevOps',
      },
      {
        slug: 'front-end',
        name: 'Front-End Development',
      },
    ],
  },
  __experimentalThemes: [
    'gatsby-theme-jason-blog'
  ],
  plugins: [
    'gatsby-plugin-instagram',
    {
      resolve: 'gatsby-source-airtable',
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        tables: [
          {
            // Base: https://airtable.com/shragvnFckZYeUhvm
            baseId: 'appWQnWirwnRTSkHa',
            tableName: 'Events',
            tableView: 'Accepted',
            tableLinks: ['Accepted_Talk(s)'],
          },
          {
            // Base: https://airtable.com/shr5IvPfIuL0PpKZo
            baseId: 'appWQnWirwnRTSkHa',
            tableName: 'Talks',
            tableView: 'Grid view',
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-amplitude-analytics',
      options: {
        apiKey: process.env.AMPLITUDE_API_KEY,
        head: false,
        respectDNT: true,
        amplitudeConfig: {
          includeUtm: true,
          includeReferrer: true,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Jason Lengstorf',
        short_name: '@jlengstorf',
        start_url: '.',
        theme_color: '#c800ec',
        background_color: '#ffffff',
        display: 'minimal-ui',
        icons: [
          {
            src: '/android-chrome-192x192.png?v=6946GROn29',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png?v=6946GROn29',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    'gatsby-plugin-sitemap',

    // I _refuse to_ give up. ✊
    // 'gatsby-plugin-remove-serviceworker',
    'gatsby-plugin-offline',

    ...buildAlgoliaSearchIndex,

    // Enable HTTP/2 push for critical assets.
    'gatsby-plugin-netlify',
  ]
}

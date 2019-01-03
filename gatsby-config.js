const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  siteMetadata: {
    title: 'Jason Lengstorf · There’s more to life than hustle & grind.',
    description: `
      Jason Lengstorf is a developer advocate, senior engineer, and occasional
      designer. He builds highly productive teams and communities through better
      communication, systems, processes,  and balance. He lives in
      Portland, Oregon.
    `,
    canonicalUrl: 'https://lengstorf.com',
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
    ],
  },
  plugins: [
    {
      resolve: 'gatsby-mdx',
      options: {
        extensions: [".mdx", ".md"],
        defaultLayouts: {
          default: require.resolve('./src/templates/page.js')
        },
        globalScope: `
          import { Figure } from '$components';
        `,
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1380,
              linkImagesToOriginal: false,
            },
          },
          { resolve: 'gatsby-remark-responsive-iframe' },
          { resolve: 'gatsby-remark-copy-linked-files' },
          { resolve: 'gatsby-remark-numbered-footnotes' },
          { resolve: 'gatsby-remark-smartypants' },
        ]
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-twitter',
    'gatsby-plugin-instagram',
    {
      resolve: 'gatsby-plugin-amplitude-analytics',
      options: {
        apiKey: "f8d938da6faf54d25ee934390af70e01",
        head: false,
        respectDNT: true,
        amplitudeConfig: {
          includeUtm: true,
          includeReferrer: true
        }
      }
    },
    'gatsby-plugin-catch-links',
    'gatsby-transformer-sharp',
    'gatsby-plugin-emotion',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: 'content',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1380,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-numbered-footnotes',
          'gatsby-remark-smartypants',
        ],
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
    'gatsby-plugin-offline',
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
            tableLinks: ['Accepted Talk(s)'],
          },
          {
            // Base: https://airtable.com/shr5IvPfIuL0PpKZo
            baseId: 'appWQnWirwnRTSkHa',
            tableName: 'Talks',
            tableView: 'Grid view',
          }
        ]
      }
    }
  ],
};

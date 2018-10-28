module.exports = {
  siteMetadata: {
    author: {
      minibio: `
        <strong>Jason Lengstorf</strong> is a lead developer & architect at Gatsby.
        He’s a frequent <a href="/speaking">speaker</a>, occasional
        <a href="https://dribbble.com/jlengstorf">designer</a>, and an advocate of
        building better balance via efficiency. He lives in Portland, Oregon.
      `,
    },
    categories: {
      happiness: {
        display: 'Building Happiness',
      },
      'remote-productivity': {
        display: 'Remote Productivity',
      },
      'remote-work': {
        display: 'Living & Working Remotely',
      },
      motivation: {
        display: 'Staying Motivated',
      },
      storytelling: {
        display: 'Storytelling',
      },
      'acting-like-a-grown-up': {
        display: 'Acting Like a Grown-Up',
      },
      'finding-direction': {
        display: 'Finding Direction',
      },
    },
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-twitter',
    'gatsby-plugin-instagram',
    // 'gatsby-plugin-five-stages',
    'gatsby-plugin-amplitude',
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
        background_color: '#c800ec',
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
  ],
};

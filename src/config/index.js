module.exports = {
  title: 'Jason Lengstorf · There’s more to life than hustle & grind.',
  description: '',
  url: 'https://lengstorf.com',
  image: 'https://lengstorf.com/images/jason-lengstorf.jpg',
  logo: 'https://lengstorf.com/android-chrome-512x512.png',
  twitter: '@jlengstorf',
  fbAppID: '',

  // API_ENDPOINT: 'http://localhost:8080',
  API_ENDPOINT: 'https://api-lengstorf.now.sh',
  CONFIRM_PAGE: 'https://lengstorf.com/confirm',

  author: {
    minibio: `
      <strong>Jason Lengstorf</strong> is a lead developer & architect at IBM.
      He’s a frequent <a href="/speaking">speaker</a>, occasional
      <a href="https://dribbble.com/jlengstorf">designer</a>, and an advocate of
      building better balance via efficiency. He lives in Austin, Texas.
    `,
  },

  // Animation
  transitionSpeed: 150, // milliseconds

  // This is used for generating blog preview pages in `gatsby-node.js`.
  postsPerPage: 10,

  // Categories need display names.
  categories: {
    happiness: {
      display: 'Building Happiness',
    },
    impact: {
      display: 'Creating an Impact',
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
};

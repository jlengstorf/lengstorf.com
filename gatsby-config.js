module.exports = {
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
    },
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: ['gatsby-theme-jason-blog']
      }
    }
  ]
}

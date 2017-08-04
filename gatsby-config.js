module.exports = {
  siteMetadata: {
    title: `One Brick at a Time`,
  },
   plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `kpfz2fzy0si4`,
        accessToken: `39591a0146faa8a21af1e25c47661572b42f506cb5a7c3402bf7d6acf1bf9d87`,
      },
    }, `gatsby-transformer-remark`, `gatsby-plugin-react-helmet`, `gatsby-plugin-glamor`
  ]
}

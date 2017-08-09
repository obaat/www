module.exports = {
  siteMetadata: {
    title: `One Brick at a Time`,
  },
   plugins: [
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: `one-brick`,
        accessToken: `MC5XWWhTS2lZQUFOLUtDUFZy.77-977-9MzHvv73vv73vv71L77-9YUnvv73vv70_77-9LSF9Le-_vR3vv73vv70lUihUNSrvv73vv73vv70`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-glamor`,
  ]
}

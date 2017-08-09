const path = require('path')
const slash = require('slash')

const types = [
  {
    type: 'volunteer_opportunity',
    template: 'volunteering-opportunity',
    path: '/volunteering/',
  },
  // {
  //   type: 'team',
  //   template: 'team',
  //   path: '/team/',
  // }, {
  //   type: 'project',
  //   template: 'project',
  //   path: '/project/',
  // }, {
  //   type: 'blog',
  //   template: 'blog',
  //   path: '/blog/',
  // },
];

// [at(document.type, "volunteer_opportunity")]
exports.createPages = async ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  const result = await graphql(
      `
      {
        allPrismicDocument(limit: 1000) {
          edges {
            node {
              id
              type
              uid
            }
          }
        }
      }
    `
    )

  if (result.errors) {
    throw new Error(result.errors)
  }

  const {edges} = result.data.allPrismicDocument
  types.forEach(({type: _type, template, path: tPath}) => {
    const fTemplate = path.resolve(`./src/templates/${template}.js`)
    edges
      .filter(({node: {type}}) => type === _type)
      .forEach(edge => {
        createPage({
          path: `${tPath}${edge.node.uid}`,
          component: slash(fTemplate),
          context: {
            id: edge.node.uid,
          },
        })
      })
    })
}

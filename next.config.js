const {getByType, types} = require('./utils/api')

module.exports = {
  async exportPathMap () {
    const response = await getByType(types.VOLUNTEERING)

    const pages = response.results.reduce(
      (pages, {uid}) =>
        Object.assign({}, pages, {
          [`/volunteering/${uid}`]: {
            page: '/volunteering',
            query: { id: uid }
          }
        }),
      {},
    )

    // combine the map of post pages with the home
    return Object.assign({}, pages, {
      '/': { page: '/' }
    })
  }
}

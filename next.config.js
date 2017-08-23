const { getByType, types } = require("./utils/api")

module.exports = {
  async exportPathMap() {
    const volunteering = await getByType(types.VOLUNTEERING)

    const pages = volunteering.results.reduce(
      (pages, { uid }) =>
        Object.assign({}, pages, {
          [`/volunteering/${uid}`]: {
            page: "/volunteering",
            query: { id: uid },
          },
        }),
      {},
    )

    // combine the map of post pages with the home
    return Object.assign({}, pages, {
      "/": { page: "/" },
    })
  },
}

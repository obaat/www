const { getByType, types } = require("./utils/api")
const { reduce } = require("asyncro")

const repeaters = [
  { type: types.VOLUNTEERING, url: "/volunteering" },
  { type: types.PROJECT, url: "/projects" },
  { type: types.VOLUNTEERING_OPPORTUNITY_LOCATION, url: "/location" },
  { type: types.EVENT, url: "/event" },
]

module.exports = {
  async exportPathMap() {
    const dynamicPages = await reduce(
      repeaters,
      async (acc, { type, url }) => {
        const src = await getByType(type)
        const pageConfig = src.results.reduce(
          (pages, { uid }) =>
            Object.assign({}, pages, {
              [`${url}/${uid}`]: {
                page: url,
                query: { id: uid },
              },
            }),
          {},
        )
        return { ...acc, ...pageConfig }
      },
      {},
    )
    // combine the map of post pages with the home
    const pages = Object.assign(dynamicPages, {
      "/": { page: "/" },
      "/volunteering": { page: "/volunteering" },
      "/projects": { page: "/projects" },
      "/about": { page: "/about" },
      "/team": { page: "/team" },
      "/trustees": { page: "/trustees" },
      "/financials": { page: "/financials" },
      "/partners": { page: "/partners" },
      "/contact": { page: "/contact" },
      "/apply": { page: "/apply" },
      "/spreadtheword": { page: "/spreadtheword" },
      "/shop": { page: "/shop" },
    })
    return pages
  },
}

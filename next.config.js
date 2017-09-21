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
              [`${url}/${uid}.html`]: {
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
      "/volunteering.html": { page: "/volunteering" },
      "/projects.html": { page: "/projects" },
      "/about.html": { page: "/about" },
      "/team.html": { page: "/team" },
      "/trustees.html": { page: "/trustees" },
      "/financials.html": { page: "/financials" },
      "/partners.html": { page: "/partners" },
      "/contact.html": { page: "/contact" },
      "/apply.html": { page: "/apply" },
      "/spreadtheword.html": { page: "/spreadtheword" },
      "/shop.html": { page: "/shop" },
    })
    return pages
  },
}

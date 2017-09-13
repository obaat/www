const { getByType, types } = require("./utils/api")

module.exports = {
  async exportPathMap() {
    const volunteering = await getByType(types.VOLUNTEERING)

    const volunteering_pages = volunteering.results.reduce(
      (pages, { uid }) =>
        Object.assign({}, pages, {
          [`/volunteering/${uid}`]: {
            page: "/volunteering",
            query: { id: uid },
          },
        }),
      {},
    )

    const projects = await getByType(types.PROJECT)

    const project_pages = projects.results.reduce(
      (pages, { uid }) =>
        Object.assign({}, pages, {
          [`/projects/${uid}`]: {
            page: "/projects",
            query: { id: uid },
          },
        }),
      {},
    )

    const location = await getByType(types.VOLUNTEERING_OPPORTUNITY_LOCATION)

    const location_pages = location.results.reduce(
      (pages, { uid }) =>
        Object.assign({}, pages, {
          [`/location/${uid}`]: {
            page: "/location",
            query: { id: uid },
          },
        }),
      {},
    )

    // combine the map of post pages with the home
    const pages = Object.assign(
      {},
      location_pages,
      volunteering_pages,
      project_pages,
      {
        "/": { page: "/" },
        "/volunteering": { page: "/volunteering" },
        "/projects": { page: "/projects" },
        // "/about": { page: "/about" },
        "/team": { page: "/team" },
        "/trustees": { page: "/trustees" },
        "/financials": { page: "/financials" },
        "/partners": { page: "/partners" },
        "/contact": { page: "/contact" },
        "/apply": { page: "/apply" },
      },
    )
    return pages
  },
}

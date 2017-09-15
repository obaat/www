const Prismic = require("prismic-javascript")

const types = {
  VOLUNTEERING: "volunteer_opportunity",
  VOLUNTEERING_PAGE_CONTENT: "volunteering_page",
  VOLUNTEERING_OPPORTUNITY_LOCATION: "volunteering_opportunity_location",
  BLOG: "blog_post",
  PROJECT_PAGE_CONTENT: "projects_page",
  PROJECT: "project",
  EVENT: "event",
  HOME: "home",
  FINANCIALS_PAGE_CONTENT: "financials_page",
  PARTNERSHIPS_PAGE_CONTENT: "partnerships",
  TEAM_MEMBERS: "team",
  TEAM_PAGE_CONTENT: "team_page",
  TRUSTEES_PAGE_CONTENT: "trustees_page",
  CONTACT_PAGE_CONTENT: "contact_page",
  APPLY_PAGE_CONTENT: "apply_page",
  ABOUT_PAGE_CONTENT: "about_page",
  SPREAD_THE_WORD_PAGE_CONTENT: "spread_the_word",
}

// const accessToken =
//   "MC5XWWhTS2lZQUFOLUtDUFZy.77-977-9MzHvv73vv73vv71L77-9YUnvv73vv70_77-9LSF9Le-_vR3vv73vv70lUihUNSrvv73vv73vv70"

const apiBuilder = () =>
  Prismic.api(
    "https://one-brick.prismic.io/api/v2",
    {
      // accessToken,
    },
  )

const getSingleton = async type => {
  const api = await apiBuilder()
  return await api.getSingle(type)
}

const getByIDs = async ids => {
  const api = await apiBuilder()
  const res = await api.getByIDs(ids)
  return res
}

const getByUID = type => async (id, options) => {
  const api = await apiBuilder()
  const res = await api.getByUID(type, id, options)
  return res
}

const getByType = async type => {
  const api = await apiBuilder()

  const res = await api.query(Prismic.Predicates.at("document.type", type), {
    pageSize: 10,
    orderings: `[my.${type}.first_publication_date]`,
  })

  return res
}

module.exports = {
  types,
  getByType,
  getByUID,
  getByIDs,
  getSingleton,
}

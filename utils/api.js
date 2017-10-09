const Prismic = require("prismic-javascript")
const memoizee = require("memoizee")

const types = {
  VOLUNTEERING: "volunteer_opportunity",
  VOLUNTEERING_PAGE_CONTENT: "volunteering_page",
  VOLUNTEERING_OPPORTUNITY_LOCATION: "volunteering_opportunity_location",
  BLOG: "blog_post",
  PROJECT_PAGE_CONTENT: "projects_page",
  PROJECT: "project",
  EVENT: "event",
  GALLERY: "gallery_page",
  HOME: "home",
  VOLUNTEER_STATEMENT: "volunteer_statement",
  FINANCIALS_PAGE_CONTENT: "financials_page",
  BLOG_PAGE_CONTENT: "blog_page_content",
  PARTNERSHIPS_PAGE_CONTENT: "partnerships",
  TEAM_MEMBERS: "team",
  TEAM_PAGE_CONTENT: "team_page",
  TRUSTEES_PAGE_CONTENT: "trustees_page",
  CONTACT_PAGE_CONTENT: "contact_page",
  APPLY_PAGE_CONTENT: "apply_page",
  THE_CHALLENGE_PAGE_CONTENT: "thechallenge_page",
  ABOUT_PAGE_CONTENT: "about_page",
  SHOP_PAGE_CONTENT: "shop_page",
  SPONSOR_PAGE_CONTENT: "sponsor_page",
  SPREAD_THE_WORD_PAGE_CONTENT: "spread_the_word",
  NEWS: "news",
}

// const accessToken =
//   "MC5XWWhTS2lZQUFOLUtDUFZy.77-977-9MzHvv73vv73vv71L77-9YUnvv73vv70_77-9LSF9Le-_vR3vv73vv70lUihUNSrvv73vv73vv70"

const apiBuilder = memoizee(
  () =>
    Prismic.getApi("https://one-brick.cdn.prismic.io/api/v2", {
      // accessToken,
    }),
  { maxAge: 60 * 30 },
)

const getSingleton = memoizee(async type => {
  const api = await apiBuilder()
  return await api.getSingle(type)
})

const getByIDs = memoizee(async (ids, opts) => {
  const api = await apiBuilder()
  const res = await api.getByIDs(ids, opts)
  return res
})

const getByUID = type =>
  memoizee(async (id, options) => {
    const api = await apiBuilder()
    const res = await api.getByUID(type, id, options)
    return res
  })

const getByType = memoizee(async type => {
  const api = await apiBuilder()

  const res = await api.query(Prismic.Predicates.at("document.type", type), {
    pageSize: 10,
    orderings: `[my.${type}.first_publication_date]`,
  })

  return res
})

module.exports = {
  types,
  getByType,
  getByUID,
  getByIDs,
  getSingleton,
}

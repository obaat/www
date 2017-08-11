const Prismic = require( 'prismic-javascript')

const types = {
  VOLUNTEERING: 'volunteer_opportunity',
  BLOG: 'blog_post',
  PROJECTS: 'projects',
  HOME: 'home',
}

const accessToken = "MC5XWWhTS2lZQUFOLUtDUFZy.77-977-9MzHvv73vv73vv71L77-9YUnvv73vv70_77-9LSF9Le-_vR3vv73vv70lUihUNSrvv73vv73vv70"

const apiBuilder = () => Prismic.api("https://one-brick.prismic.io/api/v2", {
  accessToken,
})

const getSingleton = async(type) => {
  const api = await apiBuilder()
  return await api.getSingle(type)
}

const getByUID = (type) => async(id) => {
  const api = await apiBuilder()
  const res = await api.getByUID(type, id)
  return res
}

const getByType = async(type) => {
  const api = await apiBuilder()

  const res = await api.query(
    Prismic.Predicates.at('document.type', type),
    { pageSize : 10, orderings : `[my.${type}.first_publication_date]` }
  )

  return res
}

module.exports = {
  types,
  getByType,
  getByUID,
  getSingleton,
}

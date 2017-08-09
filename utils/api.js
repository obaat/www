import prismic from 'prismic-javascript'

const accessToken = "MC5XWWhTS2lZQUFOLUtDUFZy.77-977-9MzHvv73vv73vv71L77-9YUnvv73vv70_77-9LSF9Le-_vR3vv73vv70lUihUNSrvv73vv73vv70"

const apiBuilder = () => prismic.api("https://one-brick.prismic.io/api/v2", {
  accessToken,
})
export default apiBuilder

export const getByUID = (type) => async(id) => {
  const api = await apiBuilder()
  const res = await api.getByUID(type, id)
  return res
}

export const getVolunteeringPost = async (id) => {
}

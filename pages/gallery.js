import React from "react"
import { getByUID, getByType, types } from "../utils/api"
import { pageWithTitle } from "../hoc/page"
import PrismicRichText from "../components/PrismicRichText"
import { Flex, Box, Border, BackgroundImage } from "../ui"
import { Switch, Route, Link, getRouteProps } from "react-static"
import PrismicSlice from "../components/PrismicSlice"

const Gallery = ({ content = {} }) => {
  const body = content.body || []
  const galleries = body.map((props, i) => (
    <PrismicSlice key={i} inline {...props} />
  ))
  return (
    <Flex wrap="wrap">
      <Box w={1}>
        <PrismicRichText source={content.description} />
      </Box>
      <Box w={1}>{galleries}</Box>
    </Flex>
  )
}

export const data = id => async () => {
  const res = await getByUID(types.GALLERY)(id)
  return { content: res.data }
}

export const children = async (...args) => {
  const galleries = await getByType(types.GALLERY)
  const pages = galleries.results.map(({ uid }) => ({
    path: "/" + uid,
    getProps: data(uid),
  }))
  return pages
}

const _Gallery = pageWithTitle()(Gallery)
export default _Gallery

export const routes = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/:uid`} component={getRouteProps(_Gallery)} />
  </Switch>
)

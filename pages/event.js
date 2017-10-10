import React from "react"
import { types, getByUID, getByType } from "../utils/api"
import { pageWithTitle } from "../hoc/page"
import PrismicRichText from "../components/PrismicRichText"
import { Flex, Box, Border, BackgroundImage } from "../ui"
import PrismicSlice from "../components/PrismicSlice"
import { Switch, Route, Link, getRouteProps } from "react-static"

const Event = ({ content = {} }) => {
  const sections = content.body.map((props, i) => (
    <PrismicSlice key={i} {...props} />
  ))
  return (
    <div>
      <PrismicRichText source={content.description} />
      {sections}
    </div>
  )
}

export const data = uid => async () => {
  const res = await getByUID(types.EVENT)(uid)
  return { content: res.data }
}

const _Event = pageWithTitle()(Event)
export default _Event

export const children = async (...args) => {
  const events = await getByType(types.EVENT)
  const pages = events.results.map(({ uid }) => ({
    path: "/" + uid,
    getProps: data(uid),
  }))
  return pages
}

export const routes = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/:uid`} component={getRouteProps(_Event)} />
  </Switch>
)

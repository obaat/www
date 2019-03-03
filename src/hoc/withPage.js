import React from "react"
import { getByUID, getByType } from "../utils/api"
import { pageWithTitle } from "./page"
import { Flex, Box } from "../ui"
import { Switch, Route, withRouteData } from "react-static"
import PrismicSlice from "../components/PrismicSlice"

const Page = withRouteData(
  pageWithTitle()(({ content = {} }) => {
    const body = content.body || []
    const sections = body.map((props, i) => <PrismicSlice key={i} {...props} />)
    return (
      <Flex wrap="wrap">
        <Box w={1}>{sections}</Box>
      </Flex>
    )
  }),
)

export const data = type => id => async () => {
  const res = await getByUID(type)(id)
  return { content: res.data }
}

export const children = type => async () => {
  const pages = await getByType(type)
  return pages.results.map(({ uid }) => ({
    path: `/${uid}`,
    getData: data(type)(uid),
  }))
}

const Dummy = () => <div>x</div>

const routes = ({ match }) => (
  <Switch>
    <Route path={match.url} exact component={Dummy} />
    <Route exact path={`${match.url}/:uid`} component={Page} />
  </Switch>
)

export default type => ({
  routes,
  data,
  children: children(type),
})

import React from "react"
import { Route, Switch, withRouteData } from "react-static"
import path from "path"
import NotFound from "./components/404"
import _pages from "./pages/"

const pageComponents = _pages.map(({ filename, exported }) => ({
  path: exported.path ? exported.path : `/${path.basename(filename, ".js")}`,
  ...exported,
}))

export const data = pageComponents
  .filter(p => p.data)
  .map(p => ({
    getData: p.data,
    ...p,
  }))

export const pages = pageComponents.map(p => ({
  component: p.routes || withRouteData(p.default),
  exact: !p.routes,
  ...p,
}))

export default () => (
  <Switch>
    {pages.map(props => (
      <Route key={props.path} {...props} />
    ))}
    <Route component={NotFound} />
  </Switch>
)

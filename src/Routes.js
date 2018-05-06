import React from "react"
import {
  Route,
  Switch,
  NotFoundRoute,
  Redirect,
  withRouteData,
} from "react-static"
import importAll from "import-all.macro"
import path from "path"
import map from "lodash/map"
import { withPalette } from "../ui/component-configuration"
import NotFound from "../components/404"

const _pages = importAll.sync("../pages/*.js")

const pageComponents = map(_pages, (v, k) => ({
  path: v.path ? v.path : "/" + path.basename(k, ".js"),
  ...v,
}))

export const data = pageComponents.map(p => ({
  getData: p.data,
  ...p,
}))

export const pages = pageComponents.map(p => ({
  component: p.routes || withRouteData(p.default),
  exact: p.routes ? false : true,
  ...p,
}))

export default () => (
  <Switch>
    {pages.map(props => <Route key={props.path} {...props} />)}
    <Route component={NotFound} />
  </Switch>
)

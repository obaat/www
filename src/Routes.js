import React from "react"
import {
  Router,
  Route,
  Switch,
  Redirect,
  Link,
  getRouteProps,
} from "react-static"
import importAll from "import-all.macro"
const _pages = importAll.sync("../pages/*.js")
import path from "path"
import ScrollToTop from "./ScrollToTop"

import map from "lodash/map"
import mapKeys from "lodash/mapKeys"
import camelCase from "lodash/camelCase"
import upperFirst from "lodash/upperFirst"
import { withPalette } from "../ui/component-configuration"

const pageComponents = map(_pages, (v, k) => ({
  path: v.path ? v.path : "/" + path.basename(k, ".js"),
  ...v,
}))

export const data = pageComponents.map(p => ({
  getProps: p.data,
  ...p,
}))

export const pages = pageComponents.map(p => ({
  component: p.routes ? getRouteProps(p.routes) : getRouteProps(p.default),
  exact: p.routes ? false : true,
  ...p,
}))

export default () => (
  <Router>
    <ScrollToTop>
      <Switch>
        {pages.map(props => <Route key={path} {...props} />)}
        <Redirect to="/" />
      </Switch>
    </ScrollToTop>
  </Router>
)

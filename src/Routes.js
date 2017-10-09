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

import mapKeys from "lodash/mapKeys"
import camelCase from "lodash/camelCase"
import upperFirst from "lodash/upperFirst"
import { withPalette } from "../ui/component-configuration"

const pageComponents = mapKeys(_pages, (v, k) => {
  const file = path.basename(k, ".js")
  return upperFirst(camelCase(file))
})

// const repeaters = [
//   { type: types.VOLUNTEERING, url: "/volunteering" },
//   { type: types.PROJECT, url: "/projects" },
//   { type: types.VOLUNTEERING_OPPORTUNITY_LOCATION, url: "/location" },
//   { type: types.EVENT, url: "/event" },
//   { type: types.GALLERY, url: "/gallery" },
// ]

export const data = [
  {
    path: "/",
    getProps: pageComponents.Home.data,
  },
  {
    path: "/about",
    getProps: pageComponents.About.data,
  },
]

export const pages = [
  {
    path: "/",
    Component: getRouteProps(pageComponents.Home.default),
  },
  {
    path: "/about",
    Component: getRouteProps(pageComponents.About.default),
  },
  // { path: "/volunteering", Component: Volunteering, children: [] },
  // { path: "/projects", Component: Projects, children: [] },
  // { path: "/about", Component: About  },
  // { path: "/team", Component: Team  },
  // { path: "/trustees", Component:  },
  // { path: "/resources", Component:  },
  // { path: "/partners", Component:  },
  // { path: "/contact", Component:  },
  // { path: "/apply", Component:  },
  // { path: "/spreadtheword", Component:  },
  // { path: "/shop", Component:  },
]

// extract data from getInitialProps
// export const data =

export default () => (
  <Router>
    <Switch>
      {pages.map(({ path, Component }) => (
        <Route key={path} exact path={path} component={Component} />
      ))}
      <Redirect to="/" />
    </Switch>
  </Router>
)

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

import map from "lodash/map"
import mapKeys from "lodash/mapKeys"
import camelCase from "lodash/camelCase"
import upperFirst from "lodash/upperFirst"
import { withPalette } from "../ui/component-configuration"

const pageComponents = map(_pages, (v, k) => ({
  path: v.path ? v.path : "/" + path.basename(k, ".js"),
  ...v,
}))

// const repeaters = [
//   { type: types.VOLUNTEERING, url: "/volunteering" },
//   { type: types.PROJECT, url: "/projects" },
//   { type: types.VOLUNTEERING_OPPORTUNITY_LOCATION, url: "/location" },
//   { type: types.EVENT, url: "/event" },
//   { type: types.GALLERY, url: "/gallery" },
// ]

export const data = pageComponents.map(p => ({
  getProps: p.data,
  ...p,
}))

export const pages = pageComponents.map(p => ({
  component: p.routes ? getRouteProps(p.routes) : getRouteProps(p.default),
  exact: p.routes ? false : true,
  ...p,
}))
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

export default () => (
  <Router>
    <Switch>
      {pages.map(props => <Route key={path} {...props} />)}
      <Redirect to="/" />
    </Switch>
  </Router>
)

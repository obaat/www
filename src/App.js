import React from "react"
import {
  Router,
  Route,
  Switch,
  Redirect,
  Link,
  getRouteProps,
} from "react-static"
import ScrollToTop from "./ScrollToTop"
import glamorous from "glamorous"
import Routes from "./Routes"
import withAnalytics from "../hoc/withAnalytics"
//
// import About from "containers/About"
// import Blog from "containers/Blog"

export default () => (
  <Router>
    <ScrollToTop>
      <Route component={withAnalytics(Routes)} />
    </ScrollToTop>
  </Router>
)

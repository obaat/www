import React from "react"
import { hot } from "react-hot-loader"
import { Router, Route } from "react-static"
import Routes from "./Routes"
import withAnalytics from "./hoc/withAnalytics"
//
// import About from "containers/About"
// import Blog from "containers/Blog"

const App = () => (
  <Router>
    <Route component={withAnalytics(Routes)} />
  </Router>
)

export default hot(module)(App)

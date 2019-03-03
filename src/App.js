import React from "react"
import { hot } from "react-hot-loader"
import { Router, Route } from "react-static"
import Routes from "./Routes"
import withAnalytics from "./hoc/withAnalytics"
import { IntlProvider } from "react-intl"
//
// import About from "containers/About"
// import Blog from "containers/Blog"

const App = () => (
  <IntlProvider locale="en">
    <Router>
      <Route component={withAnalytics(Routes)} />
    </Router>
  </IntlProvider>
)

export default hot(module)(App)

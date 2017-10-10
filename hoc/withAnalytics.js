import React, { Component } from "react"
import ReactGA from "react-ga"

export default ComposedComponent =>
  class WithAnalytics extends Component {
    constructor(props) {
      super(props)
      if (process.browser) {
        ReactGA.initialize(ANALYTICS_TRACKING_ID)
      }
    }

    componentDidMount() {
      const page = window.location.pathname
      ReactGA.set({ page })
      ReactGA.pageview(page)
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

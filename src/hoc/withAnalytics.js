import React, { Component } from "react"
import ReactGA from "react-ga"

export default ComposedComponent => {
  const trackPage = page => {
    ReactGA.set({
      page,
    })
    ReactGA.pageview(page)
  }

  return class WithAnalytics extends Component {
    constructor(props) {
      super(props)
      if (process.browser) {
        ReactGA.initialize(ANALYTICS_TRACKING_ID)
      }
    }

    componentDidMount() {
      const page = this.props.location.pathname
      trackPage(page)
    }

    componentWillReceiveProps(nextProps) {
      const currentPage = this.props.location.pathname
      const nextPage = nextProps.location.pathname

      if (currentPage !== nextPage) {
        trackPage(nextPage)
      }
    }

    render() {
      return <ComposedComponent {...this.props} ga={ReactGA} />
    }
  }
}

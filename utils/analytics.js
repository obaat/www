import ReactGA from "react-ga"

if (process.browser) {
  ReactGA.initialize(ANALYTICS_TRACKING_ID)
}

export default ReactGA

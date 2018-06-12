import React, { Component } from "react"
import { ThemeProvider } from "emotion-theming"
import theme from "../theme"
import { MemoryRouter as Router } from "react-router-dom"

export default class ThemeWrapper extends Component {
  render() {
    return (
      <Router>
        <ThemeProvider theme={theme}>{this.props.children}</ThemeProvider>
      </Router>
    )
  }
}

import React, { Component } from "react"
import { ThemeProvider } from "glamorous"
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

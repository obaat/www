import React, { Component } from "react"
import PropTypes from "prop-types"
import { getByType, types } from "../utils/api"
import styled from "@emotion/styled"
import Helmet from "react-helmet"
import { ThemeProvider } from "emotion-theming"
// import { loadGetInitialProps } from "next/dist/lib/utils"
import { menuHeightScrolled } from "../utils/constants"
import configureProgressBar from "../utils/routing"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { withRouter } from "react-router"
import theme from "../theme"

const Container = styled.div({
  fontFamily: theme.font.heading,
  lineHeight: "1.7em",
  color: theme.colors.black[0],
})

export default ComposedComponent =>
  withRouter(
    class WithLayout extends Component {
      static propTypes = {
        location: PropTypes.shape({
          pathname: PropTypes.string.isRequired,
        }).isRequired,
      }

      componentDidMount() {
        configureProgressBar()
      }

      render() {
        const { volunteering } = this.props
        return (
          <ThemeProvider theme={theme}>
            <Container>
              <Helmet
                meta={[
                  { name: "description", content: "Obaat" },
                  { name: "keywords", content: "obaat, uganda" },
                ]}
              />
              <ComposedComponent {...this.props} />
              <Header />
              <Footer />
            </Container>
          </ThemeProvider>
        )
      }
    },
  )

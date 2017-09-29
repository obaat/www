import { Component } from "react"
import PropTypes from "prop-types"
import { getByType, types } from "../utils/api"
import g from "glamorous"
import Helmet from "react-helmet"
import { ThemeProvider } from "glamorous"
import { loadGetInitialProps } from "next/dist/lib/utils"
import { menuHeightScrolled } from "../utils/constants"
import configureProgressBar from "../utils/routing"
import Footer from "../components/Footer"
import Header from "../components/Header"
import theme from "../theme"

const Container = g.div({
  fontFamily: theme.font.heading,
  lineHeight: "1.7em",
  color: theme.colors.black[0],
})

export default ComposedComponent =>
  class WithLayout extends Component {
    static propTypes = {
      url: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
      }).isRequired,
    }

    static async getInitialProps(ctx) {
      const volunteering = await getByType(types.VOLUNTEERING)
      const res = await loadGetInitialProps(ComposedComponent, ctx)
      return { ...res, volunteering: volunteering.results }
    }

    componentDidMount() {
      configureProgressBar()
    }

    render() {
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
            <Header volunteering={this.props.volunteering} />
            <Footer />
          </Container>
        </ThemeProvider>
      )
    }
  }

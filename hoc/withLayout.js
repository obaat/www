import { Component, PropTypes } from "react"
import g from "glamorous"
import Helmet from "react-helmet"
import { ThemeProvider } from "glamorous"
import { loadGetInitialProps } from "next/dist/lib/utils"
import { menuHeightScrolled } from "../utils/constants"
import configureProgressBar from "../utils/routing"
import Footer from "../components/Footer"
import Header from "../components/Header"
import theme from "../theme"

const Container = g.div(
  {
    fontFamily: theme.font.heading,
    lineHeight: "1.7em",
    color: theme.colors.black[0],
  },
  // ({ fixed }) =>
  //   fixed && {
  //     marginTop: menuHeightScrolled,
  //   },
)

export default ComposedComponent =>
  class WithLayout extends Component {
    static propTypes = {
      url: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
      }).isRequired,
    }

    static async getInitialProps(ctx) {
      // const volunteering = await getByType(types.VOLUNTEERING)
      // return { volunteering: volunteering.results }
      return loadGetInitialProps(ComposedComponent, ctx)
    }

    componentDidMount() {
      configureProgressBar()
    }

    render() {
      return (
        <ThemeProvider theme={theme}>
          <Container>
            <Helmet
              title=""
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

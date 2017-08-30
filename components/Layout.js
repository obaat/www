import React from "react"
import Helmet from "react-helmet"
import Header from "../components/Header"
import g from "glamorous"
import { ThemeProvider } from "glamorous"
import theme from "../theme"
import { getByType, types } from "../utils/api"
import mergeGetInitialProps from "../hoc/mergeGetInitialProps"
import { menuHeightScrolled } from "../utils/constants"
import Footer from "../components/Footer"

const Container = g.div(
  {
    fontFamily: "Interface, sans-serif",
    lineHeight: "1.7em",
  },
  ({ fixed }) =>
    fixed && {
      marginTop: menuHeightScrolled,
    },
)

const Layout = ({ children, volunteering, url }) => {
  const fixed = false

  return (
    <ThemeProvider theme={theme}>
      <Container fixed={fixed}>
        <Helmet
          title=""
          meta={[
            { name: "description", content: "Obaat" },
            { name: "keywords", content: "obaat, uganda" },
          ]}
        />
        {children}
        <Header fixed={fixed} volunteering={volunteering} />
        {/* <Footer /> */}
      </Container>
    </ThemeProvider>
  )
}

const merge = mergeGetInitialProps(async () => {
  const volunteering = await getByType(types.VOLUNTEERING)
  return { volunteering: volunteering.results }
})

export default Layout

export const withLayout = ComposedComponent => {
  const EnhancedLayout = merge(ComposedComponent)(Layout)
  return EnhancedLayout
}

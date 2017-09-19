import React from "react"
import Helmet from "react-helmet"
import Header from "../components/Header"
import g from "glamorous"
import { ThemeProvider } from "glamorous"
import { getByType, types } from "../utils/api"
import mergeGetInitialProps from "../hoc/mergeGetInitialProps"
import { menuHeightScrolled } from "../utils/constants"
import Footer from "../components/Footer"
import theme from "../theme"

const Container = g.div(
  {
    fontFamily: theme.font.heading,
    lineHeight: "1.7em",
    color: theme.colors.black[0],
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
        <Footer />
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

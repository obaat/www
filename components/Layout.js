import Helmet from 'react-helmet'
import Header from '../components/Header'
import g from 'glamorous'
import { ThemeProvider } from 'glamorous'
import theme from '../theme'
import {getByType, types} from '../utils/api'
import mergeGetInitialProps from '../hoc/mergeGetInitialProps'
import {menuHeightDocked, menuHeightScrolled} from '../utils/constants'

const Container = g.div(
  ({fixed}) => fixed && ({
    marginTop: menuHeightScrolled,
  })
)

const Layout = ({ children, volunteering, url }) => {
  const fixed = false

  return (
    <ThemeProvider theme={theme}>
      <Container fixed={ fixed }>
        <Helmet
          title=""
          meta={[
            { name: 'description', content: 'Obaat' },
            { name: 'keywords', content: 'obaat, uganda' },
          ]}
        >
        </Helmet>
        {children}
        <Header fixed={ fixed } volunteering={ volunteering }/>
      </Container>
    </ThemeProvider>
  )
}

const merge = mergeGetInitialProps(
  async () => {
    const volunteering = await getByType(types.VOLUNTEERING)
    return {volunteering: volunteering.results}
  }
)

export default Layout

export const withLayout = ComposedComponent => {
  const EnhancedLayout = merge(ComposedComponent)(Layout)
  return EnhancedLayout
}

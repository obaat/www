import Helmet from 'react-helmet'
import Header from '../components/Header'
import g from 'glamorous'
import { ThemeProvider } from 'glamorous'
import theme from '../theme'
import {getByType, types} from '../utils/api'
import mergeGetInitialProps from '../hoc/mergeGetInitialProps'

const Container = g.div()
const Layout = ({ children, volunteering }) =>
  <ThemeProvider theme={theme}>
    <Container>
      <Helmet
        title=""
        meta={[
          { name: 'description', content: 'Obaat' },
          { name: 'keywords', content: 'obaat, uganda' },
        ]}
      >
      </Helmet>
      {children}
      <Header volunteering={ volunteering }/>
    </Container>
  </ThemeProvider>

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

import Helmet from 'react-helmet'
import Header from '../components/Header'
import g from 'glamorous'
import { ThemeProvider } from 'glamorous'
import theme from '../theme'
import {compose} from 'recompose'

const Container = g.div()
const Layout = ({ children }) =>
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
      <Header />
    </Container>
  </ThemeProvider>

export default Layout
export const withLayout = ComposedComponent => props => <Layout><ComposedComponent { ...props } /></Layout>

// Layout.getInitialProps = async function() {
//   console.log("HERE")
//   const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
//   const data = await res.json()
//
//   console.log(`Show data fetched. Count: ${data.length}`)
//
//   return {
//     shows: data
//   }
// }

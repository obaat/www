import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Header from '../components/Header'
import g from 'glamorous'
import { ThemeProvider } from 'glamorous'
import theme from '../theme';

const Container = g.div()

const TemplateWrapper = ({ children }) =>
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
      {children()}
      <Header />
    </Container>
  </ThemeProvider>

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper

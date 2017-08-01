import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Header from '../components/Header'
import g from 'glamorous'
import { ThemeProvider } from 'glamorous'

const theme = {
  colors: {
    blue: ['#0074d9', 'white'],
    normal: ['tomato', 'white'],
    info: ['#39cccc', 'white'],
    danger: ['#ff4136', 'white'],
  },
}

const Container = g.div({
  fontFamily:
    '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontWeight: 400,
  fontSize: '1rem',
  color: '#111',
  lineHeight: 1.5,
})

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
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css"
        />

        <link rel="stylesheet" href="https://unpkg.com/tachyons-box-sizing@3.1.7/css/tachyons-box-sizing.min.css" />
      </Helmet>
      <Header />
      {children()}
    </Container>
  </ThemeProvider>

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper

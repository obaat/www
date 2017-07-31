import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Header from '../components/Header';
import {ThemeProvider} from 'glamorous';

import './index.css'

const theme = {
  colors: {
    blue: '#07c',
  }
}

const TemplateWrapper = ({
  children
}) => (
    <div>
      <Helmet
        title=""
        meta={[
          { name: 'description', content: 'Obaat' },
          { name: 'keywords', content: 'obaat, uganda' },
        ]}
      >

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.5.0/css/bulma.min.css"/>
      </Helmet>
      <Header />
      <ThemeProvider theme={ theme }>
        {children()}
      </ThemeProvider>
    </div>
  )

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper

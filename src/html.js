import React, { Component } from "react"
import * as PropTypes from "prop-types"
import { TypographyStyle } from "react-typography"
import typography from "./utils/typography"

let stylesStr
if (process.env.NODE_ENV === `production`) {
  try {
    stylesStr = require(`!raw-loader!../public/styles.css`)
  } catch (e) {
    console.log(e)
  }
}

const propTypes = {
  headComponents: PropTypes.node.isRequired,
  body: PropTypes.node.isRequired,
  postBodyComponents: PropTypes.node.isRequired,
}

class Html extends Component {
  render() {
    let css
    if (process.env.NODE_ENV === `production`) {
      css = (
        <style
          id="gatsby-inlined-css"
          dangerouslySetInnerHTML={{ __html: stylesStr }}
        />
      )
    }

    return (
      <html op="news" lang="en">
        <head>
          {this.props.headComponents}

          <meta name="referrer" content="origin" />
          <meta charSet="utf-8" />
          <meta name="description" content="Gatsby example site using Glamor" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>One Brick at a Time</title>
          <TypographyStyle typography={typography} />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"/>
          <link rel="stylesheet" href="https://unpkg.com/tachyons-box-sizing@3.1.7/css/tachyons-box-sizing.min.css" />
          {css}
        </head>
        <body>
          <div
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}

Html.propTypes = propTypes

module.exports = Html

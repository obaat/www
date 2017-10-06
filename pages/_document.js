import React from "react"
import Document, { Head, Main, NextScript } from "next/document"
import { renderStatic } from "glamor/server"
export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const page = renderPage()
    const styles = renderStatic(() => page.html)
    return { ...page, ...styles }
  }

  constructor(props) {
    super(props)
    const { __NEXT_DATA__, ids } = props
    if (ids) {
      __NEXT_DATA__.ids = this.props.ids
    }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <title>One Brick at a Time</title>
          {/* fixme: only on IE */}
          <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.26.0/polyfill.min.js" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css"
          />

          <link
            rel="stylesheet"
            href="https://unpkg.com/tachyons-box-sizing@3.1.7/css/tachyons-box-sizing.min.css"
          />

          <link rel="stylesheet" href="/static/nprogress.css" />
          <link rel="stylesheet" href="/static/react-block-ui.css" />
          <link
            href="https://fonts.googleapis.com/css?family=Hind+Vadodara:300,400,500,700|Open+Sans:400,600"
            rel="stylesheet"
          />
          <meta name="referrer" content="origin" />
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="We partner up with community-based NGOs to develop network of mutual support and we recruit volunteers to maintain these projects. This is allowing for social investment in the regional economy in the Rwenzori Region and beyond."
          />

          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

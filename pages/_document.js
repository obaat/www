import Document, { Head, Main, NextScript } from 'next/document'
import { renderStatic } from 'glamor/server'
import typography from "../utils/typography"
import { TypographyStyle, GoogleFont } from "react-typography"

export default class MyDocument extends Document {
  static async getInitialProps ({ renderPage }) {
    const page = renderPage()
    const styles = renderStatic(() => page.html)
    return { ...page, ...styles }
  }

  constructor (props) {
    super(props)
    const { __NEXT_DATA__, ids } = props
    if (ids) {
      __NEXT_DATA__.ids = this.props.ids
    }
  }

  render () {
    return (
      <html op="charity" lang="en">
        <Head>
          <title>One Brick at a Time</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css" />
          <link rel="stylesheet" href="https://unpkg.com/tachyons-box-sizing@3.1.7/css/tachyons-box-sizing.min.css" />
          <TypographyStyle typography={typography} />
          <GoogleFont typography={typography} />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"/>

          <meta name="referrer" content="origin" />
          <meta charSet="utf-8" />
          <meta name="description" content="" />
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

/* eslint-disable react/no-danger */
import React, { Component } from "react"
import { extractCritical } from "emotion-server"
import { getByType, types } from "./src/utils/api"
import { data } from "./src/Routes"
import { map } from "asyncro"

export default {
  getSiteData: async () => {
    const volunteering = await getByType(types.VOLUNTEERING)
    const whatwedo = await getByType(types.WHAT_WE_DO_PAGE)
    return {
      volunteering: volunteering.results,
      whatwedo: whatwedo.results,
    }
  },
  getRoutes: async () => {
    const routes = await map(data, async v => {
      const { children: generateChildren } = v
      // resolve parent getData and pass to children
      const children = generateChildren && (await generateChildren())
      return { ...v, children }
    })

    return [
      ...routes,
      {
        is404: true,
        component: "components/404",
      },
    ]
  },

  renderToHtml: async (render, Comp, meta) => {
    const { html, css } = extractCritical(render(<Comp />))
    meta.css = css
    return html
  },
  siteRoot: "https://www.onebrick.org.uk",
  Document: class CustomDocument extends Component {
    render() {
      const { Html, Head, Body, children, renderMeta } = this.props

      return (
        <Html>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <script
              src="https://widgets.allocate.co.uk/stage/v1.js"
              async="async"
            />
            <script src="https://cdn.polyfill.io/v2/polyfill.min.js" />
            <style dangerouslySetInnerHTML={{ __html: renderMeta.css }} />
          </Head>
          <Body>{children}</Body>
          <link
            href="https://fonts.googleapis.com/css?family=Hind+Vadodara:300,400,500,700|Open+Sans:400,600"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css"
          />
          <link
            rel="stylesheet"
            href="https://unpkg.com/tachyons-box-sizing@3.1.7/css/tachyons-box-sizing.min.css"
          />
          <link rel="stylesheet" href="/css/nprogress.css" />
          <link rel="stylesheet" href="/css/react-block-ui.css" />
        </Html>
      )
    }
  },
}

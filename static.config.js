/* eslint-disable react/no-danger */
import React, { Component } from "react"
import { renderStatic } from "glamor/server"
import mapValues from "lodash/mapValues"
import { getByType, types } from "./utils/api"
import { data } from "./src/Routes"
const { map } = require("asyncro")

export default {
  getRoutes: async () => {
    const volunteering = await getByType(types.VOLUNTEERING)
    const allPages = {
      volunteering: volunteering.results,
    }
    const augment = target => async (...args) => {
      const rest = await target({ ...allPages, ...args })
      return {
        ...allPages,
        ...rest,
      }
    }

    const mappedData = await map(data, async v => {
      const { getProps, children: generateChildren } = v
      const children = generateChildren && (await generateChildren(allPages))

      return {
        ...v,
        children:
          children &&
          children.map(c => ({
            ...c,
            getProps: augment(c.getProps),
          })),
        getProps: augment(getProps),
      }
    })

    return mappedData
  },
  postRenderMeta: async html => ({
    glamorousData: renderStatic(() => html),
  }),
  siteRoot: "https://www.onebrick.org.uk",
  Html: class CustomHtml extends Component {
    render() {
      const {
        Html,
        Head,
        Body,
        children,
        staticMeta: { glamorousData: { css } = {} } = {},
      } = this.props

      return (
        <Html>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <script
              src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD9RbFyhZ3NtxgeYsCIs95rN4FXPg45VfQ"
              async
              defer
            />
            <meta name="referrer" content="origin" />
            <style dangerouslySetInnerHTML={{ __html: css }} />
          </Head>
          <Body>{children}</Body>
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
          <link
            href="https://fonts.googleapis.com/css?family=Hind+Vadodara:300,400,500,700|Open+Sans:400,600"
            rel="stylesheet"
          />
        </Html>
      )
    }
  },
}

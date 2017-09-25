import React, { Component } from "react"
import Container from "../components/Container"
import Helmet from "react-helmet"
import PageTitle from "../components/PageTitle"
import ApplyNow from "../components/ApplyNow"
import get from "lodash/get"
import g from "glamorous"
import BreadCrumbs from "../components/Breadcrumbs"
import { loadGetInitialProps } from "next/dist/lib/utils"
import { Absolute, Heading } from "../ui"

const Title = g(Heading)({
  color: "#000",
})

export default (config = {}) => ComposedComponent =>
  class WithPageTitle extends Component {
    static async getInitialProps(ctx) {
      return loadGetInitialProps(ComposedComponent, ctx)
    }

    render() {
      const { content, title: _title } = this.props
      const title = get(content, "title.0.text", _title || config.title)
      const image = get(
        content,
        ["header_image", "url"],
        get(content, ["image_gallery", 0, "image", "url"]),
      )
      const fullRoute = (config.route || []).concat({ title })
      return (
        <div>
          <PageTitle image={image}>
            {this.props.withApply && (
              <Absolute bottom right p={3}>
                <ApplyNow />
              </Absolute>
            )}
          </PageTitle>
          <Container pt={3}>
            <Helmet title={title} />
            <BreadCrumbs route={fullRoute} />
            {/* <Title>{title}</Title> */}
            <ComposedComponent {...this.props} />
          </Container>
        </div>
      )
    }
  }

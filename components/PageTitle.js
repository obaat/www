import React from "react"
import g from "glamorous"
import get from "lodash/get"
import { backgroundImageCover } from "../styleHelpers"
import { Flex, Heading } from "../ui"
import Helmet from "react-helmet"
import PrismicRichText from "../components/PrismicRichText"
import { menuHeightDocked } from "../utils/constants"

const Container = g(Flex)(
  {
    minHeight: "300px",
    backgroundColor: "#000",
  },
  backgroundImageCover,
).withProps({
  flex: 1,
  justify: "center",
  align: "center",
  direction: "column",
})

const Title = g(Heading)({
  textShadow: "0 2px 2px rgba(0,0,0,0.5)",
  color: "#fff",
})

export default ({ content, children, title: _title, ...props }) => {
  const image = get(
    content,
    ["header_image", "url"],
    get(content, ["image_gallery", 0, "image", "url"]),
  )
  const title = get(content, "title.0.text", _title)
  return (
    <Container image={image} pt={menuHeightDocked}>
      <Helmet title={title} />
      <Title>{title}</Title>
      {children}
    </Container>
  )
}

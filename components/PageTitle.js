import React from "react"
import g from "glamorous"
import get from "lodash/get"
import { backgroundImageCover } from "../styleHelpers"
import { Flex } from "../ui"
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

const Title = g(PrismicRichText)({
  textShadow: "0 2px 2px rgba(0,0,0,0.5)",
})

export default ({ content, children, ...props }) => {
  const image = get(
    content,
    ["header_image", "url"],
    get(content, ["image_gallery", 0, "image", "url"]),
  )
  const title = get(content, "title.0.text")
  return (
    <Container image={image} pt={menuHeightDocked}>
      <Helmet title={title} />
      <Title color="#fff" fontSize={6} source={content.title} />
      {children}
    </Container>
  )
}

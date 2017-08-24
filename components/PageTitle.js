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

export default ({ content, ...props }) => {
  const image = get(
    content,
    ["header_image", "url"],
    get(content, ["image_gallery", 0, "image"]),
  )
  const title = get(content, "title.0.text")
  return (
    <Container image={image} pt={menuHeightDocked}>
      <Helmet title={title} />
      <PrismicRichText color="#fff" fontSize={7} source={content.title} />
    </Container>
  )
}

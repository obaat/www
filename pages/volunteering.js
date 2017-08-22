import React from "react"
import Button from "../components/Button"
import g from "glamorous"
import { mapValues } from "lodash/fp"
import Link from "../components/Link"
import Helmet from "react-helmet"
import { getByUID } from "../utils/api"
import { withLayout } from "../components/Layout"
import PrismicRichText from "../components/PrismicRichText"
import SlideShow from "../components/SlideShow"
import { Flex, Box, ButtonTransparent } from "../ui"
import { backgroundImageCover } from "../styleHelpers"
import get from "lodash/get"
import { menuHeightDocked } from "../utils/constants"

const Container = g(Box)({
  maxWidth: "1024px",
  marginLeft: "auto",
  marginRight: "auto",
  //textAlign: "justify", c
})

const Title = g.div({
  textTransform: "uppercase",
})

const MenuItem = g(Link)({
  textTransform: "uppercase",
  p: 1,
})

const Section = ({ title, ...props }) =>
  props.source &&
  <div>
    {title &&
      <Title>
        {title}
      </Title>}
    <PrismicRichText {...props} />
  </div>

const PageTitle = g(Flex)(
  {
    minHeight: "300px",
  },
  backgroundImageCover,
).withProps({
  flex: 1,
  justify: "center",
  align: "center",
  direction: "column",
})

const Volunteering = ({ content }) => {
  const image = get(
    content,
    ["header_image", "url"],
    get(content, ["image_gallery", 0, "image", "url"]),
  )
  return (
    <div>
      <Helmet title={content.title && content.title[0].text} />
      <PageTitle pt={menuHeightDocked} image={image}>
        <PrismicRichText color="#fff" fontSize={7} source={content.title} />
      </PageTitle>
      <Container py={4}>
        <Flex>
          <Box w={2 / 3} pr={3}>
            <Section title="About the Programme" source={content.description} />
            <Section title="Costs" source={content.costs} />
            <Section title="Living" source={content.living} />
            <Section title="FAQ" source={content.living} />
          </Box>
          <Box w={1 / 3} bg="#ccc">
            <MenuItem to="#about" w={1}>
              About
            </MenuItem>
            <MenuItem to="#costs" w={1}>
              Costs
            </MenuItem>
            <MenuItem to="#living" w={1}>
              Living
            </MenuItem>
            <MenuItem to="#faq" w={1}>
              FAQ
            </MenuItem>
          </Box>
        </Flex>
      </Container>
    </div>
  )
}

Volunteering.getInitialProps = async ({ query }) => {
  const uid = query.id
  const res = await getByUID("volunteer_opportunity")(uid)
  return { content: res.data, meta: res }
}

export default withLayout(Volunteering)

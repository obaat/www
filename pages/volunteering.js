import React from "react"
import Button from "../components/Button"
import g from "glamorous"
import { mapValues } from "lodash/fp"
import XLink from "next/link"
import Helmet from "react-helmet"
import { getByUID } from "../utils/api"
import { withLayout } from "../components/Layout"
import PrismicRichText from "../components/PrismicRichText"
import SlideShow from "../components/SlideShow"
import { Flex, Box, Border, Tabs, TabItem } from "../ui"
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

const MenuItemLink = g(Border)({
  textTransform: "uppercase",
  borderBottom: "1px solid rgba(0,0,0,0.3)",
})

const MenuItem = ({ href, ...props }) =>
  <XLink href={href}>
    <Border borderColor="greyLighter" {...props} />
  </XLink>

const Section = ({ title, id, ...props }) =>
  props.source &&
  <div>
    <a id={id} />
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
          <Box w={1} mb={3}>
            <Tabs>
              <TabItem active>Beep</TabItem>
              <TabItem>Boop</TabItem>
              <TabItem>Bop</TabItem>
            </Tabs>
          </Box>
        </Flex>

        <Flex>
          <Box w={2 / 3} pr={3}>
            <Section
              id="about"
              title="About the Programme"
              source={content.description}
            />
            <Section id="costs" title="Costs" source={content.costs} />
            <Section id="living" title="Living" source={content.living} />
            <Section id="faq" title="FAQ" source={content.living} />
          </Box>
          <Box w={1 / 3} p={2} palette="greyLighter" invert>
            <MenuItem bottom href="#about" py={1} w={1}>
              About
            </MenuItem>
            <MenuItem bottom href="#costs" py={1} w={1}>
              Costs
            </MenuItem>
            <MenuItem bottom href="#living" py={1} w={1}>
              Living
            </MenuItem>
            <MenuItem bottom href="#faq" py={1} w={1}>
              FAQ
            </MenuItem>
            <Button px={1} my={3} w={1} palette="info" invert>
              Apply Now
            </Button>
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

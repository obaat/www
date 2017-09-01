import React from "react"
import { space, color } from "styled-system"
import { withLayout } from "../components/Layout"
import get from "lodash/get"
import Button from "../components/Button"
import Helmet from "react-helmet"
import g from "glamorous"
import { getSingleton, types } from "../utils/api"
import Link from "next/link"
import PrismicRichText from "../components/PrismicRichText"
import {
  Flex,
  Heading,
  Subhead,
  Box,
  H3,
  H4,
  Banner,
  ButtonCircleOutline,
} from "../ui"
import SlideShow from "../components/SlideShow"

const LeadButton = g(Button)({
  minWidth: "250px",
  backgroundColor: "rgba(0,0,0,0.2)",
}).withProps({
  palette: "brick",
  as: ButtonCircleOutline,
  mt: 3,
  bold: 500,
})

const mapping = {
  volunteering_page: () => "/volunteering",
  volunteer_opportunity: ({ uid }) => `/volunteering/${uid}`,
}

const mappingLocal = {
  volunteering_page: () => "/volunteering",
  volunteer_opportunity: ({ uid }) => `/volunteering?id=${uid}`,
}

const toRelativeUrl = ({ type, ...props }) => {
  return (mapping[type] || (() => "unknown"))(props)
}

const toLocalRelativeUrl = ({ type, ...props }) => {
  return (mappingLocal[type] || (() => "unknown"))(props)
}

const ActionButton = ({ prismicUrl, href, ...props }) => {
  const resolved = href ? href : toRelativeUrl(prismicUrl)
  const local = href ? href : toLocalRelativeUrl(prismicUrl)
  return (
    <Link href={local} as={resolved}>
      <LeadButton {...props} />
    </Link>
  )
}

const Mission = g.div(
  {
    fontStyle: "italic",
    textAlign: "center",
    maxWidth: "600px",
  },
  space,
)

const Panel = g(Flex)(
  {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  color,
)

const Slide = g(Banner)({
  textAlign: "center",
})

const IndexPage = ({ content }) => {
  const { hero, mission, mission_title } = content
  return (
    <div>
      <Helmet title="One Brick at a Time" />
      <Panel p={0}>
        <SlideShow autoplay autoplaySpeed={5000}>
          {hero.map(({ image, lead, strapline, url }, i) => (
            <Slide color="white" backgroundImage={image.url} key={i}>
              <Heading>{get(lead, "0.text")}</Heading>
              <Box w={1 / 2}>
                <H4>{get(strapline, "0.text")}</H4>
              </Box>
              <ActionButton prismicUrl={url}>See Opportunities</ActionButton>
            </Slide>
          ))}
        </SlideShow>
      </Panel>
      <Panel p={4}>
        <Heading>{get(mission_title, "0.text")}</Heading>
        <Mission my={4}>
          <PrismicRichText source={mission} />
        </Mission>
        <ActionButton href="/about">Learn More</ActionButton>
      </Panel>
    </div>
  )
}

IndexPage.componentDidMount = () => {
  window.setInterval
}

IndexPage.getInitialProps = async () => {
  const res = await getSingleton(types.HOME)
  return { content: res.data, meta: res }
}

export default withLayout(IndexPage)

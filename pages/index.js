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
  H5,
  Text,
  Banner,
  ButtonCircleOutline,
} from "../ui"
import SlideShow from "../components/SlideShow"
import CountUp, { startAnimation } from "react-countup"
import VisibilitySensor from "react-visibility-sensor"
import hoc from "../ui/hoc"

const Count = hoc()(CountUp)

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
    textAlign: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  color,
)

const Slide = g(Banner)({
  textAlign: "center",
})

class IndexPage extends React.Component {
  counters = []

  onVisible = isVisible => {
    console.log(isVisible)
    isVisible && this.counters.forEach(startAnimation)
  }

  render() {
    const { content } = this.props
    const { hero, mission, mission_title } = content
    return (
      <div>
        <Helmet title="One Brick at a Time" />
        <Panel p={0} direction="column">
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
        <Panel p={4} direction="column">
          <Heading>{get(mission_title, "0.text")}</Heading>
          <Mission my={4}>
            <PrismicRichText source={mission} />
          </Mission>
          <ActionButton href="/about">Learn More</ActionButton>
        </Panel>
        <VisibilitySensor onChange={this.onVisible} />
        <Panel py={4} direction="row" align="middle" palette="blue" invert>
          <Box w={1}>
            <Heading>Our Impact</Heading>
          </Box>
          <Box w={1 / 2} p={3}>
            <H5>Years Experience in Uganda</H5>
            <Count
              innerRef={c => this.counters.push(c)}
              start={0}
              end={10}
              f={40}
              duration={2.75}
              useEasing={true}
              suffix="+"
            />
          </Box>
          <Box w={1 / 2} p={3}>
            <H5>Trained Local People</H5>
            <Count
              innerRef={c => this.counters.push(c)}
              start={0}
              end={300}
              f={40}
              duration={2.75}
              useEasing={true}
              suffix="+"
            />
          </Box>
          <Box w={1 / 2} p={3}>
            <H5>Projects Completed</H5>
            <Count
              innerRef={c => this.counters.push(c)}
              start={0}
              end={23}
              f={40}
              duration={2.75}
              useEasing={true}
              suffix="+"
            />
          </Box>
          <Box w={1 / 2} p={3}>
            <H5>
              Opportunities Created
              <Text f={1}>for education, jobs and access to health care</Text>
            </H5>
            <Count
              innerRef={c => this.counters.push(c)}
              start={0}
              end={1500}
              f={40}
              duration={2.75}
              useEasing={true}
              suffix="+"
            />
          </Box>
        </Panel>
      </div>
    )
  }
}

IndexPage.componentDidMount = () => {
  window.setInterval
}

IndexPage.getInitialProps = async () => {
  const res = await getSingleton(types.HOME)
  return { content: res.data, meta: res }
}

export default withLayout(IndexPage)

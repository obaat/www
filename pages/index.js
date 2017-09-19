import React from "react"
import { space, color } from "styled-system"
import { visible } from "../styleHelpers"
import { withLayout } from "../components/Layout"
import { colors } from "../theme"
import Container from "../components/Container"
import get from "lodash/get"
import chunk from "lodash/chunk"
import Button from "../components/Button"
import Helmet from "react-helmet"
import g from "glamorous"
import { getByType, getSingleton, types } from "../utils/api"
import Link from "next/link"
import Icon from "../components/Icon"
import PrismicRichText from "../components/PrismicRichText"
import {
  Flex,
  Heading,
  Relative,
  Absolute,
  Subhead,
  Box,
  H3,
  H4,
  H5,
  Text,
  SubHead,
  Banner,
  Measure,
} from "../ui"
import SlideShow from "../components/SlideShow"
import Statement from "../components/Statement"
import CountUp, { startAnimation } from "react-countup"
import VisibilitySensor from "react-visibility-sensor"
import hoc from "../ui/hoc"

const Count = hoc()(CountUp)

const LeadButton = g(Button)({
  minWidth: "250px",
}).withProps({
  mt: 3,
  palette: "brick",
  invert: true,
  fontSize: 3,
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

const Mission = g(Measure)({
  textAlign: "left",
})

const Panel = g(Flex)(
  {
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  color,
)

const Lead = g(Heading)({
  // backgroundColor: colors.brick[0],
  // boxDecorationBreak: "clone",
  color: colors.brick[1],
  display: "inline",
  lineHeight: 1.3,
  padding: "0.5rem",
  maxWidth: "800px",
  textTransform: "uppercase",
}).withProps({
  fontSize: 60,
  bold: 800,
})

const Sub = g(hoc()(Subhead))({
  display: "inline",
  padding: "0.5rem",
  maxWidth: "800px",
  // backgroundColor: colors.brick[0],
  // boxDecorationBreak: "clone",
  // transition: "opacity 0.6s linear",
  color: colors.brick[1],
})

const BoxOut = g(Absolute)({
  maxWidth: "700px",
  textAlign: "left",
})

const cursorOpts = {
  show: false,
}

const transitionSpeed = 5000

class IndexPage extends React.Component {
  counters = []
  state = {
    visible: {},
    visibleSlide: null,
  }

  onVisible = isVisible => {
    isVisible && this.counters.forEach(startAnimation)
  }

  setTypingDoneFor = i => e =>
    this.setState({ visible: { ...this.state.visible, [i]: true } })

  setVisibleSlideIndex = idx => this.setState({ visibleSlide: idx })

  render() {
    const { content, statements } = this.props
    const { hero, mission, mission_title } = content
    const chunkedStatements = chunk(get(statements, "results", []), 2)

    return (
      <div>
        <Helmet title="One Brick at a Time" />
        <Panel p={0} direction="column">
          <SlideShow
            autoplay
            autoplaySpeed={transitionSpeed}
            onChange={this.setVisibleSlideIndex}
          >
            {hero.map(({ image, lead, strapline, button_text, url }, i) => (
              <Relative key={i}>
                <Banner color="white" backgroundImage={image.url}>
                  <Lead>{get(lead, "0.text")}</Lead>
                  <Sub visible={this.state.visibleSlide === i}>
                    {get(strapline, "0.text")}
                  </Sub>
                  <BoxOut p={3} bottom right>
                    <ActionButton prismicUrl={url}>
                      {button_text || "Find Out More"}
                    </ActionButton>
                  </BoxOut>
                </Banner>
              </Relative>
            ))}
          </SlideShow>
        </Panel>
        <Panel p={4} direction="row">
          <Box w={1 / 2} p={3} align="right">
            <PrismicRichText source={mission_title} forceType="heading1" />
          </Box>
          <Box w={1 / 2} p={3}>
            <Mission>
              <PrismicRichText source={mission} />
            </Mission>
          </Box>
          <ActionButton href="/about">Learn More</ActionButton>
        </Panel>

        <VisibilitySensor onChange={this.onVisible} />
        <Panel py={4} direction="row" palette="blue" invert>
          <Box w={1}>
            <Heading>Our Impact</Heading>
          </Box>
          <Box w={1 / 2} p={3}>
            <Icon f={50} mb={2} name="clock-o" />
            <H5 mb={2}>Years Experience in Uganda</H5>
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
            <Icon f={50} mb={2} name="wrench" />
            <H5 mb={2}>Trained Local People</H5>
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
            <Icon f={50} mb={2} name="hospital-o" />
            <H5 mb={2}>Projects Completed</H5>
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
            <Icon f={50} mb={2} name="users" />
            <H5 mb={2}>
              Opportunities Created
              <Text fontSize={0}>
                for education, jobs and access to health care
              </Text>
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
          <ActionButton palette="blue" invert={false} href="/projects">
            See Our Projects
          </ActionButton>
        </Panel>
        <Panel py={4} direction="row" palette="greyLighter" invert>
          <Box w={1}>
            <Heading>Volunteer Experiences</Heading>
          </Box>
          <Box w={1} p={3}>
            <SlideShow autoplay autoplaySpeed={transitionSpeed}>
              {chunkedStatements.map((statements, i) => (
                <Flex key={i} justify="center">
                  {statements.map((props, i) => (
                    <Statement key={i} {...props} />
                  ))}
                </Flex>
              ))}
            </SlideShow>
          </Box>
          <ActionButton
            palette="greyLighter"
            invert={false}
            href="/volunteering"
          >
            Learn More About Volunteering
          </ActionButton>
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
  const statements = await getByType(types.VOLUNTEER_STATEMENT)
  return { content: res.data, statements }
}

export default withLayout(IndexPage)

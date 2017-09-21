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
  H6,
  Text,
  SubHead,
  Banner,
  Measure,
  BackgroundImage,
} from "../ui"
import SlideShow from "../components/SlideShow"
import Statement from "../components/Statement"
import CountUp, { startAnimation } from "react-countup"
import VisibilitySensor from "react-visibility-sensor"
import hoc from "../ui/hoc"
import { menuHeightDocked } from "../utils/constants"

const Count = hoc()(CountUp)

const sideColors = ["blue", "brick", "greyLightere"]

const LeadButton = g(Button)({
  minWidth: "250px",
}).withProps({
  mt: [3, 2],
  palette: "brick",
  fontSize: [3, 2],
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

const Fill = g(Relative)({
  width: "100%",
  height: "100%",
})

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
  lineHeight: 1.3,
  padding: "0.5rem",
  textAlign: "left",
  maxWidth: "800px",
}).withProps({
  bold: 800,
  fontSize: [1, 1, 1, 5, 6],
})

const Sub = g(hoc()(Subhead))({
  padding: "0.5rem",
  maxWidth: "800px",
  textAlign: "left",
}).withProps({
  fontSize: [1, 1, 1, 3, 5],
})

const BoxOut = g(Absolute)({
  maxWidth: "700px",
  textAlign: "left",
})

const cursorOpts = {
  show: false,
}

const transitionSpeed = 6 * 1000

class IndexPage extends React.Component {
  counters = []
  state = {
    visible: {},
    visibleSlide: null,
  }

  onVisible = isVisible => {
    isVisible && this.counters.forEach(a => a && startAnimation(a))
  }

  setTypingDoneFor = i => e =>
    this.setState({ visible: { ...this.state.visible, [i]: true } })

  setVisibleSlideIndex = idx => this.setState({ visibleSlide: idx })

  render() {
    const { content, statements } = this.props
    const { visibleSlide } = this.state
    const { hero, mission, mission_title } = content
    const chunkedStatements = chunk(get(statements, "results", []), 2)

    return (
      <div>
        <Helmet title="One Brick at a Time" />
        <Panel p={0} direction="row">
          <Flex>
            <Box w={2 / 3}>
              <SlideShow
                autoplay
                hideZoom
                autoplaySpeed={transitionSpeed}
                onChange={this.setVisibleSlideIndex}
              >
                {hero.map(({ image, lead, strapline, button_text, url }, i) => (
                  <BackgroundImage ratio={2 / 3} src={image.url} key={i} />
                ))}
              </SlideShow>
            </Box>
            <Box w={1 / 3}>
              <SlideShow hideZoom hidePaging hideArrows index={visibleSlide}>
                {hero.map(({ image, lead, strapline, button_text, url }, i) => (
                  <Fill
                    key={i}
                    px={3}
                    pt={menuHeightDocked}
                    palette={sideColors[i]}
                    invert
                  >
                    <Lead>{get(lead, "0.text")}</Lead>
                    <Sub visible>{get(strapline, "0.text")}</Sub>
                    <Absolute bottom right m={3}>
                      <ActionButton prismicUrl={url} palette={sideColors[i]}>
                        {button_text || "Find Out More"}
                      </ActionButton>
                    </Absolute>
                  </Fill>
                ))}
              </SlideShow>
            </Box>
          </Flex>
        </Panel>
        <Panel>
          <Box w={1 / 2} p={3} align="right">
            <Subhead>One Brick at a time</Subhead>
          </Box>
          <Box w={1 / 2} p={3} align="justify">
            <Measure>
              <PrismicRichText source={mission} />
            </Measure>
          </Box>
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
            <H5 mb={0}>Opportunities Created</H5>
            <Text fontSize={0} mb={2}>
              for education, jobs and access to health care
            </Text>
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
          <ActionButton palette="blue" href="/projects">
            See Our Projects
          </ActionButton>
        </Panel>
        <Panel py={4} direction="row" palette="greyLighter" invert>
          <Box w={1}>
            <Heading>Volunteer Experiences</Heading>
          </Box>
          <Box w={1} p={3}>
            <SlideShow autoplay hideZoom autoplaySpeed={transitionSpeed}>
              {chunkedStatements.map((statements, i) => (
                <Flex key={i} justify="center">
                  {statements.map((props, i) => (
                    <Statement key={i} {...props} />
                  ))}
                </Flex>
              ))}
            </SlideShow>
          </Box>
          <ActionButton palette="greyLighter" href="/volunteering">
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

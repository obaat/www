import React from "react"
import Typist from "react-typist"
import { space, color } from "styled-system"
import { visible } from "../styleHelpers"
import { withLayout } from "../components/Layout"
import { colors } from "../theme"
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
  Relative,
  Absolute,
  Subhead,
  Box,
  H3,
  H4,
  H5,
  Text,
  Banner,
  ButtonCircle,
} from "../ui"
import SlideShow from "../components/SlideShow"
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
  as: ButtonCircle,
  f: 4,
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

const Lead = g(hoc()(Typist))({
  backgroundColor: colors.brick[0],
  boxDecorationBreak: "clone",
  color: colors.brick[1],
  display: "inline",
  lineHeight: 1.3,
  padding: "0.5rem",
}).withProps({
  f: 40,
})

const Sub = g(H4)(visible, {
  display: "inline",
  padding: "0.5rem",
  backgroundColor: colors.brick[0],
  boxDecorationBreak: "clone",
  lineHeight: 1.6,
  transition: "opacity 0.6s linear",
  color: colors.brick[1],
}).withProps({
  f: 4,
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
  }

  onVisible = isVisible => {
    isVisible && this.counters.forEach(startAnimation)
  }

  setTypingDoneFor = i => e =>
    this.setState({ visible: { ...this.state.visible, [i]: true } })

  render() {
    const { content } = this.props
    const { hero, mission, mission_title } = content
    return (
      <div>
        <Helmet title="One Brick at a Time" />
        <Panel p={0} direction="column">
          <SlideShow autoplay autoplaySpeed={transitionSpeed}>
            {hero.map(({ image, lead, strapline, url }, i) => (
              <Relative key={i}>
                <Banner color="white" backgroundImage={image.url}>
                  <BoxOut p={3} bottom left>
                    <Box>
                      <Lead
                        cursor={cursorOpts}
                        startDelay={i * (transitionSpeed + 100)}
                        onTypingDone={this.setTypingDoneFor(i)}
                      >
                        {get(lead, "0.text")}
                      </Lead>
                    </Box>
                    <Box mt={3}>
                      <Sub visible={this.state.visible[i]}>
                        {get(strapline, "0.text")}
                      </Sub>
                    </Box>
                  </BoxOut>
                  <BoxOut p={3} bottom right>
                    <ActionButton
                      icon="chevron-right"
                      prismicUrl={url}
                      iconPosition="right"
                    >
                      See Opportunities
                    </ActionButton>
                  </BoxOut>
                </Banner>
              </Relative>
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

import React from "react"
import g from "glamorous"
import { color } from "styled-system"
import theme from "../theme"
import get from "lodash/get"
import chunk from "lodash/chunk"
import Helmet from "react-helmet"
import Link from "next/link"
import CountUp, { startAnimation } from "react-countup"
import VisibilitySensor from "react-visibility-sensor"
import NewsMasonry from "../components/NewsMasonry"

import Button from "../components/Button"
import page from "../hoc/page"
import { getByType, getByIDs, getSingleton, types } from "../utils/api"
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
  ButtonOutline,
  Measure,
  BackgroundImage,
} from "../ui"
import SlideShow from "../components/SlideShow"
import Statement from "../components/Statement"
import hoc from "../ui/hoc"
import { menuHeightDocked } from "../utils/constants"
import Icons from "../components/SvgIcons"

const Count = hoc()(CountUp)

const stats = [
  {
    title: "Years Experience in Uganda",
    icon: Icons.Map,
    value: 10,
  },
  {
    title: "Trained Local People",
    icon: Icons.HeadCog,
    value: 10,
  },
  {
    title: "Projects Completed",
    icon: Icons.School,
    value: 10,
  },
  {
    title: "Opportunities Created",
    icon: Icons.User,
    value: 10,
    postfix: "for education, jobs and access to health care",
  },
]

const sideColors = ["blue", "brick", "greyLighter"]

const LeadButton = g(Button)({
  minWidth: "250px",
}).withProps({
  py: [1, 1, 1, 1, 2],
  palette: "brick",
  fontSize: [2, 2, 2, 2, 3],
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

const Fill = g(Relative)({})

const Mission = g(Measure)({
  textAlign: "left",
})

const Panel = g(Flex)(
  {
    textAlign: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  color,
).withProps({
  align: "center",
})

const Lead = g(Heading)({
  lineHeight: 1.3,
  padding: "0.5rem",
  textAlign: "left",
  maxWidth: "800px",
}).withProps({
  bold: 700,
  fontSize: [1, 1, 1, 5, 6],
})

const Sub = g(hoc()(Subhead))({
  padding: "0.5rem",
  maxWidth: "800px",
  textAlign: "left",
}).withProps({
  bold: 400,
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
    visibleSlide: 0,
  }

  onVisible = isVisible => {
    isVisible && this.counters.forEach(a => a && startAnimation(a))
  }

  setTypingDoneFor = i => e =>
    this.setState({ visible: { ...this.state.visible, [i]: true } })

  setVisibleSlideIndex = idx => this.setState({ visibleSlide: idx })

  render() {
    const { content, statements, news } = this.props
    const { visibleSlide } = this.state
    const { hero, mission, mission_title } = content
    const chunkedStatements = chunk(get(statements, "results", []), 2)
    const { image, lead, strapline, button_text, url } = hero[visibleSlide]
    return (
      <div>
        <Helmet title="One Brick at a Time" />
        <Panel p={0} direction="row">
          <Flex w={1}>
            <Box w={2 / 3}>
              <SlideShow
                autoplay
                hideZoom
                autoplaySpeed={transitionSpeed}
                onChange={this.setVisibleSlideIndex}
                controlColor={theme.colors[sideColors[visibleSlide]][0]}
              >
                {hero.map(({ image, lead, strapline, button_text, url }, i) => (
                  <BackgroundImage ratio={2 / 3} src={image.url} key={i} />
                ))}
              </SlideShow>
            </Box>
            <Box w={1 / 3} style={{ position: "relative" }}>
              <Absolute
                top
                bottom
                left
                right
                palette={sideColors[visibleSlide]}
                invert
                pt={menuHeightDocked}
                px={3}
              >
                <Box>
                  <Lead>{get(lead, "0.text")}</Lead>
                  <Sub>{get(strapline, "0.text")}</Sub>
                </Box>
              </Absolute>
            </Box>
          </Flex>
        </Panel>
        <Panel palette="black">
          <Box px={2} py={90} w={[1, 1, 1, 900]} align="center">
            <PrismicRichText
              style={{ lineHeight: 1.7 }}
              xmb={0}
              bold={700}
              source={mission}
              forceType="heading6"
            />
          </Box>
        </Panel>
        {/* {news &&
          news.body &&
          news.body.length > 0 && (
            <Panel py={4} direction="row" palette="black" invert>
              <Box align="center" w={1}>
                <Heading>News</Heading>
                <NewsMasonry items={news.results} />
              </Box>
            </Panel>
          )} */}

        <Panel py={4} direction="row" palette="blue" align="flex-start" invert>
          <Box w={1}>
            <Heading>Our Impact</Heading>
          </Box>
          <VisibilitySensor onChange={this.onVisible} />
          {stats.map(({ title, icon: Icon, value, postfix }) => (
            <Box w={1 / 4} p={3}>
              <Icon color="#fff" size={50} />
              <Box mt={1}>
                <Count
                  innerRef={c => this.counters.push(c)}
                  start={0}
                  end={value}
                  f={40}
                  duration={2.75}
                  useEasing={true}
                  suffix="+"
                />
              </Box>
              <H5 mt={2} mb={1}>
                {title}
              </H5>
              {postfix && <Text>{postfix}</Text>}
            </Box>
          ))}
          <ActionButton palette="blue" href="/projects">
            See Our Projects
          </ActionButton>
        </Panel>
        <Panel py={4} direction="row" palette="greyLighter" invert>
          <Box w={1}>
            <Heading>Volunteer Experiences</Heading>
          </Box>
          <Box w={1} p={3}>
            <SlideShow
              autoplay
              controlColor={theme.colors.greyLighter[1]}
              hideZoom
              autoplaySpeed={transitionSpeed}
            >
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

IndexPage.getInitialProps = async () => {
  const res = await getSingleton(types.HOME)
  const news = await getSingleton(types.NEWS)
  const { quotes } = res.data
  const ids = (quotes && quotes.map(l => l.quote.id)) || []
  const additionalData = ids.length ? await getByIDs(ids) : { results: [] }
  return { content: res.data, news: news.data, statements: additionalData }
}

export default page(IndexPage)

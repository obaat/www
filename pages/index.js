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
import Container from "../components/Container"

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
  ButtonCircle,
  ButtonCircleOutline,
} from "../ui"
import SlideShow from "../components/SlideShow"
import Statement from "../components/Statement"
import hoc from "../ui/hoc"
import { menuHeightDocked, themeCycle as sideColors } from "../utils/constants"
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
    value: 300,
  },
  {
    title: "Projects Completed",
    icon: Icons.School,
    value: 23,
  },
  {
    title: "Opportunities Created",
    icon: Icons.User,
    value: 1500,
    postfix: "for education, jobs and access to health care",
  },
]

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

const ActionButton = ({ prismicUrl, as, href, ...props }) => {
  const resolved = href ? href : toRelativeUrl(prismicUrl)
  const local = href ? href : toLocalRelativeUrl(prismicUrl)
  return (
    <Link href={local} as={resolved}>
      <LeadButton {...props} as={as || ButtonCircle} />
    </Link>
  )
}

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

const BOX_WIDTH = [1, 1, 1, 1000]

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
    const { content, statements, news, newsArticles } = this.props
    const { visibleSlide } = this.state
    const { hero, mission, mission_title } = content
    const chunkedStatements = chunk(get(statements, "results", []), 2)
    const { image, lead, strapline, button_text, url } = hero[visibleSlide]
    return (
      <div>
        <Helmet title="One Brick at a Time" />
        <Panel p={0} direction="row">
          <Box w={1}>
            <SlideShow
              autoplay
              hideZoom
              autoplaySpeed={transitionSpeed}
              onChange={this.setVisibleSlideIndex}
            >
              {hero.map(({ image, lead, strapline, button_text, url }, i) => (
                <BackgroundImage ratio={1 / 2.5} src={image.url} key={i} />
              ))}
            </SlideShow>
          </Box>
        </Panel>
        <Panel py={4} palette="gray2" invert>
          <Box px={2} py={2} w={[1, 1, 1, 900]} align="center">
            <PrismicRichText
              style={{ lineHeight: 1.7 }}
              xmb={0}
              bold={700}
              source={mission}
              forceType="heading6"
            />
          </Box>
          <Box w={1} mt={2}>
            <ActionButton
              palette="gray9"
              invert
              as={ButtonCircle}
              href="/about"
            >
              What we do
            </ActionButton>
          </Box>
        </Panel>
        {news &&
          news.body &&
          news.body.length > 0 && (
            <Panel pt={1} pb={4} direction="row" palette="gray2" invert>
              <Box align="center" w={[1, 1, 1, "80%"]}>
                <NewsMasonry items={news.body} data={newsArticles} />
              </Box>
            </Panel>
          )}

        <Panel py={4} direction="row" palette="gray9" align="flex-start" invert>
          <VisibilitySensor onChange={this.onVisible} />
          <Flex w={1} justify="center" w={BOX_WIDTH}>
            {stats.map(({ title, icon: Icon, value, postfix }) => (
              <Box p={3} key={title}>
                <Icon palette="cyan5" size={50} />
                <Box mt={3}>
                  <Count
                    innerRef={c => this.counters.push(c)}
                    start={0}
                    end={value}
                    f={50}
                    duration={2.75}
                    useEasing={true}
                  />
                </Box>
                <H5 mt={1} mb={1} bold={200}>
                  {title}
                </H5>
                {postfix && <Text>{postfix}</Text>}
              </Box>
            ))}
          </Flex>
          <Box w={1}>
            <ActionButton
              palette="gray9"
              href="/projects"
              as={ButtonCircleOutline}
            >
              See Our Projects
            </ActionButton>
          </Box>
        </Panel>
        <Panel py={4} direction="row" palette="gray2" invert>
          <Box align="center" w={BOX_WIDTH}>
            <SlideShow
              autoplay
              controlColor={theme.colors.gray1[1]}
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
          <Box w={1}>
            <ActionButton palette="gray9" invert href="/volunteering">
              Learn More About Volunteering
            </ActionButton>
          </Box>
        </Panel>
        <Panel py={4} direction="row" palette="cyan6" invert>
          <Box w={BOX_WIDTH}>
            <Text
              fontSize={40}
              style={{ fontStyle: "italic", lineHeight: "1.2em" }}
            >
              It is what we make out of what we have, not what we are given,
              that separates one person from another.
            </Text>
            <Text>Nelson Mandela</Text>
          </Box>
        </Panel>
      </div>
    )
  }
}

const byId = things =>
  things.results.reduce((a, t) => ({ ...a, [t.id]: t.data }), {})

IndexPage.getInitialProps = async () => {
  const res = await getSingleton(types.HOME)
  const news = await getSingleton(types.NEWS)
  const { quotes } = res.data
  const ids = (quotes && quotes.map(l => l.quote.id)) || []
  const statements = ids.length ? await getByIDs(ids) : { results: [] }

  const newsIds = news.data.body
    .filter(b => b.slice_type === "page")
    .map(b => b.primary.content.id)

  const newsArticles = byId(
    newsIds.length ? await getByIDs(newsIds) : { results: [] },
  )

  return { content: res.data, news: news.data, statements, newsArticles }
}

export default page(IndexPage)

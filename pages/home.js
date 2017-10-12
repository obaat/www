import React from "react"
import g from "glamorous"
import { color } from "styled-system"
import theme from "../theme"
import get from "lodash/get"
import chunk from "lodash/chunk"
import Helmet from "react-helmet"
import { Link } from "react-static"
import CountUp, { startAnimation } from "react-countup"
import VisibilitySensor from "react-visibility-sensor"
import NewsMasonry from "../components/NewsMasonry"
import Container from "../components/Container"

import Button from "../components/Button"
import page from "../hoc/page"
import { getByType, getByIDs, getSingleton, types } from "../utils/api"
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
import srcTheme from "../theme"
import hexRgb from "hex-rgb"
const bg = hexRgb(srcTheme.colors.gray2[0])

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
    title: "Building Projects Completed",
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
    <Link to={resolved}>
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

const BOX_WIDTH = [1, 1, 1, 1200]

const transitionSpeed = 7 * 1000

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

        {image &&
          image.url && (
            <Helmet
              meta={[
                { property: "og:image", content: image.url },
                // { property: "og:title", content: image },
              ]}
            />
          )}
        <Panel p={0} direction="row">
          <Box w={1}>
            <SlideShow
              autoplay
              hideZoom
              autoplaySpeed={transitionSpeed}
              onChange={this.setVisibleSlideIndex}
            >
              {hero.map(({ image, lead, strapline, button_text, url }, i) => (
                <BackgroundImage
                  style={{ position: "relative", textAlign: "left" }}
                  ratio={[1, 1 / 1.5, 1 / 2.5, 1 / 2.5]}
                  src={image.url}
                  key={i}
                >
                  <Absolute
                    bottom
                    left
                    right
                    mx={[0, 0, 4, 4]}
                    my={[0, 0, 4, 4]}
                  >
                    <PrismicRichText
                      w={[1, 1, 1, 2 / 3]}
                      source={lead}
                      style={{
                        backgroundColor: "rgba(0,0,0,0.3)",
                        textShadow: "0px 0px 3px rgba(0,0,0,0.3)",
                        lineHeight: "1em",
                      }}
                      forceType="headingasdiv"
                      fontSize="4.5vw"
                      bold={500}
                      xmb={0}
                      color="black"
                      invert
                      p={2}
                    />
                    <PrismicRichText
                      w={[1, 1, 1, 2 / 3]}
                      source={strapline}
                      forceType="headingasdiv"
                      bold={500}
                      fontSize={[16, 16, 16, 24]}
                      color="black"
                      bg={`rgba(${bg[0]},${bg[1]},${bg[2]},0.8)`}
                      xmb={0}
                      pt={2}
                      px={2}
                      pb={[50, 50, 2, 2]}
                    />
                  </Absolute>
                </BackgroundImage>
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
          <Flex w={1} justify="center" wrap="wrap" w={BOX_WIDTH}>
            {stats.map(({ title, icon: Icon, value, postfix }) => (
              <Flex
                p={3}
                w={[1, 1, 1 / 2, 1 / 4]}
                key={title}
                align="center"
                direction="column"
              >
                <Box>
                  <Icon palette="cyan5" size={50} />
                </Box>
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
              </Flex>
            ))}
          </Flex>
          <Box w={1}>
            <ActionButton
              palette="gray9"
              href="/projects"
              as={ButtonCircleOutline}
            >
              Completed Projects
            </ActionButton>
          </Box>
        </Panel>
        <Panel py={4} direction="row" palette="gray2" invert>
          <Box align="center" w={BOX_WIDTH}>
            <SlideShow
              autoplay
              controlColor={theme.colors.gray1[1]}
              hideZoom
              autoplaySpeed={transitionSpeed * 2}
            >
              {chunkedStatements.map((statements, i) => (
                <Flex key={i} wrap="wrap" justify="center" mx={3}>
                  {statements.map((props, i) => (
                    <Statement w={[1, 1, 1, 1 / 2]} key={i} {...props} />
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
          <Box w={BOX_WIDTH} mx={1}>
            <Heading
              fontSize={[24, 24, 24, 35]}
              bold={300}
              style={{ fontStyle: "italic", lineHeight: "1.2em" }}
            >
              It is through education that the daughter of a peasant can become
              a doctor, that the son of a mineworker can become the head of a
              mine, or that a child of farmworkers can become the president of a
              great nation.
            </Heading>
            <Text style={{ float: "right" }} fontSize={20} mr={2}>
              Nelson Mandela
            </Text>
          </Box>
        </Panel>
      </div>
    )
  }
}

const byId = things =>
  things.results.reduce((a, t) => ({ ...a, [t.id]: t.data }), {})

export const path = "/"

export const data = async () => {
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

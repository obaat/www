import { space, color, fontSize } from "styled-system"
import { withLayout } from "../components/Layout"
import Button from "../components/Button"
import Helmet from "react-helmet"
import g from "glamorous"
import { getSingleton, types } from "../utils/api"
import { backgroundImageCover, overlay } from "../styleHelpers"
import PrismicRichText from "../components/PrismicRichText"
import { Flex, Absolute, Box, Heading, Banner } from "../ui"
import SlideShow from "../components/SlideShow"

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

const IndexPage = ({ content }) => {
  const { hero, mission, mission_title } = content
  return (
    <div>
      <Helmet title="One Brick at a Time" />
      <Panel p={0}>
        <SlideShow autoplay>
          {hero.map(({ image, lead, strapline }, i) =>
            <Banner color="white" backgroundImage={image.url} key={i}>
              <Heading fontSize={8}>
                {lead[0].text}
              </Heading>
              <Heading f={5}>
                {strapline[0].text}
              </Heading>
            </Banner>,
          )}
        </SlideShow>
      </Panel>
      <Panel p={4}>
        <Banner fontSize={8}>
          {mission_title[0].text}
        </Banner>
        <Mission my={4}>
          <PrismicRichText source={content.mission} />
        </Mission>
        <Button context="info">Learn More</Button>
      </Panel>
    </div>
  )
}

IndexPage.componentDidMount = () => {
  window.setInterval
}

IndexPage.getInitialProps = async ({ query }) => {
  const uid = query.id
  const res = await getSingleton(types.HOME)
  return { content: res.data, meta: res }
}

export default withLayout(IndexPage)

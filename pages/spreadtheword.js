import React from "react"
import g from "glamorous"
import get from "lodash/get"
import { getSingleton, getByType, getByIDs, types } from "../utils/api"
import { pageWithTitle } from "../hoc/page"
import PrismicRichText from "../components/PrismicRichText"
import { Link } from "react-static"
import { Flex, Relative, Absolute, Box, Border, BackgroundImage } from "../ui"
import { ArrowRight } from "../components/SvgIcons"
import { HumanDate } from "../utils/date"
import SidebarHeader from "../components/SidebarHeader"

const Overlay = g(Absolute)({
  pointerEvents: "none",
  background: "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2))",
}).withProps({
  top: true,
  bottom: true,
  left: true,
  right: true,
  p: 2,
})

const Event = ({ uid, data }) => (
  <Relative mb={2}>
    <Link to={`/event/${uid}`}>
      <BackgroundImage
        bg="#000"
        color="#fff"
        ratio={1 / 2}
        src={get(data, "header_image.url")}
      >
        <Overlay>
          <Absolute bottom left p={2}>
            {data.title && (
              <PrismicRichText
                forceType="heading4"
                color="#fff"
                source={data.title}
                xmb={0}
              />
            )}
            {data.date_start && <HumanDate iso={data.date_start} />}
          </Absolute>
        </Overlay>

        <Absolute bottom right p={2}>
          <ArrowRight />
        </Absolute>
      </BackgroundImage>
    </Link>
  </Relative>
)

const Location = ({ uid, data }) => (
  <Relative mb={2}>
    <SlideShow hidePaging controlSize={18}>
      {data.image_gallery.map(({ image, description }, i) => (
        <BackgroundImage src={image.url} key={i} />
      ))}
    </SlideShow>
    <Overlay>
      {data.title && (
        <PrismicRichText
          forceType="heading5"
          color="#fff"
          source={data.title}
        />
      )}
    </Overlay>
    <Absolute bottom right p={1}>
      <Link to={`/location/${uid}`}>
        <Button
          palette="normal"
          color="#fff"
          bg="rgba(0,0,0,0.3)"
          invert
          icon="ArrowRight"
          iconSize={12}
          w={1}
          py={1}
          as={ButtonOutline}
        >
          More
        </Button>
      </Link>
    </Absolute>
  </Relative>
)
const Spread = ({ events, content = {} }) => {
  return (
    <Flex>
      <Box w={[1, 1, 1, 2 / 3]} pr={3}>
        <PrismicRichText source={content.description} />
      </Box>
      <Box w={[1, 1, 1, 1 / 3]} px={3}>
        <SidebarHeader>Events</SidebarHeader>
        {events &&
          events.results &&
          events.results.map((props, i) => <Event key={i} {...props} />)}
      </Box>
    </Flex>
  )
}

export const data = async () => {
  const events = await getByType(types.EVENT)
  const page = await getSingleton(types.SPREAD_THE_WORD_PAGE_CONTENT)
  return { content: page.data, events }
}

export default pageWithTitle()(Spread)

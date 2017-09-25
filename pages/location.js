import React from "react"
import { getByUID, types } from "../utils/api"
import ApplyNow from "../components/ApplyNow"
import { pageWithTitle } from "../hoc/page"
import PrismicRichText from "../components/PrismicRichText"
import SlideShow from "../components/SlideShow"
import { Flex, Box, BackgroundImage, Heading } from "../ui"

const Location = ({ content = {} }) => {
  return (
    <Flex wrap="wrap">
      <Box w={[1, 1, 1, 1 / 2]}>
        <SlideShow autoplay controlSize={24}>
          {content.image_gallery.map(({ image, description }, i) => (
            <BackgroundImage src={image.url} key={i} />
          ))}
        </SlideShow>
      </Box>
      <Box w={[1, 1, 1, 1 / 2]} pl={[0, 0, 0, 3]}>
        <PrismicRichText source={content.description} />
      </Box>
    </Flex>
  )
}

Location.getInitialProps = async ({ query }) => {
  const location = await getByUID(types.VOLUNTEERING_OPPORTUNITY_LOCATION)(
    query.id,
  )
  return { content: location.data }
}

export default pageWithTitle({ withApply: true })(Location)

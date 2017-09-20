import React from "react"
import { getByUID, types } from "../utils/api"
import ApplyNow from "../components/ApplyNow"
import { withLayout } from "../components/Layout"
import PrismicRichText from "../components/PrismicRichText"
import SlideShow from "../components/SlideShow"
import {
  Absolute,
  Relative,
  Embed,
  Flex,
  Box,
  BackgroundImage,
  Heading,
} from "../ui"
import PageTitle from "../components/PageTitle"
import Container from "../components/Container"
import get from "lodash/get"

const Location = ({ content = {} }) => {
  return (
    <div>
      <Relative>
        <PageTitle content={content}>
          <Absolute bottom right p={3}>
            <ApplyNow />
          </Absolute>
        </PageTitle>
      </Relative>
      <Container py={4}>
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
      </Container>
    </div>
  )
}

Location.getInitialProps = async ({ query }) => {
  const location = await getByUID(types.VOLUNTEERING_OPPORTUNITY_LOCATION)(
    query.id,
  )
  return { content: location.data }
}

export default withLayout(Location)

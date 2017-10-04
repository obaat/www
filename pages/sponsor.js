import React from "react"
import { getSingleton, getByIDs, types } from "../utils/api"
import { pageWithTitle } from "../hoc/page"
import PrismicRichText from "../components/PrismicRichText"
import { Flex, Box, Border, BackgroundImage } from "../ui"

const Sponsor = ({ members = [], content = {} }) => (
  <Flex>
    <Box w={[1, 1, 1, 2 / 3]} pr={3}>
      <PrismicRichText source={content.description} />
    </Box>
  </Flex>
)

Sponsor.getInitialProps = async () => {
  const page = await getSingleton(types.SPONSOR_PAGE_CONTENT)
  return { content: page && page.data }
}

export default pageWithTitle()(Sponsor)

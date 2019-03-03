import React from "react"
import { getSingleton, types } from "../utils/api"
import { pageWithTitle } from "../hoc/page"
import PrismicRichText from "../components/PrismicRichText"
import { QuoteOpen } from "../components/SvgIcons"
import { Absolute, Relative, Flex, Box, Border } from "../ui"

const Mission = ({ content = {} }) => (
  <Flex>
    <Box width={[1, 1, 1, 2 / 3]} pr={3}>
      <PrismicRichText source={content.description} />
    </Box>
    <Box width={[1, 1, 1, 1 / 3]}>
      <Relative>
        <Absolute top left={-43}>
          <QuoteOpen palette="base" size={32} />
        </Absolute>
        <Border
          left
          borderWidth={4}
          borderColor="base"
          palette="gray2"
          p={2}
          invert
        >
          <PrismicRichText source={content.mission} />
        </Border>
      </Relative>
    </Box>
  </Flex>
)

export const data = async () => {
  const page = await getSingleton(types.MISSION_PAGE_CONTENT)
  return { content: page && page.data }
}

export default pageWithTitle()(Mission)

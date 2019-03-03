import React from "react"
import { getSingleton, types } from "../utils/api"
import { pageWithTitle } from "../hoc/page"
import PrismicRichText from "../components/PrismicRichText"
import { Flex, Box, Border, BackgroundImage } from "../ui"

const About = ({ content = {} }) => {
  return (
    <Flex wrap="wrap">
      <Box width={1}>
        {content.section.map((section, i) => (
          <Border bottom borderColor="gray4" key={i} mb={4}>
            <Flex wrap="wrap">
              <Box
                width={[1, 1, 0.45, 0.45]}
                pr={i % 2 ? 4 : 0}
                pl={i % 4 ? 0 : 4}
                mt={50}
              >
                <BackgroundImage ratio={2 / 3} src={section.image.url} />
              </Box>
              <Box width={[1, 1, 0.55, 0.55]} order={i % 2 ? 1 : -1} mb={2}>
                <PrismicRichText source={section.title} forceType="heading6" />
                <PrismicRichText source={section.description} />
              </Box>
            </Flex>
          </Border>
        ))}
      </Box>
    </Flex>
  )
}

export const data = async () => {
  const page = await getSingleton(types.ABOUT_PAGE_CONTENT)
  return { content: page.data }
}

export default pageWithTitle()(About)

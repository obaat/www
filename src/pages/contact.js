import React from "react"
import { getSingleton, types } from "../utils/api"
import { pageWithTitle } from "../hoc/page"
import PrismicRichText from "../components/PrismicRichText"
import { Flex, Box } from "../ui"

const Contact = ({ content = {} }) => {
  return (
    <Flex wrap="wrap">
      <Box width={1}>
        <PrismicRichText source={content.description} />
      </Box>
    </Flex>
  )
}

export const data = async () => {
  const page = await getSingleton(types.CONTACT_PAGE_CONTENT)
  return { content: page.data }
}

export default pageWithTitle()(Contact)

import React from "react"
import { getSingleton, getByIDs, types } from "../utils/api"
import { pageWithTitle } from "../hoc/page"
import PrismicRichText from "../components/PrismicRichText"
import { Flex, Box, Border, BackgroundImage } from "../ui"
import PageTitle from "../components/PageTitle"
import Container from "../components/Container"

const Contact = ({ content = {} }) => {
  return (
    <Flex wrap="wrap">
      <Box w={1}>
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

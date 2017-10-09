import React from "react"
import { getByUID, types } from "../utils/api"
import { pageWithTitle } from "../hoc/page"
import PrismicRichText from "../components/PrismicRichText"
import { Flex, Box, Border, BackgroundImage } from "../ui"
import PrismicSlice from "../components/PrismicSlice"

const Gallery = ({ content = {} }) => {
  const body = content.body || []
  const galleries = body.map((props, i) => (
    <PrismicSlice key={i} inline {...props} />
  ))
  return (
    <Flex wrap="wrap">
      <Box w={1}>
        <PrismicRichText source={content.description} />
      </Box>
      <Box w={1}>{galleries}</Box>
    </Flex>
  )
}

export const data = async ({ query: { id } }) => {
  const res = await getByUID(types.GALLERY)(id)
  return { content: res.data }
}

export default pageWithTitle()(Gallery)

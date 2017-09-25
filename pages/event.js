import React from "react"
import { types, getByUID } from "../utils/api"
import { pageWithTitle } from "../hoc/page"
import PrismicRichText from "../components/PrismicRichText"
import { Flex, Box, Border, BackgroundImage } from "../ui"
import PrismicSlice from "../components/PrismicSlice"

const Event = ({ content = {} }) => {
  const sections = content.body.map((props, i) => (
    <PrismicSlice key={i} {...props} />
  ))
  return (
    <div>
      <PrismicRichText source={content.description} />
      {sections}
    </div>
  )
}

Event.getInitialProps = async ({ query: { id: uid } }) => {
  const res = await getByUID(types.EVENT)(uid)
  return { content: res.data }
}

export default pageWithTitle()(Event)

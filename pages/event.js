import React from "react"
import { types, getByUID } from "../utils/api"
import page from "../hoc/page"
import PrismicRichText from "../components/PrismicRichText"
import { Flex, Box, Border, BackgroundImage } from "../ui"
import PageTitle from "../components/PageTitle"
import Container from "../components/Container"
import PrismicSlice from "../components/PrismicSlice"

const Event = ({ content = {} }) => {
  const sections = content.body.map((props, i) => (
    <PrismicSlice key={i} {...props} />
  ))
  return (
    <div>
      <PageTitle content={content} />
      <Container py={4}>
        <PrismicRichText source={content.description} />
        {sections}
      </Container>
    </div>
  )
}

Event.getInitialProps = async ({ query: { id: uid } }) => {
  const res = await getByUID(types.EVENT)(uid)
  return { content: res.data }
}

export default page(Event)

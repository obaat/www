import React from "react"
import { types, getByUID } from "../utils/api"
import { withLayout } from "../components/Layout"
import PrismicRichText from "../components/PrismicRichText"
import { Flex, Box, Border, BackgroundImage } from "../ui"
import PageTitle from "../components/PageTitle"
import Container from "../components/Container"

const Embed = ({ type, provider_name, width, html, height, ...props }) => {
  switch (provider_name) {
    case "YouTube": {
      const src = { __html: html }
      return <div style={{ width, height }} dangerouslySetInnerHTML={src} />
    }
  }
}

const renderers = {
  video: ({ items = [] }) => (
    <div>
      {items.map(({ description, embed }) => (
        <div>
          <PrismicRichText w={1} forceType="heading5" source={description} />
          <Embed {...embed} />
        </div>
      ))}
    </div>
  ),
  text_only: ({ primary, items }) =>
    primary.description && <PrismicRichText source={primary.description} />,
}

const Unknown = () => <div>?</div>

const renderPrismicSlice = ({ slice_type, items, primary }, i) => {
  const Component = renderers[slice_type] || Unknown

  return (
    <div key={i}>
      {primary.title && (
        <PrismicRichText forceType="heading5" source={primary.title} />
      )}
      <Component primary={primary} items={items} />
    </div>
  )
}

const Event = ({ content = {} }) => {
  const sections = content.body.map(renderPrismicSlice)
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

export default withLayout(Event)

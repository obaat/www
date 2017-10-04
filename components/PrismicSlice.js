import React from "react"
import Embed from "../components/Embed"
import SlideShow from "../components/SlideShow"
import Icon from "../components/Icon"
import PrismicRichText from "../components/PrismicRichText"
import { Flex, Border, BackgroundImage, Box, Table, Tr, Td } from "../ui"

export const Unknown = ({ slice_type }) => (
  <div> Unknown slice: {slice_type}</div>
)

const Video = ({ items = [] }) => {
  return (
    <div>
      {items.map(({ description, content, embed }, i) => (
        <Box mb={2} key={i}>
          {description && (
            <PrismicRichText w={1} forceType="heading5" source={description} />
          )}
          <Embed {...embed || content} />
        </Box>
      ))}
    </div>
  )
}

const Text = ({ primary, items }) => {
  const value = primary.description || primary.content
  return value && <PrismicRichText source={value} />
}

export const renderers = {
  video: Video,
  embeds: Video,
  text_only: Text,
  faq: ({ items = [] }) => (
    <Box>
      {items.map(({ question, answer }, i) => (
        <Box key={i} w={1}>
          <Flex>
            <Box pr={1}>
              <Icon name="comment-o" f={14} />
            </Box>
            <Box w={1} pt="3px">
              <PrismicRichText
                forceType="paragraph"
                bold={900}
                source={question}
                xmb={0}
              />
            </Box>
          </Flex>
          <Flex>
            <Box w={1} pt="3px">
              <PrismicRichText
                w={1}
                forceType="paragraph"
                source={answer}
                mb={3}
              />
            </Box>
          </Flex>
        </Box>
      ))}
    </Box>
  ),

  table: ({ items = [] }) => (
    <Table width="100%">
      <tbody>
        {items.map(({ column_1, column_2 }, i) => (
          <Tr key={i} mb={1} cellpadding={0} cellspacing={0}>
            <Td w={1 / 2}>
              <Border top borderColor="gray4" borderWidth={i > 0 ? 1 : 0}>
                <PrismicRichText mt={i > 0 ? 2 : 0} source={column_1} />
              </Border>
            </Td>
            <Td>
              <Border top borderColor="gray4" borderWidth={i > 0 ? 1 : 0}>
                <PrismicRichText mt={i > 0 ? 2 : 0} source={column_2} />
              </Border>
            </Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  ),

  image_gallery: ({ items = [] }) => {
    return (
      <SlideShow controlSize={18}>
        {items.map(({ gallery_image: { url } }, i) => (
          <BackgroundImage src={url} key={i} />
        ))}
      </SlideShow>
    )
  },
}

const PrismicSlice = ({ slice_type, items, primary }) => {
  const title = primary.title && (
    <PrismicRichText forceType="heading6" source={primary.title} />
  )
  const Component = renderers[slice_type] || Unknown
  return (
    <div>
      {title}
      <Component
        primary={primary}
        items={items}
        slice_type={slice_type || "No slice type"}
      />
    </div>
  )
}

export default PrismicSlice

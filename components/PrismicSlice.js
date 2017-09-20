import React from "react"
import Embed from "../components/Embed"
import SlideShow from "../components/SlideShow"
import PrismicRichText from "../components/PrismicRichText"
import { Flex, Border, BackgroundImage, Box, Table, Tr, Td } from "../ui"

const Unknown = ({ slice_type }) => <div> {slice_type} ???</div>

const Video = ({ items = [] }) => {
  return (
    <div>
      {items.map(({ description, embed }, i) => (
        <Box mb={2} key={i}>
          <PrismicRichText w={1} forceType="heading5" source={description} />
          <Embed {...embed} />
        </Box>
      ))}
    </div>
  )
}

export const renderers = {
  video: Video,
  embeds: Video,
  text_only: ({ primary, items }) =>
    primary.description && <PrismicRichText source={primary.description} />,
  faq: ({ items = [] }) => (
    <Box>
      {items.map(({ question, answer }, i) => (
        <Box key={i} w={1}>
          <PrismicRichText w={1} forceType="heading5" source={question} />
          <PrismicRichText w={1} forceType="paragraph" source={answer} mb={3} />
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
              <Border top borderColor="greyLighter" borderWidth={i > 0 ? 1 : 0}>
                <PrismicRichText mt={i > 0 ? 2 : 0} source={column_1} />
              </Border>
            </Td>
            <Td>
              <Border top borderColor="greyLighter" borderWidth={i > 0 ? 1 : 0}>
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
      <Component primary={primary} items={items} />
    </div>
  )
}

export default PrismicSlice

import React from "react"
import Embed from "../components/Embed"
import SlideShow from "../components/SlideShow"
import PrismicRichText from "../components/PrismicRichText"
import { Element, scroller } from "react-scroll"
import { FilePdf } from "../components/SvgIcons"
import { Flex, Border, Link, BackgroundImage, Box, Table, Tr, Td } from "../ui"
import { FullHumanDate } from "../utils/date"
import styled from "@emotion/styled"

export const UnknownRenderer = ({ slice_type }) => (
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
          <Embed
            {...embed || content}
            containerWidth="auto"
            containerHeight="auto"
          />
        </Box>
      ))}
    </div>
  )
}

const Paper = styled.div({
  background: "#fff",
  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
  padding: "24px",
  marginBottom: "15px",
  position: "relative",
  ":before": {
    content: '""',
    height: "98%",
    position: "absolute",
    width: "100%",
    zIndex: "-1",
    background: "#fafafa",
    boxShadow: "0 0 8px rgba(0,0,0,0.2)",
    left: "-5px",
    top: "4px",
    transform: "rotate(-2.5deg)",
  },
  ":after": {
    content: '""',
    height: "98%",
    position: "absolute",
    width: "100%",
    zIndex: "-1",
    background: "#f6f6f6",
    boxShadow: "0 0 3px rgba(0,0,0,0.2)",
    right: "-3px",
    top: "1px",
    transform: "rotate(1.4deg)",
  },
})

const titleToHash = title => title[0].text.toLowerCase().replace(/ /g, "_")

const BlogEntries = ({ primary, items }) => (
  <div>
    {items.map(({ title, date, description }, i) => (
      <Paper key={i}>
        <Element name={title[0].text}>
          <Flex wrap="wrap">
            <Box mb={2} w={1}>
              {title && (
                <PrismicRichText
                  w={1}
                  xmb={0}
                  forceType="heading6"
                  source={title}
                />
              )}
              {date && <FullHumanDate iso={date} />}
            </Box>
            <Box w={1}>
              <PrismicRichText w={1} source={description} />
            </Box>
          </Flex>
        </Element>
      </Paper>
    ))}
  </div>
)

const Text = ({ primary, items }) => {
  const value = primary.text || primary.description || primary.content
  return value && <PrismicRichText source={value} />
}

const Document = ({ primary, items }) => {
  return (
    <Flex>
      <Box w={1 / 2}>
        <PrismicRichText source={primary.description || primary.content} />
      </Box>
      <Flex w={1 / 2} wrap="wrap">
        {items.map(({ title, file: { kind, url } }, i) => (
          <Link key={i} to={url} target="_blank">
            <Flex align="center" justify="center" inline>
              <Box pr={1}>
                <FilePdf color="#000" size={60} />
              </Box>
              <Box>
                <PrismicRichText xmb={0} forceType="small" source={title} />
              </Box>
            </Flex>
          </Link>
        ))}
      </Flex>
    </Flex>
  )
}

export const renderers = {
  video: Video,
  embeds: Video,
  embed: Video,
  text_only: Text,
  text: Text,
  diary: BlogEntries,
  files: Document,
  faq: ({ items = [] }) => (
    <Box>
      {items.map(({ question, answer }, i) => (
        <Box key={i} w={1}>
          <Flex>
            <Box w={1} mb={1}>
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
              <Border left borderWidth={2} mb={2} pl={2} borderColor="gray6">
                <PrismicRichText
                  forceType="paragraph"
                  source={answer}
                  xmb={0}
                />
              </Border>
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

  image_gallery: ({ items = [], ...props }) => {
    return (
      <SlideShow controlSize={18} autoplay {...props}>
        {items.map(({ gallery_image: { url } }, i) => (
          <BackgroundImage src={url} key={i} />
        ))}
      </SlideShow>
    )
  },
}

const PrismicSlice = ({ slice_type, items, primary, ...props }) => {
  const title = primary.title && (
    <PrismicRichText forceType="heading6" source={primary.title} />
  )
  const Component = renderers[slice_type] || UnknownRenderer
  return (
    <div>
      {title}
      <Component
        primary={primary}
        items={items}
        slice_type={slice_type || "No slice type"}
        {...props}
      />
    </div>
  )
}

export default PrismicSlice

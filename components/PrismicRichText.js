import React from "react"
import { Flex, Box } from "grid-styled"
import g from "glamorous"
import mapValues from "lodash/mapValues"
import hoc from "../ui/hoc"
import map from "lodash/map"

const types = {
  heading1: "h1",
  heading2: "h2",
  heading3: "h3",
  heading4: "h4",
  heading5: "h5",
  heading6: "h6",
  paragraph: "p",
  preformatted: "pre",
  strong: "b",
  em: "em",
  "list-item": "li",
  "o-list-item": "li",
  "group-list-item": "ul",
  "group-o-list-item": "ol",
  image: "img",
  embed: "embed",
  hyperlink: "a",
  label: "label",
  span: "span",
}

const styling = mapValues(types, (v, k) => hoc()(g[v]()))

const Unknown = g.div({ backgroundColor: "red" })
const Wrapper = g.div()

const PrismicRichText = ({ source, forceType, ...props }) => {
  const content = source.map((s, i) => {
    if (!s.type) {
      const w = 1 / s.length
      return (
        <Flex>
          {map(s, (v, k) =>
            <Box w={w} p={2}>
              <PrismicRichText source={v} key={k} />
            </Box>,
          )}
        </Flex>
      )
    } else {
      const Container = styling[forceType || s.type] || Unknown
      return (
        <Container {...props} key={i}>
          {s.text}
        </Container>
      )
    }
  })

  return (
    <Wrapper>
      {content}
    </Wrapper>
  )
}

export default PrismicRichText

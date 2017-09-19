import React from "react"
import { Flex, Box } from "../ui"
import g from "glamorous"
import mapValues from "lodash/mapValues"
import hoc from "../ui/hoc"
import map from "lodash/map"
import Link from "./Link"
import { Heading, Text, Subhead, H3, H4, H5, H6, Li, Ol, Ul } from "../ui"

const ourTypes = {
  heading1: Heading,
  heading2: Subhead,
  heading3: H3,
  heading4: H4,
  heading5: H5,
  heading6: H6,
  paragraph: Text,
  "list-item": Li,
  "o-list-item": Li,
  "group-list-item": Ul,
  "group-o-list-item": Ol,
}

const rawTypes = {
  unformatted: g.span,
  preformatted: g.pre,
  strong: g.b,
  em: g.em,
  image: g.img,
  label: g.label,
  span: g.span,
}

const styling = {
  ...mapValues(rawTypes, (v, k) => hoc()(v({}))),
  ...ourTypes,
}

const Unknown = g.div({ color: "yellow", backgroundColor: "red" })

const handler = {
  hyperlink: Link,
}

const PrismicRichText = ({ source, forceType, ...props }) => {
  if (!Array.isArray(source)) {
    return <Unknown>???</Unknown>
  }
  const content = source.map((s, i) => {
    if (!s.type) {
      const w = 1 / s.length
      return (
        <Flex>
          {map(s, (v, k) => (
            <Box w={w} p={2}>
              <PrismicRichText source={v} key={k} {...props} />
            </Box>
          ))}
        </Flex>
      )
    } else {
      const Container = styling[forceType || s.type] || Unknown
      // split the text into pieces
      let content = s.text

      if (s.spans && s.spans.length) {
        let prevEnd = 0
        content = s.spans.reduce((parts, { start, end, data, type }) => {
          const toAdd = []

          if (prevEnd < start) {
            toAdd.push(
              <span key={`${prevEnd}-${start}`}>
                {s.text.slice(prevEnd, start)}
              </span>,
            )
          }

          const part = s.text.slice(start, end)
          const Component = handler[type]
          prevEnd = end
          toAdd.push(
            <Component key={`${start}-${end}`} {...data}>
              {part}
            </Component>,
          )
          return parts.concat(toAdd)
        }, [])
        content.push(s.text.slice(prevEnd))
      }

      return (
        <Container {...props} key={i} mb={2}>
          {content}
        </Container>
      )
    }
  })

  return <span>{content}</span>
}

export default PrismicRichText

import React from "react"
import { Flex, Box } from "grid-styled"
import g from "glamorous"
import mapValues from "lodash/mapValues"
import hoc from "../ui/hoc"
import map from "lodash/map"
import { Heading, Text, Subhead } from "../ui"

const ourTypes = {
  heading1: g(Heading)({}),
  heading2: g(Subhead)({}),
  heading3: g(Subhead)({}),
  heading4: g(Subhead)({}),
  heading5: g(Subhead)({}),
  heading6: g(Subhead)({}),
  paragraph: g(Text)({}),
}

const rawTypes = {
  preformatted: g.pre,
  strong: g.b,
  em: g.em,
  "list-item": g.li,
  "o-list-item": g.li,
  "group-list-item": g.ul,
  "group-o-list-item": g.ol,
  image: g.img,
  embed: g.embed,
  hyperlink: g.a,
  label: g.label,
  span: g.span,
}

const styling = {
  ...mapValues(rawTypes, (v, k) => hoc()(v({}))),
  ...ourTypes,
}

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

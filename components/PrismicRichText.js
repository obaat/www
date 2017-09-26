import React from "react"
import { Flex, Box } from "../ui"
import g from "glamorous"
import mapValues from "lodash/mapValues"
import hoc from "../ui/hoc"
import map from "lodash/map"
import Link from "./Link"
import {
  Small,
  Heading,
  Text,
  Subhead,
  H3,
  H4,
  H5,
  H6,
  Li,
  Ol,
  Ul,
} from "../ui"

const ourTypes = {
  heading1: Heading,
  heading2: Subhead,
  heading3: H3,
  heading4: H4,
  heading5: H5,
  heading6: H6,
  small: Small,
  paragraph: Text,
  "list-item": Li,
  "o-list-item": Li,
  "group-list-item": Ul,
  "group-o-list-item": Ol,
}

const rawTypes = {
  unformatted: g.span,
  preformatted: g.pre,
  em: g.em,
  strong: g.strong,
  image: g.img,
  label: g.label,
  span: g.span,
}

const styling = {
  ...mapValues(rawTypes, (v, k) => hoc()(v({}))),
  ...ourTypes,
}

const unknown = type => () => <div>??? {type} </div>

const handler = {
  hyperlink: Link,
  strong: g.strong({
    fontWeight: "bold",
  }),
}

const PrismicRichText = ({ source, forceType, mb, mt, xmb, xmt, ...props }) => {
  if (!Array.isArray(source)) {
    return <div>no source</div>
  }
  const flatContent = source.map((s, i) => {
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
      const Container = styling[forceType || s.type] || unknown(type)

      // split the text into pieces
      let content = s.text

      if (s.spans && s.spans.length) {
        let prevEnd = 0
        content = s.spans.reduce((parts, span) => {
          const { start, end, data, type } = span
          const toAdd = []

          if (prevEnd < start) {
            toAdd.push(
              <span key={`${prevEnd}-${start}`}>
                {s.text.slice(prevEnd, start)}
              </span>,
            )
          }

          const part = s.text.slice(start, end)
          const Component = handler[type] || unknown(type)
          prevEnd = end

          toAdd.push(
            <Component
              key={`${start}-${end}`}
              {...data}
              type={type}
              mb={mb}
              mt={mt}
            >
              {part}
            </Component>,
          )

          return parts.concat(toAdd)
        }, [])
        content.push(s.text.slice(prevEnd))
      }

      return (
        <Container {...props} type={s.type} key={i} mt={xmt} mb={xmb}>
          {content}
        </Container>
      )
    }
  })

  const finalContent = []
  let list = []

  flatContent.forEach((item, i) => {
    const { type } = item.props
    if (type === "list-item" || type === "o-list-item") {
      list.push(item)
    }

    if (list.length) {
      if (type !== "list-item" && type !== "o-list-item") {
        finalContent.push(
          <Ul key={`ul-${i}`} ml={1}>
            {[...list]}
          </Ul>,
        )
        list.length = 0
      } else if (item === flatContent[flatContent.length - 1]) {
        finalContent.push(
          <Ul key={`ul-${i}`} ml={1}>
            {[...list]}
          </Ul>,
        )
        list.length = 0
      }
    } else {
      finalContent.push(item)
    }
  })

  return (
    <Box mb={mb} mt={mt}>
      {finalContent}
    </Box>
  )
}

export default PrismicRichText

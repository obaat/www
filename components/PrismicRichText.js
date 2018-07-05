import React from "react"
import { Box } from "../ui"
import styled from "react-emotion"
import Link from "./Link"
import { serialize, Elements } from "prismic-richtext"
import Embed from "./Embed"
import SlideShow from "./SlideShow"
import shortid from "shortid"

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
  Pre,
  Ul,
  HeadingAsDiv,
  Image,
} from "../ui"
import { flattenProp } from "recompose"

const ourTypes = {
  [Elements.heading1]: Heading,
  [Elements.heading2]: Subhead,
  [Elements.heading3]: H3,
  [Elements.heading4]: H4,
  [Elements.heading5]: H5,
  [Elements.heading6]: H6,
  [Elements.paragraph]: Text,
  [Elements.preformatted]: Pre,
  [Elements.listItem]: Li,
  [Elements.oListItem]: Li,
  [Elements.list]: Ul,
  [Elements.oList]: Ol,
  [Elements.image]: Image,
  //[Elements.embed]:  ,
  //[Elements.label]:  ,
  //[Elements.hyperlink]:  ,
  // headingasdiv: HeadingAsDiv,
  small: Small,
  [Elements.strong]: styled.strong({ fontWeight: 700 }),
  [Elements.em]: styled.em({ fontStyle: "italic" }),
  [Elements.hyperlink]: Link,
}

const unknown = type => () => <div>RichText? {type} </div>

const linkResolver = link => {
  if (link.link_type === "Document") {
    return "???"
  } else {
    return link.url
  }
}

const span = styled.span({})

const renderBuffer = items => (
  <Box mb={2} key={shortid.generate()}>
    <SlideShow controlSize={24}>{items.splice(0, items.length)}</SlideShow>
  </Box>
)

const doSerialize = buffer => ({
  forceType,
  Component,
  xmb,
  xmt,
  ...passProps
}) => (prismicType, element, content, children) => {
  let flushedBuffer = null
  let final = null
  if (buffer.length && prismicType !== Elements.image) {
    //flush
    flushedBuffer = renderBuffer(buffer) // careful, mutates buffer
  }

  if (prismicType === Elements.span) {
    final = <span key={shortid.generate()}>{content}</span>
  } else if (prismicType === Elements.hyperlink) {
    final = (
      <Link {...element.data} key={shortid.generate()}>
        {children}
      </Link>
    )
  } else if (prismicType === Elements.image) {
    buffer.push(<Image key={shortid.generate()} src={element.url} />)
  } else if (prismicType === Elements.embed) {
    final = (
      <Embed
        containerWidth={600}
        containerHeight={338}
        key={shortid.generate()}
        {...element.oembed}
      />
    )
  } else {
    const type = forceType ? Elements[forceType] || prismicType : prismicType
    const RenderComponent =
      forceType === "unformatted"
        ? span
        : Component || ourTypes[type] || unknown(type)

    final = (
      <RenderComponent
        mb={xmb}
        mt={xmt}
        key={shortid.generate()}
        {...passProps}
      >
        {children}
      </RenderComponent>
    )
  }
  if (!flushedBuffer) {
    return final
  }

  return (
    <React.Fragment key={shortid.generate()}>
      {flushedBuffer}
      {final}
    </React.Fragment>
  )
}

const PrismicRichText = ({ source, mb, mt, ...props }) => {
  if (!Array.isArray(source)) {
    return <div>no source</div>
  }
  const buffer = []
  const serializedChildren = serialize(source, doSerialize(buffer)(props))
  // if the buffer still has contents render them out here.
  return (
    <Box mb={mb} mt={mt}>
      {serializedChildren}
      {buffer.length > 0 && renderBuffer(buffer)}
    </Box>
  )
}

export default PrismicRichText

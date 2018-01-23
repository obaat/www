import React from "react"
import { Flex, Box } from "../ui"
import g from "glamorous"
import mapValues from "lodash/mapValues"
import hoc from "../ui/hoc"
import map from "lodash/map"
import Link from "./Link"
import { serialize, Elements } from "prismic-richtext"
import { Link as LinkHelper } from "prismic-helpers"
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
  [Elements.olist]: Ol,
  [Elements.image]: Image,
  //[Elements.embed]:  ,
  //[Elements.label]:  ,
  //[Elements.hyperlink]:  ,
  // headingasdiv: HeadingAsDiv,
  // small: Small,
  [Elements.strong]: g.strong({ fontWeight: 700 }),
  [Elements.em]: g.em({ fontStyle: "italic" }),
  [Elements.hyperlink]: Link,
}

const unknown = type => () => <div>??? {type} </div>

const linkResolver = link => {
  if (link.link_type === "Document") {
    return "???"
  } else {
    return link.url
  }
}

const span = g.span({})

const doSerialize = ({ forceType, Component, xmb, xmt, ...passProps }) => (
  prismicType,
  element,
  content,
  children,
) => {
  if (prismicType === Elements.span) {
    return <span key={shortid.generate()}>{content}</span>
  } else if (prismicType === Elements.hyperlink) {
    return (
      <Link {...element.data} key={shortid.generate()}>
        {children}
      </Link>
    )
  } else if (prismicType === Elements.image) {
    return (
      <Image
        src={element.url}
        key={shortid.generate()}
        w={200}
        p={1}
        style={{ display: "inline-block" }}
      />
    )
  }
  const type = forceType ? Elements[forceType] || prismicType : prismicType
  const RenderComponent =
    forceType === "unformatted"
      ? span
      : Component || ourTypes[type] || unknown(type)
  return (
    <RenderComponent mb={xmb} mt={xmt} key={shortid.generate()} {...passProps}>
      {children}
    </RenderComponent>
  )
}

const PrismicRichText = ({
  source,
  mb,
  mt,
  // forceType,
  // Component,
  // xmb,
  // xmt,
  ...props
}) => {
  if (!Array.isArray(source)) {
    return <div>no source</div>
  }
  const serializedChildren = serialize(
    source,
    doSerialize(props),
    // htmlSerializer,
  )
  return (
    <Box mb={mb} mt={mt}>
      {serializedChildren}
    </Box>
  )
}

export default PrismicRichText

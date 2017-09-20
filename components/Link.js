import React from "react"
import NxLink from "next/link"
import { Link as UILink } from "../ui"

const mapping = {
  "get-in-touch": "contact",
}

const Link = ({ url, slug, href, target, ...props }) => {
  const _href = slug ? `/${mapping[slug] || slug}` : href
  return (
    <NxLink href={_href}>
      <UILink {...props} target={target} rel="noopener" />
    </NxLink>
  )
}

export default Link

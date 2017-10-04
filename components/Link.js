import React from "react"
import NxLink from "next/link"
import { Link as UILink } from "../ui"

const mapping = {
  "get-in-touch": "contact",
}

const Link = ({ url, slug, href, target, ...props }) => {
  const _href = slug ? `/${mapping[slug] || slug}` : href
  if (_href) {
    return (
      <NxLink href={_href}>
        <UILink {...props} href={_href} target={target} rel="noopener" />
      </NxLink>
    )
  } else {
    return <UILink {...props} href={url} target="_blank" rel="noopener" />
  }
}

export default Link

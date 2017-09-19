import React from "react"
import NxLink from "next/link"
import { Link as UILink } from "../ui"

const Link = ({ url, slug, href, target, ...props }) => {
  const _href = slug ? `/${slug}` : href
  return (
    <NxLink href={_href}>
      <UILink {...props} target={target} />
    </NxLink>
  )
}

export default Link

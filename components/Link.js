import React from "react"
import { Link as UILink } from "../ui"

const mapping = {
  "get-in-touch": "contact",
}

const Link = ({ url, to, slug, href, target, className, children }) => {
  const _href = slug ? `/${mapping[slug] || slug}` : href
  return (
    <UILink
      className={className}
      to={_href || url || to}
      target={_href || to ? target : "_blank"}
      rel="noopener"
    >
      {children}
    </UILink>
  )
}

export default Link

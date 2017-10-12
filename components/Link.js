import React from "react"
import { Link as UILink, ExtLink } from "../ui"

const mapType = {
  project: "projects",
  team_page: "team",
  gallery_page: "gallery",
}

const pageToLink = (type, uid) => {
  const mappedType = mapType[type] || type
  return `/${mappedType}/${uid}`
}

const mapping = {
  "get-in-touch": "contact",
}

const Link = ({
  url,
  type,
  to: _to,
  slug,
  href,
  uid,
  target,
  className,
  children,
}) => {
  const _href = slug ? `/${mapping[slug] || slug}` : href
  if (url || href) {
    return (
      <ExtLink
        className={className}
        href={url || href}
        target={target || "_blank"}
        rel="noopener"
      >
        {children}
      </ExtLink>
    )
  }

  const to = _to ? _to : pageToLink(type, uid)
  if (to) {
    return (
      <UILink className={className} to={to} target={target} rel="noopener">
        {children}
      </UILink>
    )
  } else {
    return <span>?{children}</span>
  }
}

export default Link

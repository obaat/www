import React from "react"
import { Link as UILink, ExtLink } from "../ui"
import { HashLink } from "react-router-hash-link"

const mapType = {
  project: "projects",
  projects_page: "projects",
  volunteer_opportunity: "volunteering",
  volunteering_page: "volunteering",
  trustees_page: "trustees",
  team_page: "team",
  gallery_page: "gallery",
}

const pageToLink = (type, uid) => {
  const mappedType = mapType[type] || type
  return `/${mappedType}${uid ? `/${uid}` : ""}`
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
    const _href = url || href
    if (_href.charAt(0) === "#") {
      return (
        <HashLink className={className} to={_href}>
          {children}
        </HashLink>
      )
    } else {
      return (
        <ExtLink
          className={className}
          href={_href}
          target={target || "_blank"}
          rel="noopener"
        >
          {children}
        </ExtLink>
      )
    }
  }

  const to = _to ? _to : pageToLink(type, uid)
  if (to) {
    if (to.charAt(0) === "#") {
      return (
        <HashLink className={className} to={to}>
          {children}
        </HashLink>
      )
    } else {
      return (
        <UILink className={className} to={to} target={target} rel="noopener">
          {children}
        </UILink>
      )
    }
  } else {
    return <span>?{children}</span>
  }
}

export default Link

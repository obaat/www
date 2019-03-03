import React from "react"
import { SocialIcon } from "../ui"
import theme from "../theme"

const social = [
  { url: "https://facebook.com/onebrickngo/", network: "facebook" },
  { url: "https://instagram.com/onebrickngo/", network: "instagram" },
  { url: "https://twitter.com/onebrickngo/", network: "twitter" },
]

export default () => (
  <div>
    {social.map((props, i) => (
      <SocialIcon key={props.network} mr={1} {...props} />
    ))}
  </div>
)

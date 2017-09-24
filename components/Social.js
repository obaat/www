import React from "react"
import { SocialIcon } from "../ui"

const social = [
  { url: "https://facebook.com/onebrickngo/", network: "facebook" },
  { url: "https://instagram.com/onebrickngo/", network: "instagram" },
  { url: "https://twitter.com/onebrickngo/", network: "twitter" },
  { url: "mailto:enquirires@onebrick.org.uk", network: "email" },
]

export default () => (
  <div>{social.map(props => <SocialIcon mr={1} {...props} />)}</div>
)

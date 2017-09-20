import React from "react"

const Embed = ({ type, provider_name, width, html, height, ...props }) => {
  console.log({ provider_name })
  switch (provider_name) {
    case "YouTube": {
      const src = { __html: html }
      return <div style={{ width, height }} dangerouslySetInnerHTML={src} />
    }
    case "Vimeo": {
      const src = { __html: html }
      return <div style={{ width, height }} dangerouslySetInnerHTML={src} />
    }
    default:
      return <div>Unrecognised Provider</div>
  }
}

export default Embed

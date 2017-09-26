import React from "react"
import g from "glamorous"

const Container = g.iframe(({ width = "100%", height = "100%" }) => ({
  position: width === "100%" ? "absolute" : "relative",
  width,
  height,
  top: 0,
  bottom: 0,
  left: 0,
  border: 0,
  backgroundColor: "#000",
}))

const Embed = ({
  type,
  provider_name,
  uri,
  embed_url,
  width,
  html,
  height,
  ...props
}) => {
  switch (provider_name) {
    case "YouTube": {
      const id = embed_url.split("/")[3]
      return (
        <Container
          src={`https://www.youtube.com/embed/${id}`}
          width={width}
          height={height}
        />
      )
    }
    case "Vimeo": {
      const id = uri.split("/")[2]
      return (
        <Container
          src={`https://player.vimeo.com/video/${id}`}
          width={width}
          height={height}
        />
      )
    }
    default:
      return <div>Unrecognised Provider {provider_name}</div>
  }
}

export default Embed

import { compose, withProps } from "recompose"
import React from "react"
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import theme from "./mapLight.json"

export default compose(
  withProps(parentProps => ({
    containerElement: <div style={{ height: parentProps.height || `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    // center: { lat: 25.03, lng: 121.6 },
  })),
  withGoogleMap,
)(props => {
  const center = {
    lat: props.center.latitude || props.center.lat,
    lng: props.center.longitude || props.center.lng,
  }
  return (
    <GoogleMap
      defaultZoom={props.zoom || 5}
      defaultCenter={center}
      defaultOptions={{ styles: props.theme || theme }}
    >
      <Marker position={center} />
    </GoogleMap>
  )
})

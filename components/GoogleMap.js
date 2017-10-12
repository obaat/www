import { compose, withProps } from "recompose"
import React from "react"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps"
import theme from "./mapLight.json"

export default compose(
  withProps(parentProps => ({
    containerElement: <div style={{ height: parentProps.height || `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyD9RbFyhZ3NtxgeYsCIs95rN4FXPg45VfQ",
  })),
  withScriptjs,
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

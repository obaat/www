import { compose, withProps } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps"
import theme from "./mapLight.json"

export default compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD9RbFyhZ3NtxgeYsCIs95rN4FXPg45VfQ",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    // center: { lat: 25.03, lng: 121.6 },
  }),
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

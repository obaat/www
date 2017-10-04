import g from "glamorous"
import { Box } from "../ui"

const Container = g(Box)(props => ({
  maxWidth: props.maxWidth || "1024px",
  marginLeft: "auto",
  marginRight: "auto",
  // textAlign: "justify",
})).withProps({
  px: 2,
  py: 3,
})

export default Container

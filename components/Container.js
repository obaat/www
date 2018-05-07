import g from "glamorous"
import { Box } from "../ui"

const Container = g(Box)(({ maxWidth = "1024px" }) => ({
  maxWidth,
  marginLeft: "auto",
  marginRight: "auto",
  // textAlign: "justify",
})).withProps({
  px: 2,
  py: 3,
})

export default Container

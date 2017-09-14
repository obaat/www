import g from "glamorous"
import { Box } from "../ui"

const Container = g(Box)({
  maxWidth: "1024px",
  marginLeft: "auto",
  marginRight: "auto",
  // textAlign: "justify",
}).withProps({
  px: [3, 2, 0],
  py: 3,
})

export default Container

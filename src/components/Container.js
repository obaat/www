import styled from "@emotion/styled"
import withProps from "recompose/withProps"
import { Box } from "../ui"

const Container = withProps({
  px: 2,
  py: 3,
})(
  styled(Box)(({ maxWidth = "1024px" }) => ({
    maxWidth,
    marginLeft: "auto",
    marginRight: "auto",
    // textAlign: "justify",
  })),
)

export default Container

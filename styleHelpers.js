import { space, color, width, fontSize } from "styled-system"
import g from "glamorous"
import get from "lodash/get"

export { space, color, width, fontSize }

export const clickable = ({ onClick }) => onClick && { cursor: "pointer" }
export const show = ({ show }) => show || { display: "none" }
export const visible = ({ visible }) =>
  visible ? { opacity: 1 } : { opacity: 0 }
export const overlay = (offset = 0) => props => ({
  bottom: offset,
  left: offset,
  position: "absolute",
  right: offset,
  top: offset,
})

export const backgroundImageCover = ({ image }) =>
  image && {
    backgroundColor: "#000",
    backgroundImage: `url(${JSON.stringify(image)})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }

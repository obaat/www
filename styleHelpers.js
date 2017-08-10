import { space, color, width, fontSize } from 'styled-system'
import g from 'glamorous'

export {space, color, width, fontSize}

export const clickable = ({onClick}) => onClick && ({ cursor: "pointer" });
export const show = ({show}) => show || ({ display: "none" });
export const hoc = Component => g(Component)(space, color, width, fontSize, clickable);
export const overlay = (offset = 0) => props => ({
  bottom: offset,
  left: offset,
  position: "absolute",
  right: offset,
  top: offset,
});


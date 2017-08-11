import { space, color, width, fontSize } from 'styled-system'
import g from 'glamorous'
import get from 'lodash/get'

export {space, color, width, fontSize}

const def = ['red','yellow']

const palette = ({palette, theme, invert}) => {
  if (!palette) return
  const src = get(theme, [invert ? 'inverseColors' : 'colors', palette], def)

  return color({
    color: src[0],
    bg: src[1],
  })
}

export const clickable = ({onClick}) => onClick && ({ cursor: "pointer" });
export const show = ({show}) => show || ({ display: "none" });
export const hoc = Component => g(Component)(space, palette, color, width, fontSize, clickable);
export const overlay = (offset = 0) => props => ({
  bottom: offset,
  left: offset,
  position: "absolute",
  right: offset,
  top: offset,
});

export const backgroundImageCover = ({image}) => image && ({
  backgroundColor: '#000',
  backgroundImage: `url(${JSON.stringify(image)})`,
  backgroundSize: 'cover',
});


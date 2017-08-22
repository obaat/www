import { space, width, removeProps, responsiveStyle} from 'styled-system'
import g from 'glamorous'

export const flex = responsiveStyle('flex')
export const order = responsiveStyle('order')

export default g.div(
  { boxSizing: 'border-box' },
  width,
  space,
  flex,
  order
);
import { space, width, removeProps, responsiveStyle} from 'styled-system'
import Box from './Box'
import g from 'glamorous'

const wrap = responsiveStyle('flex-wrap', 'wrap', 'wrap')
const direction = responsiveStyle('flex-direction', 'direction')
const align = props => responsiveStyle('align-items', 'align')
const justify = props => responsiveStyle('justify-content', 'justify')
const column = props => props.column ? `flex-direction:column;` : null

export default g(Box, {displayName: 'Flex'})(
  { display: 'flex' },
  wrap,
  column,
  direction,
  align,
  justify,
)
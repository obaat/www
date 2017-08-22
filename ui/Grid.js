import g from 'glamorous'
import {
  Flex as _Flex,
  Box as _Box
} from 'grid-styled'
import {
  fontSize,
  color
} from 'styled-system'

export const Flex = g(_Flex)(fontSize, color)
export const Box = g(_Box)(fontSize, color)

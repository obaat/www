import React from 'react'
import g from 'glamorous'
import cx from 'classnames'
import { space, width, fontSize, color } from 'styled-system'

const Icon = g.i({
  paddingRight: '9px',
})

const Button = g.button(
  {
    textAlign: 'center',
    textDecoration: 'none',
    border: 'none',
    lineHeight: 1,
    userSelect: 'none',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    display: 'inline-block',
    borderRadius: '.25rem',
    transition: '.1s box-shadow, .1s background-color, .1s color',
    boxShadow:
      'inset 0 2px 0 rgba(255, 255, 255, .1), inset 0 -2px 0 rgba(0, 0, 0, .1)',
    ':hover': {
      boxShadow:
        'inset 0 2px 5rem rgba(0, 0, 0, .1), inset 0 -2px 0 rgba(0, 0, 0, .1)',
    },
  },
  color,
  space
)

export default ({ children, type = 'normal', icon }) =>
  <Button px={2} py={1} color={`${type}.1`} bg={`${type}.0`}>
    {icon && <Icon className={`fa fa-${icon}`} aria-hidden="true" />}
    {children}
  </Button>

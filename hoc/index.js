import {compose, withState, withHandlers} from 'recompose'
import {debounce} from 'lodash'

let count = 0
const inProgress = {}

export const withShowHideOnHover = compose(
  withState('show', 'setShow', false),
  withHandlers(() => {
    const id = count++
    return {
      onMouseOver: ({show, setShow}) => e => {
        inProgress[count] && window.clearTimeout(inProgress[count])
        setShow(true)
      },
      onMouseOut: ({show, setShow}) => e => {
        inProgress[count] = window.setTimeout(
          () => setShow(false)
          ,100
        )
      }
    }
  }),
  ComposedComponent => (props) =>
    <span onMouseOver={ props.onMouseOver } onMouseOut={ props.onMouseOut }><ComposedComponent { ...props } /></span>
)


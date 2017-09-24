import React, { Component } from "react"
import PropTypes from "prop-types"
import { Motion, Spring } from "react-motion"

class Flipper extends Component {
  propTypes = {
    index: PropTypes.number,
  }

  render() {
    const {index, children} = this.props
    const [front, back] = 
    const rotated = index % 2

    return (

     <Motion style={{y: spring(rotated)}}>
        {({ y }) =>
          <div
            style={{transform: `rotateY(${y}deg)`}}
          >
            <div className="dashboard-card-front">
              Front
            </div>
            <div className="dashboard-card-back">
              Back
            </div>
          </div>
        }
      </Motion>
    )
  }
}

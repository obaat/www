import React, { Component } from "react"
import g from "glamorous"
import { overlay } from "../styleHelpers"
import range from "lodash/range"
import { Chevron } from "reline"
import { withProps } from "recompose"
import {
  Flex,
  Box,
  Absolute,
  Relative,
  DotButton,
  Carousel,
  CarouselSlide,
} from "../ui"

const AbsMiddle = g(Flex)(({ direction }) => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: direction === "left" ? 0 : "auto",
  right: direction === "right" ? 0 : "auto",
}))

const Arrow = ({ controlSize = 48, page, onPageClick, direction }) => (
  <AbsMiddle
    direction={direction}
    controlSize={controlSize}
    align="center"
    justify="center"
    onClick={() => onPageClick(page + (direction === "left" ? -1 : 1))}
    px={2}
  >
    <Chevron
      size={controlSize}
      color="#fff"
      left={direction === "left"}
      right={direction === "right"}
    />
  </AbsMiddle>
)

const Paging = ({ total, page, onPageClick }) => (
  <Absolute left right bottom style={{ margin: "0 auto" }} pb={2}>
    <Flex
      style={{
        height: "20px",
        width: `${20 * total}px`,
        margin: "0 auto",
      }}
    >
      {range(total).map(i => (
        <DotButton
          color="rgba(255,255,255,0.8)"
          w={1}
          key={i}
          active={i === page}
          onClick={() => onPageClick(i)}
        />
      ))}
    </Flex>
  </Absolute>
)

const OurCarousel = g(Carousel)(props => ({
  "& > div:first-child": {
    marginLeft: props.index * -100 + "%",
    transitionProperty: "margin",
    transitionDuration: "0.6s",
    transitionTimingFunction: "cubic-bezier(0.860, 0.000, 0.070, 1.000)",
  },
}))

export default class SlideShow extends Component {
  static defaultProps = {
    autoplaySpeed: 3000,
    children: [],
  }

  constructor(props) {
    super(props)
    this.state = {
      autoPlayTimer: null,
      selectedIndex: 0,
    }
  }

  componentDidMount() {
    window.addEventListener("blur", this.pause)
    if (this.props.autoplay) {
      window.addEventListener("focus", this.play)
      this.play()
    }
  }

  componentWillUnmount() {
    window.removeEventListener("focus", this.play)
    window.removeEventListener("blur", this.pause)
    this.pause()
  }

  totalSlides = () => React.Children.toArray(this.props.children).length

  setSlide = index => {
    if (index >= 0 && index < this.totalSlides()) {
      this.props.onChange && this.props.onChange(index)
      this.setState({ selectedIndex: index })
    }
  }

  nextSlide = () => {
    this.setSlide(
      this.state.selectedIndex + 1 === this.totalSlides()
        ? 0
        : this.state.selectedIndex + 1,
    )
  }

  prevSlide = () => {
    this.setSlide(
      this.state.selectedIndex === 0
        ? this.totalSlides()
        : this.state.selectedIndex - 1,
    )
  }

  play = () => {
    if (!this.state.autoPlayTimer) {
      this.setState({
        autoPlayTimer: setInterval(this.nextSlide, this.props.autoplaySpeed),
      })
    }
  }

  pause = () => {
    if (this.state.autoPlayTimer) {
      clearInterval(this.state.autoPlayTimer)
      this.setState({
        autoPlayTimer: null,
      })
    }
  }

  onPageClick = index => {
    this.pause()
    this.setSlide(index)
  }

  render() {
    const { selectedIndex } = this.state
    const { controlSize, hidePaging } = this.props
    const children = React.Children.toArray(this.props.children)

    return (
      <Relative style={{ width: "100%" }}>
        <OurCarousel index={selectedIndex} p={0}>
          {children.map((slide, i) => (
            <CarouselSlide p={0} key={i}>
              {slide}
            </CarouselSlide>
          ))}
        </OurCarousel>
        {selectedIndex > 0 && (
          <Arrow
            direction="left"
            controlSize={controlSize}
            page={selectedIndex}
            onPageClick={this.onPageClick}
          />
        )}
        {selectedIndex < this.totalSlides() - 1 && (
          <Arrow
            direction="right"
            controlSize={controlSize}
            page={selectedIndex}
            onPageClick={this.onPageClick}
          />
        )}
        {!hidePaging && (
          <Paging
            total={this.totalSlides()}
            page={selectedIndex}
            onPageClick={this.onPageClick}
          />
        )}
      </Relative>
    )
  }
}

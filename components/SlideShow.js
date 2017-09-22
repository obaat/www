import React, { Component } from "react"
import g from "glamorous"
import { css } from "glamor"
import Icon from "./Icon"
import { overlay } from "../styleHelpers"
import range from "lodash/range"
import { Chevron } from "reline"
import isNil from "lodash/isNil"
import { withProps } from "recompose"
import { Flex, Fixed, Box, Absolute, Relative, DotButton, Close } from "../ui"
import { Motion, spring } from "react-motion"
// import Transition from "react-transition-group/Transition"
// import TransitionGroup from "react-transition-group/TransitionGroup"

const PRELOAD_MAX = 3

const Fullscreen = g(Fixed)({
  backgroundColor: "rgba(255,255,255, 0.8)",
  height: "100VH",
  overflow: "hidden",
  zIndex: 999999,
}).withProps({
  top: true,
  bottom: true,
  left: true,
  right: true,
})

const AbsMiddle = g(Flex)(({ direction }) => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: direction === "left" ? 0 : "auto",
  right: direction === "right" ? 0 : "auto",
}))

const Arrow = ({
  controlSize = 48,
  color = "#fff",
  page,
  onPageClick,
  direction,
  px = 2,
}) => (
  <AbsMiddle
    direction={direction}
    controlSize={controlSize}
    align="center"
    justify="center"
    onClick={() => onPageClick(page + (direction === "left" ? -1 : 1))}
    px={px}
  >
    <Chevron
      size={controlSize}
      color={color}
      left={direction === "left"}
      right={direction === "right"}
    />
  </AbsMiddle>
)

const Zoom = ({ isZoomed, controlSize, controlColor, onClick }) => (
  <Absolute left bottom pb={2} pl={2} onClick={onClick}>
    <Icon
      f={controlSize}
      color={controlColor}
      name={isZoomed ? "close" : "arrows-alt"}
      onClick={onClick}
    />
  </Absolute>
)

const Paging = ({ total, page, onPageClick }) => {
  const showPages = Math.min(total, 10)
  return (
    <Absolute left right bottom style={{ margin: "0 auto" }} pb={2}>
      <Flex
        style={{
          height: "20px",
          width: `${20 * showPages}px`,
          margin: "0 auto",
        }}
      >
        {range(showPages).map(i => (
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
}

const CarouselContainer = g.div({
  overflow: "hidden",
  position: "relative",
  width: "100%",
  height: "100%",
})

const Carousel = g(Flex)({
  width: "100%",
  height: "100%",
  margin: "0",
  padding: "0",
  transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
})

const CarouselSeat = g.section({
  background: "#ddd",
  position: "relative",
  flex: "1 0 100%",
})

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
      zoom: false,
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

  toggleZoom = () => {
    this.pause()
    this.setState({ zoom: !this.state.zoom })
  }

  render() {
    const { selectedIndex, zoom } = this.state
    const {
      controlSize = 48,
      index,
      hidePaging,
      hideZoom,
      hideArrows,
      controlColor = "#fff",
      vertical,
      px = 2,
    } = this.props
    const children = React.Children
      .toArray(this.props.children)
      .slice(0, Math.max(PRELOAD_MAX, selectedIndex + PRELOAD_MAX))
    const visibleIndex = isNil(index) ? selectedIndex : index

    const container = (
      <CarouselContainer>
        <Motion style={{ x: visibleIndex * 100 }}>
          {({ x }) => (
            <Carousel
              direction={vertical ? "column" : "row"}
              style={{
                transform: `translate${vertical ? "Y" : "X"}(-${x}%)`,
              }}
            >
              {children.map((slide, i) => (
                <CarouselSeat key={i}>{slide}</CarouselSeat>
              ))}
            </Carousel>
          )}
        </Motion>
        {!hideArrows &&
          selectedIndex > 0 && (
            <Arrow
              direction="left"
              controlSize={controlSize}
              color={controlColor}
              page={selectedIndex}
              onPageClick={this.onPageClick}
              px={px}
            />
          )}
        {!hideArrows &&
          selectedIndex < this.totalSlides() - 1 && (
            <Arrow
              direction="right"
              controlSize={controlSize}
              color={controlColor}
              page={selectedIndex}
              onPageClick={this.onPageClick}
              px={px}
            />
          )}
        {!hidePaging && (
          <Paging
            total={this.totalSlides()}
            page={selectedIndex}
            onPageClick={this.onPageClick}
          />
        )}
        {!hideZoom && (
          <Zoom
            onClick={this.toggleZoom}
            controlSize={controlSize}
            controlColor={controlColor}
          />
        )}
      </CarouselContainer>
    )

    return zoom ? (
      <Fullscreen>
        <Absolute top bottom left right m={2} style={{ overflow: "hidden" }}>
          {selectedIndex > 0 && (
            <Arrow
              direction="left"
              controlSize={48}
              color={controlColor}
              page={selectedIndex}
              onPageClick={this.onPageClick}
            />
          )}
          {selectedIndex < this.totalSlides() - 1 && (
            <Arrow
              direction="right"
              controlSize={48}
              color={controlColor}
              page={selectedIndex}
              onPageClick={this.onPageClick}
            />
          )}
          <Zoom
            onClick={this.toggleZoom}
            controlSize={48}
            controlColor={controlColor}
            isZoomed
          />
          {children[selectedIndex]}
        </Absolute>
      </Fullscreen>
    ) : (
      container
    )
  }
}

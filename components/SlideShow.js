import React, { Component } from "react"
import g from "glamorous"
import Icon from "./Icon"
import { overlay } from "../styleHelpers"
import range from "lodash/range"
import { Chevron } from "reline"
import isNil from "lodash/isNil"
import { withProps } from "recompose"
import {
  Flex,
  Fixed,
  Box,
  Absolute,
  Relative,
  DotButton,
  Carousel,
  CarouselVertical,
  CarouselSlide,
  Close,
} from "../ui"

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
}) => (
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

const Fill = g(Relative)({})

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
    } = this.props
    const children = React.Children
      .toArray(this.props.children)
      .slice(0, Math.max(PRELOAD_MAX, selectedIndex + PRELOAD_MAX))
    const Component = vertical ? CarouselVertical : Carousel
    const visibleIndex = isNil(index) ? selectedIndex : index

    const container = (
      <Fill>
        <Component index={visibleIndex} p={0}>
          {children.map((slide, i) => (
            <CarouselSlide p={0} key={i}>
              {slide}
            </CarouselSlide>
          ))}
        </Component>
        {!hideArrows &&
          selectedIndex > 0 && (
            <Arrow
              direction="left"
              controlSize={controlSize}
              color={controlColor}
              page={selectedIndex}
              onPageClick={this.onPageClick}
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
      </Fill>
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

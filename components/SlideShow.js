import React, { Component } from "react"
import g from "glamorous"
import { css } from "glamor"
import { overlay } from "../styleHelpers"
import range from "lodash/range"
import isNil from "lodash/isNil"
import { withProps } from "recompose"
import { Flex, Fixed, Box, Absolute, Relative, DotButton } from "../ui"
import {
  ArrowLeft,
  ArrowRight,
  X,
  Magnifier,
  Undo1 as Undo,
} from "../components/SvgIcons"
import { Motion, spring } from "react-motion"
import keycode from "keycode"

const PRELOAD_MAX = 3

const Fullscreen = g(Fixed)({
  backgroundColor: "rgba(0,0,0, 0.9)",
  height: "100VH",
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

const Restart = ({ px, size, color, onPageClick }) => (
  <AbsMiddle
    direction="right"
    controlSize={size}
    align="center"
    justify="center"
    onClick={() => onPageClick(0)}
    px={px}
  >
    <Undo size={size} color={color} />
  </AbsMiddle>
)

const Arrow = ({
  controlSize = 48,
  color = "#fff",
  page,
  onPageClick,
  direction,
  px = 2,
}) => {
  const Chevron = direction === "left" ? ArrowLeft : ArrowRight
  return (
    <AbsMiddle
      direction={direction}
      controlSize={controlSize}
      align="center"
      justify="center"
      onClick={() => onPageClick(page + (direction === "left" ? -1 : 1))}
      px={px}
    >
      <Chevron size={controlSize} color={color} />
    </AbsMiddle>
  )
}

const Zoom = ({
  isZoomed,
  controlSize,
  controlColor,
  onClick,
  pb = 1,
  pl = 2,
}) => {
  const Component = isZoomed ? X : Magnifier
  return (
    <Absolute left bottom pb={pb} pl={pl} onClick={onClick}>
      <Component size={controlSize} color={controlColor} onClick={onClick} />
    </Absolute>
  )
}

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
})

const Carousel = g(Flex)({
  width: "100%",
  margin: "0",
  padding: "0",
  transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
})

const CarouselSeat = g.section({
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

  _handleKeyDown = ev => {
    const key = keycode(ev.keyCode)
    switch (key) {
      case "esc":
        this.setState({ zoom: false })
        break
      case "left":
        this.pause()
        this.prevSlide()
        break
      case "right":
        this.pause()
        this.nextSlide()
        break
      default:
        break
    }
  }

  componentDidMount() {
    window.addEventListener("blur", this.pause)
    window.addEventListener("keydown", this._handleKeyDown)
    if (this.props.autoplay) {
      window.addEventListener("focus", this.play)
      this.play()
    }
  }

  componentWillUnmount() {
    window.removeEventListener("focus", this.play)
    window.removeEventListener("blur", this.pause)
    window.removeEventListener("keydown", this._handleKeyDown)
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

  toggleZoom = index => e => {
    this.pause()
    this.setState({
      selectedIndex: isNil(index) ? this.state.selectedIndex : index,
      zoom: !this.state.zoom,
    })
  }

  renderZoomed = children => {
    const { selectedIndex } = this.state
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
    return (
      <Fullscreen onClick={this.toggleZoom()} p={2}>
        <Relative
          w={[1, 1, 1, "70%"]}
          style={{ margin: "0 auto", overflow: "hidden" }}
          onClick={e => e.stopPropagation()}
          bg="#fff"
        >
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
          {selectedIndex === this.totalSlides() - 1 && (
            <Restart
              size={controlSize}
              color={controlColor}
              size={48}
              onPageClick={this.onPageClick}
              px={px}
            />
          )}
          <Zoom
            onClick={this.toggleZoom()}
            controlSize={36}
            controlColor={controlColor}
            isZoomed
          />
          {children[selectedIndex]}
        </Relative>
      </Fullscreen>
    )
  }

  renderSlideShow = children => {
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
    const visibleIndex = isNil(index) ? selectedIndex : index

    return (
      <CarouselContainer>
        <Motion style={{ x: visibleIndex * 100 }}>
          {({ x }) => (
            <Carousel
              direction={vertical ? "column" : "row"}
              onClick={!hideZoom && this.toggleZoom()}
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
        {!hideArrows &&
          selectedIndex === this.totalSlides() - 1 && (
            <Restart
              size={controlSize}
              color={controlColor}
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
            onClick={this.toggleZoom()}
            controlSize={controlSize}
            controlColor={controlColor}
          />
        )}
      </CarouselContainer>
    )
  }

  renderInline = () => {
    const { hideZoom, controlSize, controlColor } = this.props
    return (
      <Flex wrap="wrap">
        {this.props.children.map((c, i) => (
          <Box
            key={i}
            style={{ position: "relative" }}
            p={1}
            w={[1, 1, 1, 1 / 3]}
          >
            {c}
            {!hideZoom && (
              <Zoom
                pb={2}
                pl={3}
                onClick={this.toggleZoom(i)}
                controlSize={controlSize}
                controlColor={controlColor}
              />
            )}
          </Box>
        ))}
      </Flex>
    )
  }

  render() {
    const { selectedIndex, zoom } = this.state
    const { inline } = this.props
    const children = React.Children
      .toArray(this.props.children)
      .slice(0, Math.max(PRELOAD_MAX, selectedIndex + PRELOAD_MAX))

    return zoom
      ? this.renderZoomed(children)
      : inline ? this.renderInline(children) : this.renderSlideShow(children)
  }
}

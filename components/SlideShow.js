import React, { Component } from "react"
import g from "glamorous"
import { overlay } from "../styleHelpers"
import range from "lodash/range"
import toArray from "lodash/toArray"
import { Chevron } from "reline"
import { Flex, Box, Absolute, DotButton, Carousel, CarouselSlide } from "../ui"

const FullFlex = g(Flex)(overlay("0px"))

const CarouselControls = ({ page, total, onPageClick }) =>
  <FullFlex key={page} justify="center" column p={3}>
    <Flex justify="center">
      <Box width={1 / 2}>
        {page > 0 &&
          <Chevron
            size={48}
            color="#fff"
            left
            onClick={() => onPageClick(page - 1)}
          />}
      </Box>
      <Box width={1 / 2} style={{ textAlign: "right" }}>
        {page + 1 < total &&
          <Chevron
            size={48}
            color="#fff"
            right
            onClick={() => onPageClick(page + 1)}
          />}
      </Box>
    </Flex>
    <Absolute bottom left right m={1}>
      <Flex
        style={{
          height: "20px",
          width: "80px",
          margin: "0 auto",
        }}
      >
        {range(total).map(i =>
          <DotButton
            color="rgba(255,255,255,0.8)"
            w={1}
            key={i}
            active={i === page}
            onClick={() => onPageClick(i)}
          />,
        )}
      </Flex>
    </Absolute>
  </FullFlex>

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
    window.addEventListener("focus", this.play)
    window.addEventListener("blur", this.pause)
    this.play()
  }

  componentWillUnmount() {
    window.removeEventListener("focus", this.play)
    window.removeEventListener("blur", this.pause)
    this.pause()
  }

  totalSlides = () => React.Children.toArray(this.props.children).length

  setSlide = index => {
    this.setState({ selectedIndex: index })
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

  render() {
    const children = React.Children.toArray(this.props.children)

    return (
      <div style={{ width: "100%", position: "relative" }}>
        {children.length > 1 &&
          <CarouselControls
            page={this.state.selectedIndex}
            total={this.totalSlides()}
            onPageClick={index => {
              this.pause()
              this.setSlide(index)
            }}
          />}
        <OurCarousel index={this.state.selectedIndex} p={0}>
          {children.map((slide, i) =>
            <CarouselSlide p={0} key={i}>
              {slide}
            </CarouselSlide>,
          )}
        </OurCarousel>
      </div>
    )
  }
}

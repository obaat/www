import React from "react"
import { Flex, Box } from "./Grid"
import get from "lodash/get"
import { space, color as ssColor, width, fontSize } from "styled-system"
import { bool, string, number, oneOf, oneOfType } from "prop-types"
const numberOrString = oneOfType([number, string])
const theme = ({ theme, palette, invert }) =>
  get(
    theme,
    ["colors", invert ? `${palette}Invert` : palette],
    ["purple", "orange"],
  )
const withPalette = cb => props => {
  const [foreground, background] = theme(props)
  return cb({
    foreground: props.color || foreground,
    background: props.bg || background,
    ...props,
  })
}

const color = ({ theme }) => n => get(theme, ["colors", n, 0], "purple")
const bold = props => get(props.theme, "weights.1")
const darken = n => `rgba(0, 0, 0, ${n})`

const px = n => (typeof n === "number" ? n + "px" : n)

const components = [
  // Buttons
  {
    name: "Button",
    type: "button",
    traits: [space, ssColor, width, fontSize],
    props: {
      fontSize: 1,
      m: 0,
      pl: 3,
      pr: 3,
      pt: 2,
      pb: 2,
    },
    style: withPalette(props => ({
      fontFamily: props.theme.font.heading,
      fontWeight: bold(props),
      display: "inline-block",
      verticalAlign: "middle",
      textAlign: "center",
      textDecoration: "none",
      borderRadius: px(props.theme.radius),
      border: 0,
      appearance: "none",
      backgroundColor: props.background,
      color: props.foreground,
      "&:hover": {
        boxShadow: `inset 0 0 0 999px ${darken(1 / 8)}`,
      },
      "&:focus": {
        outline: 0,
        boxShadow: `0 0 0 2px ${props.background}`,
      },
      "&:active": {
        backgroundColor: props.background,
        boxShadow: `inset 0 0 8px ${darken(1 / 4)}`,
      },
      "&:disabled": {
        opacity: 1 / 4,
      },
    })),
  },
  {
    name: "ButtonOutline",
    type: "Button",
    props: {},
    traits: [space, ssColor, width, fontSize],
    style: withPalette(props => ({
      boxShadow: `inset 0 0 0 2px`,
      backgroundColor: "transparent",
      color: props.foreground,
      "&:hover": {
        color: props.foreground,
        backgroundColor: props.background,
        boxShadow: `inset 0 0 0 3px`,
      },
      "&:focus": {
        boxShadow: `inset 0 0 0 2px, 0 0 0 2px`,
      },
      "&:active": {
        color: props.foreground,
        backgroundColor: props.background,
        boxShadow: `inset 0 0 0 2px ${props.background}, inset 0 0 8px ${darken(
          1 / 4,
        )}`,
      },
    })),
  },
  {
    name: "ButtonOutlineFilled",
    type: "ButtonOutline",
    props: {},
    style: withPalette(props => ({
      backgroundColor: props.background,
    })),
  },
  {
    name: "ButtonCircle",
    type: "Button",
    props: {
      pl: 3,
      pr: 3,
    },
    style: props => ({
      borderRadius: px(99999),
    }),
  },
  {
    name: "ButtonCircleOutline",
    type: "Button",
    props: {
      pl: 3,
      pr: 3,
    },
    style: withPalette(props => ({
      boxShadow: `inset 0 0 0 2px ${props.background}`,
      backgroundColor: "transparent",
      color: props.background,
      borderRadius: px(99999),
      ":hover": {
        backgroundColor: props.background,
        color: props.foreground,
      },
    })),
  },
  {
    name: "ButtonCircleOutlineFilled",
    type: "ButtonCircleOutline",
    props: {
      pl: 3,
      pr: 3,
    },
    style: withPalette(props => ({
      backgroundColor: props.foreground,
    })),
  },
  {
    name: "ButtonTransparent",
    type: "Button",
    props: {
      color: "inherit",
      bg: "transparent",
    },
    style: withPalette(props => ({
      borderRadius: 0,
      "&:hover": {
        color: props.foreground,
        backgroundColor: "transparent",
      },
      "&:focus": {
        boxShadow: `inset 0 0 0 2px, 0 0 0 2px`,
      },
      "&:active": {
        backgroundColor: "transparent",
        boxShadow: `inset 0 0 0 2px, inset 0 0 8px ${darken(1 / 4)}`,
      },
    })),
  },
  {
    name: "Link",
    type: "a",
    props: {
      palette: "blue",
    },
    style: withPalette(props => ({
      fontFamily: props.theme.font.body,
      textDecoration: "none",
      textDecorationSkip: "ink",
      ":hover": {
        textDecoration: "underline",
      },
    })),
  },
  {
    name: "NavLink",
    type: "a",
    props: {
      f: 1,
      p: 2,
    },
    style: props => ({
      display: "inline-flex",
      alignItems: "center",
      alignSelf: "stretch",
      fontWeight: bold(props),
      textDecoration: "none",
      whiteSpace: "nowrap",
      color: "inherit",
      backgroundColor: props.active ? darken(1 / 4) : "transparent",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: darken(1 / 16),
      },
      "&:disabled": {
        opacity: 1 / 4,
      },
    }),
    propTypes: {
      active: bool,
    },
  },
  {
    name: "BlockLink",
    type: "a",
    props: {},
    style: {
      display: "block",
      textDecoration: "none",
      color: "inherit",
    },
  },

  // Typography
  {
    name: "Text",
    type: "p",
    props: {
      m: 0,
      fontSize: 1,
      mb: 1,
    },
    style: props => ({
      fontWeight: props.bold ? bold(props) : get(props.theme, "weights.0"),
      lineHeight: "1.375em",
      fontFamily: props.theme.font.body,
    }),
    propTypes: {
      left: bool,
      center: bool,
      right: bool,
      justify: bool,
      bold: bool,
      caps: bool,
    },
  },
  {
    name: "Heading",
    type: "Text",
    props: {
      is: "h1",
      fontSize: 6,
      mb: 1,
    },
    style: props => ({
      fontFamily: props.theme.font.heading,
    }),

    propTypes: {
      left: bool,
      center: bool,
      right: bool,
      justify: bool,
      bold: bool,
      caps: bool,
    },
  },
  {
    name: "Subhead",
    type: "Heading",
    props: {
      is: "h2",
      mb: 1,
      fontSize: 5,
    },
    style: {
      lineHeight: 1.286,
    },
  },
  {
    name: "H3",
    type: "Heading",
    props: {
      is: "h3",
      mb: 1,
      fontSize: 5,
    },
    style: {
      lineHeight: 1.2,
    },
  },
  {
    name: "H4",
    type: "H3",
    props: {
      is: "h4",
      fontSize: 4,
    },
    style: {},
  },
  {
    name: "H5",
    type: "H4",
    props: {
      is: "h5",
      fontSize: 3,
    },
    style: {},
  },
  {
    name: "H6",
    type: "H5",
    props: {
      is: "h6",
    },
    style: {},
  },
  {
    name: "Small",
    type: "Text",
    props: {
      is: "div",
      fontSize: 0,
    },
    style: {},
  },
  {
    name: "Lead",
    type: "Text",
    props: {
      is: "p",
      fontSize: 3,
      m: 0,
    },
    style: {
      lineHeight: 1.25,
    },
  },
  { name: "Ul", type: "Text", props: { is: "ul" } },
  { name: "Ol", type: "Text", props: { is: "ol" } },
  { name: "Li", type: "Text", props: { is: "li" } },
  {
    name: "Pre",
    type: "pre",
    props: {
      fontSize: 1,
      m: 0,
    },
    style: props => ({
      fontFamily: props.theme.monospace,
      overflow: "auto",
    }),
  },
  {
    name: "Code",
    type: "code",
    props: {
      fontSize: 1,
    },
    style: props => ({
      fontFamily: props.theme.monospace,
    }),
  },
  {
    name: "Samp",
    type: "Code",
    props: {
      is: "samp",
    },
    style: {},
  },
  {
    name: "Blockquote",
    type: "Text",
    props: {
      is: "blockquote",
      m: 0,
      fontSize: 3,
    },
    style: {},
  },
  {
    name: "Measure",
    type: "div",
    props: {},
    style: {
      maxWidth: "32em",
    },
  },
  {
    name: "Truncate",
    type: "Text",
    props: {},
    style: {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
  },

  // Forms
  {
    name: "Label",
    type: "label",
    props: {
      fontSize: 1,
      mb: 1,
    },
    style: {
      display: "flex",
      alignItems: "center",
    },
  },
  {
    name: "Input",
    type: "input",
    props: {
      type: "text",
      fontSize: "inherit",
      p: 1,
      m: 0,
      w: 1,
      color: "inherit",
      bg: "transparent",
    },
    style: props => ({
      fontFamily: "inherit",
      lineHeight: "inherit",
      display: "inline-block",
      verticalAlign: "middle",
      border: 0,
      boxShadow: `inset 0 0 0 1px ${color(props)("gray2")}`,
      borderRadius: px(props.theme.radius),
      appearance: "none",
      "&:focus": {
        outline: "none",
        boxShadow: `inset 0 0 0 1px ${color(props)("blue")}`,
      },
      "&:disabled": {
        opacity: 1 / 4,
      },
    }),
  },
  {
    name: "Textarea",
    type: "textarea",
    props: {
      p: 1,
      m: 0,
      w: 1,
      color: "inherit",
      bg: "transparent",
    },
    style: props => ({
      fontFamily: "inherit",
      fontSize: "inherit",
      border: 0,
      boxShadow: `inset 0 0 0 1px ${color(props)("gray2")}`,
      borderRadius: px(props.theme.radius),
      appearance: "none",
      "&:focus": {
        outline: "none",
        boxShadow: `inset 0 0 0 1px ${color(props)("blue")}`,
      },
      "&:disabled": {
        opacity: 1 / 4,
      },
    }),
  },
  {
    name: "Checkbox",
    type: "input",
    props: {
      type: "checkbox",
      mr: 1,
    },
    style: props => ({}),
  },
  {
    name: "Radio",
    type: "input",
    props: {
      type: "radio",
      mr: 1,
    },
    style: props => ({}),
  },
  {
    name: "Slider",
    type: "input",
    props: {
      w: 1,
      mt: 2,
      mb: 2,
      ml: 0,
      mr: 0,
      type: "range",
    },
    style: props => ({
      display: "block",
      height: px(get(props.theme, "space.1")),
      cursor: "pointer",
      color: "inherit",
      borderRadius: px(99999),
      backgroundColor: color(props)("gray2"),
      appearance: "none",
      "&::-webkit-slider-thumb": {
        width: px(16),
        height: px(16),
        backgroundColor: "currentcolor",
        border: 0,
        borderRadius: px(99999),
        appearance: "none",
      },
      "&:focus": {
        "&::-webkit-slider-thumb": {},
      },
    }),
  },

  {
    name: "Image",
    type: "img",
    props: {},
    style: {
      display: "block",
      maxWidth: "100%",
      height: "auto",
    },
  },
  {
    name: "Avatar",
    type: "img",
    props: {},
    style: props => ({
      display: "inline-block",
      width: px(props.size || 48),
      height: px(props.size || 48),
      borderRadius: px(99999),
    }),
    propTypes: {
      size: number,
    },
  },

  {
    name: "BackgroundImage",
    type: "div",
    props: {
      w: 1,
      // ratio: 3/4 // How does styled-components handle this??
      // Fix this once non-whitelisted styled-components is out
    },
    style: props => ({
      backgroundImage: props.src ? `url(${props.src})` : "none",
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: 0,
      paddingBottom: (props.ratio || 3 / 4) * 100 + "%",
    }),
    propTypes: {
      src: string,
      ratio: number,
    },
  },

  // Layout
  {
    name: "Container",
    type: "div",
    props: {
      px: 3,
      ml: "auto",
      mr: "auto",
    },
    style: props => ({
      maxWidth: px(props.maxWidth || get(props.theme, "maxWidth") || 1024),
    }),
    propTypes: {
      maxWidth: numberOrString,
    },
  },
  {
    name: "Divider",
    type: "hr",
    props: {
      mt: 2,
      mb: 2,
    },
    style: {
      border: 0,
      borderBottomWidth: px(1),
      borderBottomStyle: "solid",
    },
  },
  {
    name: "Border",
    type: "div",
    props: {},
    style: withPalette(props => {
      const w = px(props.borderWidth || 1)
      const borderWidth =
        !props.top && !props.right && !props.bottom && !props.left
          ? { borderWidth: w }
          : null
      const directions = borderWidth
        ? null
        : {
            borderTopWidth: props.top ? w : 0,
            borderRightWidth: props.right ? w : 0,
            borderBottomWidth: props.bottom ? w : 0,
            borderLeftWidth: props.left ? w : 0,
          }

      return Object.assign(
        {
          borderStyle: "solid",
          borderColor: color(props)(props.borderColor),
          color: "inherit",
        },
        borderWidth,
        directions,
      )
    }),
    propTypes: {
      top: bool,
      right: bool,
      bottom: bool,
      left: bool,
      width: number,
      color: string,
    },
  },
  {
    name: "Media",
    type: "div",
    props: {},
    style: props => ({
      display: "flex",
      alignItems: "center",
    }),
  },

  {
    name: "Card",
    type: "div",
    props: {
      bg: "white",
    },
    style: props => ({
      overflow: "hidden",
      boxShadow: `inset 0 0 0 1px ${color(props)("gray2")}, 0 0 4px ${color(
        props,
      )("gray2")}`,
      borderRadius: px(props.theme.radius),
    }),
  },
  {
    name: "Banner",
    type: "div",
    props: {
      p: [3, 4],
    },
    style: props => ({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "80vh",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundImage: props.backgroundImage
        ? `url(${props.backgroundImage})`
        : "none",
    }),
    propTypes: {
      backgroundImage: string,
    },
  },
  {
    name: "Panel",
    type: "div",
    props: {},
    style: props => ({
      overflow: "hidden",
      borderRadius: px(props.theme.radius),
      borderWidth: px(1),
      borderStyle: "solid",
    }),
  },
  {
    name: "PanelHeader",
    type: "header",
    props: {
      fontSize: 2,
      p: 2,
    },
    style: props => ({
      fontWeight: bold(props),
      borderBottomWidth: px(1),
      borderBottomStyle: "solid",
    }),
  },
  {
    name: "PanelFooter",
    type: "footer",
    props: {
      fontSize: 1,
      p: 2,
    },
    style: props => ({
      fontWeight: bold(props),
      borderTopWidth: px(1),
      borderTopStyle: "solid",
    }),
  },

  // UI
  {
    name: "Progress",
    type: "progress",
    props: {
      w: 1,
      m: 0,
      bg: "gray2",
    },
    style: withPalette(props => ({
      display: "block",
      height: px(get(props.theme, "space.1")),
      borderRadius: px(props.theme.radius),
      overflow: "hidden",
      appearance: "none",
      "&::-webkit-progress-bar": {
        backgroundColor: props.background,
      },
      "&::-webkit-progress-value": {
        backgroundColor: props.foreground,
      },
      "&::-moz-progress-bar": {
        backgroundColor: props.foreground,
      },
    })),
  },
  {
    name: "Message",
    type: "div",
    props: {
      pl: 3,
      pr: 3,
      pt: 2,
      pb: 2,
      color: "white",
      bg: "blue",
    },
    style: props => ({
      display: "flex",
      alignItems: "center",
      minHeight: px(48),
      fontWeight: bold(props),
    }),
  },
  {
    name: "Group",
    type: "div",
    props: {},
    style: props => {
      const R = px(props.theme.radius || 4)
      return {
        "& > *": {
          borderRadius: 0,
        },
        "& > *:first-child": {
          borderRadius: `${R} 0 0 ${R}`,
        },
        "& > *:last-child": {
          borderRadius: `0 ${R} ${R} 0`,
        },
      }
    },
  },

  {
    name: "Toolbar",
    type: "div",
    props: {
      pl: 2,
      pr: 2,
      color: "white",
      bg: "gray9",
    },
    style: {
      display: "flex",
      minHeight: px(48),
      alignItems: "center",
    },
  },

  {
    name: "Badge",
    type: "div",
    props: {
      fontSize: 0,
      p: 1,
      ml: 1,
      mr: 1,
      color: "white",
      bg: "blue",
    },
    style: props => ({
      fontWeight: bold(props),
      display: "inline-block",
      verticalAlign: "middle",
      borderRadius: px(props.theme.radius),
    }),
  },
  {
    name: "Circle",
    type: "Badge",
    props: {
      color: "white",
      bg: "blue",
    },
    style: props => ({
      textAlign: "center",
      width: px(props.size || 24),
      height: px(props.size || 24),
      borderRadius: px(99999),
    }),
  },
  {
    name: "Overlay",
    type: "div",
    props: {
      p: 3,
      bg: "white",
    },
    style: props => ({
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "100vw",
      maxHeight: "100vh",
      overflow: "auto",
      borderRadius: px(props.theme.radius),
      boxShadow: `0 0 0 60vmax ${darken(1 / 2)}, 0 0 32px ${darken(1 / 4)}`,
    }),
  },

  {
    name: "Tabs",
    type: "div",
    props: {},
    style: withPalette(props => ({
      display: "flex",
      borderBottomWidth: px(1),
      borderBottomStyle: "solid",
      borderColor: props.foreground,
    })),
  },
  {
    name: "TabItem",
    type: "a",
    props: {
      f: 1,
      mr: 3,
      pt: 2,
      pb: 2,
    },
    style: withPalette(props => ({
      textDecoration: "none",
      fontWeight: bold(props),
      color: props.active ? props.foreground : "inherit",
      borderBottomWidth: props.active ? 2 : 0,
      borderBottomStyle: "solid",
      "&:hover": {
        color: props.foreground,
        cursor: "pointer",
      },
    })),
    propTypes: {
      active: bool,
    },
  },

  {
    name: "DotButton",
    type: "button",
    props: {
      m: 0,
    },
    style: props => ({
      padding: 0,
      width: px(get(props.theme, "space.3")),
      height: px(get(props.theme, "space.3")),
      borderWidth: px(4),
      borderStyle: "solid",
      borderColor: "transparent",
      backgroundClip: "padding-box",
      borderRadius: px(99999),
      backgroundColor: props.active ? "currentcolor" : darken(1 / 4),
      appearance: "none",
      "&:hover": {
        backgroundColor: color(props)("blue"),
      },
      "&:focus": {
        backgroundColor: color(props)("blue"),
      },
      "&:disabled": {
        opacity: 1 / 4,
      },
    }),
    propTypes: {
      active: bool,
    },
  },

  {
    name: "Relative",
    type: "div",
    props: {},
    style: props => ({
      position: "relative",
      zIndex: props.z,
    }),
  },
  {
    name: "Absolute",
    type: "div",
    props: {},
    style: props => ({
      position: "absolute",
      top: props.top ? 0 : null,
      right: props.right ? 0 : null,
      bottom: props.bottom ? 0 : null,
      left: props.left ? 0 : null,
      zIndex: props.z,
    }),
    propTypes: {
      top: bool,
      right: bool,
      bottom: bool,
      left: bool,
      z: number,
    },
  },
  {
    name: "Fixed",
    type: "div",
    props: {},
    style: props => ({
      position: "fixed",
      top: props.top ? 0 : null,
      right: props.right ? 0 : null,
      bottom: props.bottom ? 0 : null,
      left: props.left ? 0 : null,
      zIndex: props.z,
    }),
    propTypes: {
      top: bool,
      right: bool,
      bottom: bool,
      left: bool,
      z: number,
    },
  },
  {
    name: "Sticky",
    type: "div",
    props: {},
    style: props => `
      position: -webkit-sticky;
      position: sticky;
      top: ${props.top ? 0 : null};
      right: ${props.right ? 0 : null};
      bottom: ${props.bottom ? 0 : null};
      left: ${props.left ? 0 : null};
      z-index: ${props.z};
    `,
    propTypes: {
      top: bool,
      right: bool,
      bottom: bool,
      left: bool,
      z: number,
    },
  },
  {
    name: "Drawer",
    type: "Fixed",
    props: {
      bg: "white",
      position: "left",
      size: 320,
    },
    style: props => {
      const position = props.position
      const size = props.size
      const h = /^(left|right)$/.test(position) ? 1 : 0
      const width = h ? { width: px(size) } : null
      const height = h ? null : { height: px(size) }
      const transforms = {
        left: "translateX(-100%)",
        right: "translateX(100%)",
        top: "translateY(-100%)",
        bottom: "translateY(100%)",
      }
      const transform = !props.open ? { transform: transforms[position] } : null

      const top = /^(top|left|right)$/.test(position) ? { top: 0 } : null
      const bottom = /^(bottom|left|right)$/.test(position)
        ? { bottom: 0 }
        : null
      const left = /^(left|top|bottom)$/.test(position) ? { left: 0 } : null
      const right = /^(right|top|bottom)$/.test(position) ? { right: 0 } : null

      return Object.assign(
        {
          overflowX: "hidden",
          overflowY: "auto",
          transitionProperty: "transform",
          transitionDuration: ".2s",
          transitionTimingFunction: "ease-out",
        },
        top,
        bottom,
        left,
        right,
        transform,
        width,
        height,
      )
    },
    propTypes: {
      size: number,
      position: oneOf(["top", "right", "bottom", "left"]),
    },
  },

  {
    name: "Carousel",
    type: "div",
    props: {},
    style: props => ({
      width: "100%",
      overflow: "hidden",
      whiteSpace: "nowrap",
      "& > div": {
        whiteSpace: "normal",
      },
      "& > div:first-child": {
        marginLeft: props.index * -100 + "%",
        transitionProperty: "margin",
        transitionDuration: ".2s",
        transitionTimingFunction: "ease-out",
      },
    }),
    propTypes: {
      index: number,
    },
  },
  {
    name: "ScrollCarousel",
    type: "div",
    props: {},
    style: props => ({
      width: "100%",
      overflow: "auto",
      whiteSpace: "nowrap",
      scrollSnapPointsX: "repeat(100%)",
      scrollSnapType: "mandatory",
      scrollSnapDestination: "0% 100%",
    }),
  },
  {
    name: "CarouselSlide",
    type: "div",
    props: {
      w: 1,
      p: 3,
    },
    style: props => ({
      display: "inline-block",
      verticalAlign: "middle",
    }),
  },

  {
    name: "Tooltip",
    type: "div",
    props: {
      color: "white",
      bg: "black",
    },
    style: withPalette(props => ({
      display: "inline-block",
      position: "relative",
      color: "inherit",
      backgroundColor: "transparent",
      "&::before": {
        display: "none",
        content: `"${props.text}"`,
        position: "absolute",
        bottom: "100%",
        left: "50%",
        transform: "translate(-50%, -4px)",
        whiteSpace: "nowrap",
        fontSize: px(get(props.theme, "fontSizes.0")),
        paddingTop: px(get(props.theme, "space.1")),
        paddingBottom: px(get(props.theme, "space.1")),
        paddingLeft: px(get(props.theme, "space.2")),
        paddingRight: px(get(props.theme, "space.2")),
        color: props.foreground,
        backgroundColor: props.background,
        borderRadius: px(props.theme.radius),
      },
      "&::after": {
        display: "none",
        position: "absolute",
        bottom: "100%",
        left: "50%",
        transform: "translate(-50%, 8px)",
        content: '" "',
        borderWidth: px(6),
        borderStyle: "solid",
        borderColor: "transparent",
        borderTopColor: props.background,
      },
      "&:hover": {
        "&::before, &::after": {
          display: "block",
        },
      },
    })),
  },

  {
    name: "Switch",
    type: "div",
    props: {
      role: "checkbox",
      color: "blue",
    },
    style: withPalette(props => ({
      display: "inline-flex",
      width: px(40),
      height: px(24),
      borderRadius: px(9999),
      backgroundColor: props.checked ? props.foreground : "transparent",
      boxShadow: "inset 0 0 0 2px",
      transitionProperty: "background-color",
      transitionDuration: ".2s",
      transitionTimingFunction: "ease-out",
      userSelect: "none",
      "&::after": {
        content: '" "',
        width: px(16),
        height: px(16),
        margin: px(4),
        borderRadius: px(9999),
        transitionProperty: "transform, color",
        transitionDuration: ".1s",
        transitionTimingFunction: "ease-out",
        transform: props.checked ? `translateX(16px)` : `translateX(0)`,
        backgroundColor: props.checked ? props.background : props.foreground,
      },
    })),
  },

  {
    name: "Close",
    type: "ButtonTransparent",
    props: {
      p: 0,
      f: 3,
      children: "×",
    },
    style: props => ({
      lineHeight: 1,
      width: px(24),
      height: px(24),
    }),
  },

  {
    name: "Star",
    type: "div",
    props: {
      f: 3,
      color: "yellow",
      children: "★",
    },
    style: withPalette(props => ({
      position: "relative",
      width: "1em",
      height: "1em",
      color: props.checked ? props.foreground : darken(1 / 8),
      "&::after": {
        display: props.half ? "block" : "none",
        content: '"★"',
        position: "absolute",
        left: 0,
        top: 0,
        width: "1em",
        height: "1em",
        color: props.foreground,
        clip: "rect(0, .45em, 1em, 0)",
      },
    })),
  },

  {
    name: "Arrow",
    type: "div",
    props: {},
    style: props => {
      const borderTop =
        props.direction === "down" ? { borderTop: ".4375em solid" } : null
      const borderBottom =
        props.direction === "up" ? { borderBottom: ".4375em solid" } : null
      return Object.assign(
        {
          display: "inline-block",
          width: 0,
          height: 0,
          verticalAlign: "middle",
          borderRight: ".3125em solid transparent",
          borderLeft: ".3125em solid transparent",
        },
        borderTop,
        borderBottom,
      )
    },
    propTypes: {
      direction: oneOf(["up", "down"]),
    },
    defaultProps: {
      direction: "down",
    },
  },

  {
    name: "Embed",
    type: "div",
    props: {},
    style: props => ({
      position: "relative",
      height: 0,
      padding: 0,
      paddingBottom: `${(props.ratio || 9 / 16) * 100}%`,
      overflow: "hidden",
      "& > iframe": {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        bottom: 0,
        left: 0,
        border: 0,
      },
    }),
  },

  {
    name: "Row",
    type: Flex,
    props: {
      mx: -3,
    },
    style: {},
  },
  {
    name: "Column",
    type: Box,
    props: {
      px: 3,
      mb: 4,
      flex: "1 1 auto",
    },
    style: {},
  },
]

export default components

import React from "react"
import { Box, Absolute, BackgroundImage } from "../ui"
import get from "lodash/get"
import g from "glamorous"
import Embed from "../components/Embed"
import PrismicRichText from "../components/PrismicRichText"
import Link from "../components/Link"
import { themeCycle } from "../utils/constants"
import srcTheme from "../theme"
import hexRgb from "hex-rgb"
import { Small } from "../ui"

const Grid = g.div(
  ({
    width = "100%",
    height,
    rowConfig,
    columnConfig,
    autoRowConfig,
    gap = "8px",
  }) => ({
    width,
    height,
    display: "flex",
    flexWrap: "wrap",
    "@supports (display: grid)": {
      display: "grid",
      gridTemplateRows: rowConfig,
      gridTemplateColumns: columnConfig,
      gridAutoRows: autoRowConfig,
      gridGap: gap,
      "@media screen and (max-width: 40em)": {
        gridTemplateRows: "repeat(2, 200px)",
      },
    },
    "@supports  (-ms-accelerator:true)": {
      display: "-ms-grid",
      msGridRows: "200px 200px 200px 200px",
      msGridColumns: "33% 33% 33%",
    },
    "@supports (-ms-ime-align:auto)": {
      display: "-ms-grid",
      msGridRows: "200px 200px 200px 200px",
      msGridColumns: "33% 33% 33%",
    },
    "@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)": {
      display: "-ms-grid",
      msGridRows: "200px 200px 200px 200px",
      msGridColumns: "33% 33% 33%",
    },
  }),
)

const rowConfig = i => [
  { y: 1, x: 1 + i * 2, w: 2, h: 2 },
  { y: 3, x: 1 + i * 2, w: 1, h: 1 },
  { y: 3, x: 2 + i * 2, w: 1, h: 1 },
]

const rowConfigOdd = i => [
  { y: 1, x: 1 + i * 2, w: 1, h: 1 },
  { y: 1, x: 2 + i * 2, w: 1, h: 1 },
  { y: 2, x: 1 + i * 2, w: 2, h: 2 },
]

const Background = g(Absolute)(({ src }) => ({
  backgroundImage: src ? `url(${src})` : "none",
  backgroundSize: "cover",
  backgroundPosition: "center",
  textAlign: "left",
})).withProps({
  top: true,
  bottom: true,
  left: true,
  right: true,
})

const TextBackground = g(Background)({
  display: "flex",
  alignItems: "center",
  textAlign: "center",
})

let cycleCount = 0

const typeName = {
  project: "Project",
  event: "Event",
  gallery_page: "Gallery",
}

const renderers = {
  video: ({ content }) => <Embed {...content} width="100%" height="100%" />,
  unknown: type => () => <span>{type}???</span>,
  text: ({ content, background_color, theme, color }) => (
    <TextBackground
      palette={theme}
      invert
      bg={background_color}
      color={color}
      align="center"
      justify="center"
      p={2}
    >
      <PrismicRichText source={content} />
    </TextBackground>
  ),
  page: ({ content, theme, data, count }) => {
    const src = data[content.id] || {}
    const image = get(
      src,
      ["header_image", "url"],
      get(content, ["image_gallery", 0, "image", "url"]),
    )
    const palette = theme || themeCycle[count % themeCycle.length]
    const bg = hexRgb(theme ? srcTheme.colors[theme][0] : "#000")
    return (
      <Link type={content.type} uid={content.uid}>
        <Background
          src={image}
          palette={!image && palette}
          color={image && "#fff"}
          invert
        >
          <Absolute
            top
            left
            bottom
            right
            p={2}
            bg={`rgba(${bg[0]},${bg[1]},${bg[2]},${theme ? "0.8" : "0.2"})`}
          >
            <PrismicRichText forceType="heading3" source={src.title} />
          </Absolute>
          <Absolute bottom right p={2}>
            <Small mb={0} style={{ textTransform: "uppercase" }}>
              {typeName[content.type]}
            </Small>
          </Absolute>
        </Background>
      </Link>
    )
  },
}

const Panel = ({ slice_type, primary, data, count }) => {
  const Component = renderers[slice_type] || renderers.unknown(slice_type)
  return (
    <Absolute
      top
      bottom
      left
      right
      palette="brick"
      bg={primary.backgroundColor}
      color={primary.color}
      style={{ overflow: "hidden" }}
    >
      <Component {...primary} data={data} count={count} />
    </Absolute>
  )
}

const GridItem = g
  .div(({ startColumn, endColumn, startRow, endRow }) => ({
    "@supports (display: grid)": {
      gridColumnStart: startColumn,
      gridColumnEnd: endColumn,
      gridRowStart: startRow,
      gridRowEnd: endRow,
      msGridColumnSpan: endColumn.replace("span ", "") + ";",
      msGridRowSpan: endRow.replace("span ", "") + ";",
      msGridRow: startRow,
      msGridColumn: startColumn,
      gridRowGap: 4,
      height: "auto",
      width: "auto",
      "@media screen and (max-width: 40em)": {
        gridColumnStart: "auto",
        gridRowStart: "auto",
        gridRowEnd: "span 1",
        height: "200px",
        gridColumnEnd: "span 3",
      },
    },
    position: "relative",
    height: "200px",
    width: "33%",
  }))
  .withProps(({ startRow, startColumn, endColumn, endRow }) => {})

const COLUMNS = 3

const NewsMasonry = ({ items = [], data }) => {
  return (
    <Grid
      rowConfig={`repeat(2, 14.5VW)`}
      columnConfig={`repeat(${COLUMNS}, 1fr)`}
      autoRowConfig="1fr"
    >
      {items.map((item, i) => {
        const row = Math.floor(i / COLUMNS)
        const op = row % 2 ? rowConfigOdd : rowConfig
        const { x, y, w, h } = op(row)[i % COLUMNS]
        return (
          <GridItem
            key={i}
            startRow={x}
            endRow={`span ${w}`}
            startColumn={y}
            endColumn={`span ${h}`}
          >
            <Panel {...item} data={data} count={i} />
          </GridItem>
        )
      })}
    </Grid>
  )
}

export default NewsMasonry

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
    gap = "15px",
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
      gridTemplateAreas: `
      "p1 p1 s1"
      "p1 p1 s2"
      "s3 p2 p2"
      "s4 p2 p2"
      `,
      gridGap: gap,
      "@media screen and (max-width: 40em)": {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "1fr",
        gridTemplateRows: "repeat(6, 200px)",
        gridTemplateAreas: `
        "p1"
        "s1"
        "s2"
        "p2"
        "s3"
        "s4"
        `,
      },
    },
  }),
)

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
      p={2}
    >
      <PrismicRichText source={content} forceType="heading2" />
    </TextBackground>
  ),
  page: ({ description, title, content, theme, data, count }) => {
    const src = data[content.id] || {}
    const image = get(
      src,
      ["header_image", "url"],
      get(content, ["image_gallery", 0, "image", "url"]),
    )
    const palette = theme || themeCycle[count % themeCycle.length]
    const bg = hexRgb(theme ? srcTheme.colors[theme][0] : "#000", {
      format: "array",
    })
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
            {title && title[0] ? (
              <PrismicRichText forceType="heading3" source={title} />
            ) : (
              <PrismicRichText forceType="heading3" source={src.title} />
            )}
            {description && <PrismicRichText source={description} />}
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

const GridItem = g.div(({ gridArea }) => ({
  "@supports (display: grid)": {
    height: "auto",
    width: "auto",
    border: 0,
    gridArea,
  },
  position: "relative",
  height: "200px",
  width: "33%",
  border: "5px solid transparent",
}))

const COLUMNS = 3

const areas = ["p1", "s1", "s2", "s3", "s4", "p2"]
const NewsMasonry = ({ items = [], data }) => {
  return (
    <Grid
      autoRowConfig="minmax(14.5VW, auto)"
      columnConfig={`repeat(${COLUMNS}, 1fr)`}
    >
      {items.map((item, i) => {
        return (
          <GridItem gridArea={areas[i]} key={i}>
            <Panel {...item} data={data} count={i} />
          </GridItem>
        )
      })}
    </Grid>
  )
}

export default NewsMasonry

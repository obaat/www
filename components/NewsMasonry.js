import React from "react"
import get from "lodash/get"
import styled from "react-emotion"
import PrismicRichText from "../components/PrismicRichText"
import { pageToLink } from "../components/Link"
import Panel from "../components/Panel"
import {
  gridGap,
  gridTemplateColumns,
  gridTemplateRows,
  gridAutoRows,
  responsiveStyle,
} from "styled-system"

export const gridTemplateAreas = responsiveStyle({
  prop: "gridTemplateAreas",
})

const Grid = styled.div(
  ({ width = "100%", height }) => ({
    width,
    height,
    display: "none",
    "@supports (display: grid)": {
      display: "grid",
    },
  }),
  gridTemplateAreas,
  gridTemplateColumns,
  gridTemplateRows,
  gridAutoRows,
  gridGap,
)

const GridItem = styled(Panel)(({ gridArea }) => ({
  display: "none",
  "@supports (display: grid)": {
    display: "flex",
    height: "auto",
    width: "auto",
    border: 0,
    gridArea,
  },
}))

const COLUMNS = 4

const convertToLayouts = (...sources) =>
  sources.map(s =>
    get(s, "[0].text", "")
      .split("\n")
      .map(t => `"${t}"`)
      .join("\n"),
  )

const NewsMasonry = ({ source, data }) => {
  const items = source.body
  const gridTemplateAreas = convertToLayouts(
    source.layout_mobile,
    source.layout_medium,
    source.layout_large,
  )

  return (
    <div>
      {items
        .filter(slice => slice.slice_type === "panel")
        .map((panelSet, j) => {
          // {...item}
          // data={data}
          return (
            <Grid
              key={j}
              gridAutoRows="450px"
              gridGap={2}
              gridTemplateAreas={gridTemplateAreas}
              gridTemplateColumns={`repeat(${COLUMNS}, 1fr)`}
              gridTemplateRows="450px"
            >
              {panelSet.items.map((item, i) => {
                const id = String.fromCharCode(97 + i)
                const key = `${id}${id}`
                const backgroundImage = get(item, ["background_image", "url"])
                const title = get(item, ["title", 0, "text"])
                const to = item.link
                  ? pageToLink(item.link.type, item.link.uid)
                  : null

                return (
                  <GridItem gridArea={key} key={key} to={to}>
                    {backgroundImage && <Panel.Image src={backgroundImage} />}
                    {title && <Panel.Header bottom={0}>{title}</Panel.Header>}
                    {item.description &&
                      item.description.length > 0 && (
                        <Panel.Body>
                          <PrismicRichText source={item.description} />
                        </Panel.Body>
                      )}
                  </GridItem>
                )
              })}
            </Grid>
          )
        })}
    </div>
  )
}

export default NewsMasonry

import React from "react"
// import circularShift from 'circular-shift'
import { Box, Flex, BackgroundImage } from "../ui"
import g from "glamorous"
import chunk from "lodash/chunk"

const ratio = 2 / 3

// for each row, add up the used so far and if the remainer is too much, stack
const sizing = [[2, 1, 1], [1, 1, 2]]

const Panel = props => (
  <BackgroundImage ratio={ratio} palette="brick" invert m={1} {...props}>
    {props.content}
  </BackgroundImage>
)

const Row = ({ cols, columns, direction, layout }) => {
  //adjust to fit.
  let used = 0
  let quit = false
  const children = cols.reduce((a, col, i) => {
    if (quit) return a
    const current = layout[i]
    const needed = layout.reduce((acc, v) => acc + v, 0)
    const us = <Panel w={current / columns} key={`main-${i}`} {...col} />

    if (needed > columns) {
      const childCols = cols.slice(i + 1)
      const childLayout = layout.slice(i + 1)
      quit = true
      return a.concat([
        us,
        <Row
          key={`child-${i}`}
          direction="column"
          columns={columns - 1}
          cols={childCols}
          layout={childLayout}
        />,
      ])
    }
    return a.concat(us)
  }, [])

  return <Flex direction={direction}>{children}</Flex>
}

const items = [
  { content: "Test" },
  { content: "Test2" },
  { content: "Test3" },
  { content: "Test4" },
  { content: "Test5" },
  { content: "Test6" },
]

const NewsMasonry = ({ xitems = [] }) => {
  // chunk into rows
  const rows = chunk(items, 3)
  return (
    <Box>
      {rows.map((cols, i) => (
        <Row cols={cols} columns={3} layout={sizing[i % sizing.length]} />
      ))}
    </Box>
  )
}

export default NewsMasonry

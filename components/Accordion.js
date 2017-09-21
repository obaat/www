import React from "react"
import g from "glamorous"
import { withRouter } from "next/router"
import Icon from "./Icon"
import { compose, withState, withHandlers } from "recompose"

import { Flex, Box, Panel, PanelHeader, Heading } from "../ui"

const color = "#eee"

const AccordionContainer = g(Panel)({
  borderColor: color,
  borderBottom: "1px solid #ccc",
})

const AccordionHeader = g(Box)({
  borderColor: color,
})

const AccordionBody = g(Box)({})

const ToggleIcon = g(Icon)({
  float: "right",
})

const AccordionSection = ({ open, toggleOpen, title, id, description }) => {
  return (
    <AccordionContainer>
      <AccordionHeader mb={-2} bg={color} p={2} onClick={toggleOpen(id)}>
        <ToggleIcon name={open ? "chevron-up" : "chevron-down"} />
        {title}
      </AccordionHeader>
      {open && (
        <AccordionBody p={2} bg="#fafafa">
          <a href={`#${id}`} />
          {description}
        </AccordionBody>
      )}
    </AccordionContainer>
  )
}

const oneOpen = compose(
  withState("openSection", "setOpenSection", null),
  withHandlers(({ router }) => {
    return {
      toggleOpen: ({ openSection, setOpenSection }) => curIndex => id => e => {
        setOpenSection(openSection === curIndex ? null : curIndex)
        router.push(router.pathname + "#" + id)
      },
    }
  }),
)

export default withRouter(
  oneOpen(({ items, openSection, toggleOpen }) => (
    <div>
      {items.map((props, i) => (
        <AccordionSection
          key={i}
          open={i === openSection}
          toggleOpen={toggleOpen(i)}
          {...props}
        />
      ))}
    </div>
  )),
)

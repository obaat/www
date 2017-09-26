import React from "react"
import g from "glamorous"
import { withRouter } from "next/router"
import Icon from "./Icon"
import { compose, withState, withHandlers } from "recompose"

import { Flex, Box, Panel, PanelHeader, Heading } from "../ui"

const AccordionContainer = g(Panel)({
  borderBottom: "1px solid #ccc",
  borderColor: "#fff",
})

const AccordionHeader = g(Box)({})

const AccordionBody = g(Box)({
  borderTop: "2px solid #fff",
})

const ToggleIcon = g(Icon)({
  float: "right",
  marginTop: "4px",
})

const AccordionSection = ({ open, toggleOpen, title, id, description }) => {
  return (
    <AccordionContainer>
      <AccordionHeader
        id={id}
        mb={-2}
        palette="greyLighter"
        invert
        p={2}
        onClick={toggleOpen(id)}
      >
        <ToggleIcon name={open ? "chevron-up" : "chevron-down"} />
        {title}
      </AccordionHeader>
      {open && (
        <AccordionBody p={2} palette="greyLighterStill" invert>
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
        window.setTimeout(() => router.replace(router.pathname + "#" + id), 20)
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

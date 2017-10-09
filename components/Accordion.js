import React from "react"
import g from "glamorous"
import { withRouter } from "react-static"
import { ArrowDown as IconArrowDown, ArrowUp as IconArrowUp } from "./SvgIcons"
import { compose, withState, withHandlers } from "recompose"
import isNil from "lodash/isNil"

import { Flex, Box, Panel, PanelHeader, Heading } from "../ui"

const AccordionContainer = g(Panel)({
  borderBottom: "1px solid #ccc",
  borderColor: "#fff",
})

const AccordionHeader = g(Box)({})

const AccordionBody = g(Box)({
  borderTop: "2px solid #fff",
})

const ArrowDown = g(IconArrowDown)({
  float: "right",
  marginTop: "6px",
})

const ArrowUp = g(IconArrowUp)({
  float: "right",
  marginTop: "6px",
})

const AccordionSection = ({ open, toggleOpen, title, id, description }) => {
  return (
    <AccordionContainer>
      <AccordionHeader
        id={id}
        mb={-2}
        palette="gray1"
        invert
        p={2}
        onClick={toggleOpen(id)}
      >
        {open ? (
          <ArrowUp size={15} palette="black" />
        ) : (
          <ArrowDown size={15} palette="black" />
        )}
        {title}
      </AccordionHeader>
      {open && (
        <AccordionBody p={2} palette="gray2" invert>
          {description}
        </AccordionBody>
      )}
    </AccordionContainer>
  )
}

const oneOpen = compose(
  withState(
    "openSection",
    "setOpenSection",
    ({ initialOpen }) => (isNil(initialOpen) ? null : initialOpen),
  ),
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

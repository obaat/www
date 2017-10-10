import React from "react"
import g from "glamorous"
import { withRouter } from "react-static"
import { ArrowDown as IconArrowDown, ArrowUp as IconArrowUp } from "./SvgIcons"
import { withProps } from "recompose"
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

const AccordionSection = ({ open, setOpen, title, id, description }) => {
  return (
    <AccordionContainer>
      <a name={id} />
      <AccordionHeader
        id={id}
        mb={-2}
        palette="gray1"
        invert
        p={2}
        onClick={setOpen}
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

const oneOpen = withProps(({ history, location, initialOpen }) => {
  return {
    setOpen: id => e => {
      if (location.hash === "#" + id) {
        history.replace({ hash: "" })
      } else {
        history.replace({ hash: id })
      }
    },
    openSection: location.hash.replace("#", "") || initialOpen,
  }
})

export default withRouter(
  oneOpen(({ items, openSection, setOpen }) => (
    <div>
      {items.map((props, i) => (
        <AccordionSection
          key={i}
          open={props.id === openSection}
          setOpen={setOpen(props.id)}
          {...props}
        />
      ))}
    </div>
  )),
)
